import React, { useEffect, useRef } from 'react';
import { IdeaGraph } from '@/lib/ideaBuilderAPI';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface IdeaVisualizationProps {
  graph: IdeaGraph;
  isLoading?: boolean;
}

interface NodeRenderState {
  id: string;
  x: number;
  y: number;
  baseAngle: number;
  distance: number;
  phase: number;
  radius: number;
  color: string;
}

export const IdeaVisualization: React.FC<IdeaVisualizationProps> = ({ graph, isLoading = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      core: '#3b82f6', // blue
      challenge: '#ef4444', // red
      solution: '#10b981', // green
      tech: '#8b5cf6', // purple
      aitool: '#f59e0b', // amber
    };

    return colors[category] || '#6b7280';
  };

  const createNodes = (width: number, height: number) => {
    const coreNode = graph.nodes.find((node) => node.category === 'core');
    const coreIndex = graph.nodes.findIndex((node) => node.category === 'core');
    const radius = Math.min(width, height) * 0.18;

    return graph.nodes.map((node, index) => {
      const isCore = node.category === 'core';
      const nodeRadius = isCore ? 28 : 18;
      const nodeAngle = ((index + 1) / Math.max(1, graph.nodes.length)) * Math.PI * 2;
      const nodeDistance = isCore ? 0 : radius + 20 + (index % 3) * 12;

      return {
        id: node.id,
        x: width / 2 + Math.cos(nodeAngle) * nodeDistance,
        y: height / 2 + Math.sin(nodeAngle) * nodeDistance,
        baseAngle: nodeAngle,
        distance: nodeDistance,
        phase: index * 0.55,
        radius: nodeRadius,
        color: getCategoryColor(node.category),
      };
    });
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || isLoading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes = createNodes(canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

    const drawScene = (time: number) => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.14)';
      ctx.fillRect(0, 0, width, height);

      // Fade and glow layer
      ctx.save();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Update node motion
      nodes.forEach((node) => {
        if (node.id === graph.nodes.find((n) => n.category === 'core')?.id) {
          node.x = centerX;
          node.y = centerY;
          return;
        }

        const wobble = Math.sin(time * 0.0007 + node.phase) * 18;
        const orbit = Math.cos(time * 0.0004 + node.phase) * 10;
        const angle = node.baseAngle + orbit * 0.015;

        node.x = centerX + Math.cos(angle) * (node.distance + wobble);
        node.y = centerY + Math.sin(angle) * (node.distance + wobble);
      });

      // Draw subtle connecting lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
      ctx.lineWidth = 1.8;
      graph.edges.forEach((edge) => {
        const source = nodes.find((node) => node.id === edge.source);
        const target = nodes.find((node) => node.id === edge.target);
        if (!source || !target) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });

      // Draw edge pulses
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
      ctx.lineWidth = 2.4;
      graph.edges.forEach((edge, idx) => {
        const source = nodes.find((node) => node.id === edge.source);
        const target = nodes.find((node) => node.id === edge.target);
        if (!source || !target) return;

        const offset = Math.sin(time * 0.0011 + idx) * 3;
        ctx.beginPath();
        ctx.moveTo(source.x + offset, source.y - offset);
        ctx.lineTo(target.x - offset, target.y + offset);
        ctx.stroke();
      });

      // Draw nodes with glow
      nodes.forEach((node) => {
        ctx.save();
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.radius * 0.9;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = node.id === graph.nodes.find((n) => n.category === 'core')?.id ? 3 : 1.6;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id === graph.nodes.find((n) => n.category === 'core')?.id ? 'Core' : '', node.x, node.y);

        const label = graph.nodes.find((item) => item.id === node.id)?.label || '';
        const lines = label.match(/(.{1,28})(\s|$)/g) || [label];
        const labelY = node.y + node.radius + 18;
        lines.forEach((line, idx) => {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fillText(line.trim(), node.x, labelY + idx * 14);
        });
      });

      animationRef.current = window.requestAnimationFrame(drawScene);
    };

    animationRef.current = window.requestAnimationFrame(drawScene);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [graph, isLoading]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/30 to-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
      <div ref={containerRef} className="w-full h-full relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
            <motion.div
              className="flex flex-col items-center gap-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lightbulb className="h-8 w-8 text-primary" />
              <p className="text-sm text-slate-300">Analyzing your idea...</p>
            </motion.div>
          </div>
        )}
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
        <p className="text-xs font-semibold text-slate-300 mb-2">Legend</p>
        <div className="grid gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
            <span className="text-slate-400">Core Idea</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }} />
            <span className="text-slate-400">Challenges</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }} />
            <span className="text-slate-400">Solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8b5cf6' }} />
            <span className="text-slate-400">Tech Stack</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
            <span className="text-slate-400">AI Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaVisualization;
