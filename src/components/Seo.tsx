import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Production origin — canonical URLs always point here, even on preview/staging hosts. */
const SITE_URL = "https://levelupengineers.com";

interface SeoProps {
  title: string;
  description: string;
  /** Override the canonical path (defaults to the current route's pathname). */
  canonicalPath?: string;
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/** Sets the document title, meta description, OG mirrors and canonical link for a page. */
const Seo = ({ title, description, canonicalPath }: SeoProps) => {
  const { pathname } = useLocation();
  const path = canonicalPath ?? pathname;
  // Normalise: drop trailing slash (except root) so canonicals match the sitemap.
  const cleanPath = path !== "/" ? path.replace(/\/+$/, "") : "/";
  const canonical = `${SITE_URL}${cleanPath}`;

  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setCanonical(canonical);
  }, [title, description, canonical]);

  return null;
};

export default Seo;
