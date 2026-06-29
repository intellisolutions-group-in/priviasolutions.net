"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Calendar, User, Clock,
  Share2, Link2, Mail, Shield, Check,
  ChevronDown, ChevronUp, Terminal, Activity, AlertCircle,
  ExternalLink, Search, Sparkles
} from "lucide-react";

function getToolLogo(name, provider) {
  const nameLower = name.toLowerCase();
  const providerLower = provider.toLowerCase();

  // AWS
  if (providerLower.includes("aws") || nameLower.includes("aws")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        <path d="M15 15.5c-1 1-3 1-4 0" />
      </svg>
    );
  }
  // Azure
  if (providerLower.includes("azure") || nameLower.includes("azure")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M11.4 3L1.5 17.2h6.2l3.7-5.5 3.5 5.5h7.7L12.8 3h-1.4z" fill="#0089d6" />
        <path d="M11.4 3l4.7 9.8-3.3 4.4H19l3.5-5.5h-7.7l-3.4-8.7z" fill="#0072c6" opacity="0.8" />
      </svg>
    );
  }
  // Google / GCP
  if (providerLower.includes("google") || nameLower.includes("google") || nameLower.includes("grpc")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" />
        <path d="M19 13h-4v4h4v-4z" fill="#EA4335" />
        <path d="M12 9h-4v8h4V9z" fill="#FBBC05" />
        <path d="M7 11H3v4h4v-4z" fill="#34A853" />
      </svg>
    );
  }
  // Datadog
  if (providerLower.includes("datadog") || nameLower.includes("datadog")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#632CA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#632CA6" />
        <path d="M8 14s1.5-2 4-2 4 2 4 2" stroke="#fff" />
        <circle cx="9" cy="9" r="1.5" fill="#fff" stroke="none" />
        <circle cx="15" cy="9" r="1.5" fill="#fff" stroke="none" />
      </svg>
    );
  }
  // Kubecost
  if (providerLower.includes("kubecost") || nameLower.includes("kubecost")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#00b4d8" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <circle cx="12" cy="12" r="3.5" fill="#00b4d8" />
      </svg>
    );
  }
  // Kubernetes / KEDA
  if (nameLower.includes("kubernetes") || nameLower.includes("keda") || nameLower.includes("lens") || providerLower.includes("mirantis")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#326CE5" strokeWidth="2">
        <polygon points="12 2 22 6.5 22 17.5 12 22 2 17.5 2 6.5" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="6.5" x2="22" y2="17.5" />
        <line x1="2" y1="17.5" x2="22" y2="6.5" />
      </svg>
    );
  }
  // Snyk
  if (providerLower.includes("snyk") || nameLower.includes("snyk")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#4C1E87" strokeWidth="2">
        <path d="M12 2L3 7v6c0 5.5 4.5 10 10 10s10-4.5 10-10V7L12 2z" fill="#4C1E87" />
        <path d="M9 11l2 2 4-4" stroke="#fff" strokeWidth="2.5" />
      </svg>
    );
  }
  // HashiCorp / Terraform / Vault
  if (providerLower.includes("hashicorp") || nameLower.includes("terraform") || nameLower.includes("vault")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm-1 3.2v4.8L6.4 12.3 6.4 7.6 11 5.2zm2 0l4.6 2.4v4.7l-4.6-2.3V5.2zm-7 8.3l4.6 2.3v4.8l-4.6-2.4v-4.7zm9 0v4.7l-4.6 2.4v-4.8l4.6-2.3z" fill="#844FBA" />
      </svg>
    );
  }
  // Prometheus / CNCF / Jaeger / OpenTelemetry / Istio
  if (
    providerLower.includes("cncf") ||
    nameLower.includes("prometheus") ||
    nameLower.includes("jaeger") ||
    nameLower.includes("opentelemetry") ||
    nameLower.includes("istio")
  ) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#e6522c" strokeWidth="2">
        <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
        <path d="M12 6c-2 2-3 4-3 6s1 4 3 6c2-2 3-4 3-6s-1-4-3-6z" fill="#e6522c" />
      </svg>
    );
  }
  // Docker
  if (providerLower.includes("docker") || nameLower.includes("docker")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2496ED">
        <path d="M3 10h3v2H3v-2zm4 0h3v2H7v-2zm4 0h3v2h-3v-2zm4 0h3v2h-3v-2zm-8-3h3v2H7V7zm4 0h3v2h-3V7zm4 0h3v2h-3V7zm-4-3h3v2h-3V4zm9 11c0 3.3-2.7 6-6 6H5c-1.7 0-3-1.3-3-3V11h20v4z" />
      </svg>
    );
  }
  // Apache / Kafka
  if (providerLower.includes("apache") || nameLower.includes("kafka")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#2B2B2B" strokeWidth="2.5">
        <circle cx="12" cy="6" r="3" fill="#2B2B2B" />
        <circle cx="6" cy="16" r="3" fill="#2B2B2B" />
        <circle cx="18" cy="16" r="3" fill="#2B2B2B" />
        <line x1="12" y1="9" x2="6" y2="13" />
        <line x1="12" y1="9" x2="18" y2="13" />
        <line x1="6" y1="16" x2="18" y2="16" />
      </svg>
    );
  }
  // Stripe
  if (providerLower.includes("stripe") || nameLower.includes("stripe")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#635BFF">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.5 16.5c-1.4 0-2.3-.7-2.3-2.1v-.1h1.5v.1c0 .5.3.7.8.7s.8-.2.8-.5c0-.9-2.3-.7-2.3-2.5 0-1.1.9-1.9 2.2-1.9 1.2 0 2.1.6 2.1 1.7v.1H11v-.1c0-.4-.3-.6-.7-.6s-.7.2-.7.5c0 .9 2.3.7 2.3 2.5.1 1.2-.9 2.2-2.1 2.2z" />
      </svg>
    );
  }
  // Redis
  if (providerLower.includes("redis") || nameLower.includes("redis")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#D82C20">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.4 6 12 2.2l7.6 3.8-7.6 3.5zM2 12l10 5 10-5-10-3-10 3zm0 5l10 5 10-5-10-3-10 3z" />
      </svg>
    );
  }
  // MongoDB
  if (providerLower.includes("mongodb") || nameLower.includes("mongodb")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#13AA52">
        <path d="M12 2C12 2 6 9 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-6-11-6-11zm0 14.5c-1.9 0-3.5-1.6-3.5-3.5 0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5c0 1.9-1.6 3.5-3.5 3.5z" />
      </svg>
    );
  }
  // Elasticsearch / Elastic
  if (providerLower.includes("elastic") || nameLower.includes("elastic")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#00BFB3" strokeWidth="2.5">
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    );
  }
  // Grafana
  if (providerLower.includes("grafana") || nameLower.includes("grafana")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#F47A20" />
        <path d="M2 17l10 5 10-5-10-3-10 3z" fill="#FADE2A" />
        <path d="M2 12l10 5 10-5-10-3-10 3z" fill="#F05A28" />
      </svg>
    );
  }
  // Kong
  if (providerLower.includes("kong") || nameLower.includes("kong")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1A1A24">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#1A1A24" />
        <path d="M12 7l-4 4h8l-4-4zm-4 5h8v4H8v-4z" fill="#FF9E0F" />
      </svg>
    );
  }
  // Okta
  if (providerLower.includes("okta") || nameLower.includes("okta")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#007CBA" strokeWidth="3">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" fill="#007CBA" />
      </svg>
    );
  }
  // Cloudflare
  if (providerLower.includes("cloudflare") || nameLower.includes("cloudflare")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F38020">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    );
  }
  // Semgrep / r2c
  if (providerLower.includes("r2c") || nameLower.includes("semgrep")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#2563EB" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  // SonarQube
  if (providerLower.includes("sonar") || nameLower.includes("sonar")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#4E9BCD" strokeWidth="2.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v12" />
        <path d="M8 10h8" />
      </svg>
    );
  }
  // OWASP
  if (providerLower.includes("owasp") || nameLower.includes("owasp")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#000000" strokeWidth="2">
        <polygon points="12 2 2 7 2 17 12 22 22 17 22 7" fill="#E6A100" />
      </svg>
    );
  }
  // Dynatrace
  if (providerLower.includes("dynatrace") || nameLower.includes("dynatrace")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1496FF">
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }
  // PagerDuty
  if (providerLower.includes("pagerduty") || nameLower.includes("pagerduty")) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#00A300">
        <rect x="4" y="4" width="16" height="16" rx="3" />
      </svg>
    );
  }

  // Default Fallback: Activity Icon style SVG
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export default function BlogPostClient({ post, slug, allBlogs }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [expandedGuardrails, setExpandedGuardrails] = useState({ 1: true, 2: true });
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // References for TOC intersection observer
  const sectionRefs = useRef({});

  // 1. Reading Progress scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.round(progress), 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Intersection Observer to highlight active TOC section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe sections
    if (post.sections) {
      post.sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [post.sections]);

  // 3. Toggle guardrail accordion
  const toggleGuardrail = (num) => {
    setExpandedGuardrails(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  // 4. Copy URL link handler
  const handleCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 5. Subscription handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  // Previous and Next article calculations
  const blogSlugs = Object.keys(allBlogs);
  const currentIndex = blogSlugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? blogSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < blogSlugs.length - 1 ? blogSlugs[currentIndex + 1] : null;

  // Related reading articles (pick 3 other articles)
  const relatedPosts = blogSlugs
    .filter(s => s !== slug)
    .slice(0, 3)
    .map(s => ({ slug: s, ...allBlogs[s] }));

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-850 font-sans pb-20 w-full max-w-full overflow-x-hidden">

      {/* Pinned Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="absolute top-[3px] left-4 bg-slate-900 text-white text-[9px] font-mono px-2 py-0.5 rounded-b shadow-sm pointer-events-none">
          Reading progress: {scrollProgress}%
        </div>
      </div>

      {/* Breadcrumbs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 min-w-0">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-500">{post.category}</span>
          <span>/</span>
          <span className="text-slate-900 truncate max-w-[80px] xs:max-w-[120px] sm:max-w-xs">{post.title}</span>
        </nav>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 relative min-w-0">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-12 self-start h-[calc(100vh-100px)] overflow-y-auto pr-4 scrollbar-thin">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">On This Page</h4>
            <div className="border-l-2 border-slate-200 space-y-4 py-1">
              {post.toc && post.toc.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block pl-4 text-xs font-bold transition-all relative -left-[2px] border-l-2 ${isActive
                      ? "text-blue-600 border-blue-600 font-extrabold"
                      : "text-slate-400 hover:text-slate-800 border-transparent"
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Left callout card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-900 text-white space-y-4 shadow-md select-none">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-200">
                Engineering Excellence. Delivered.
              </h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Practical guides and deep insights for modern engineering teams.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors"
            >
              Explore More
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </aside>

        {/* ================= CENTER MAIN ARTICLE ================= */}
        <main className="col-span-1 lg:col-span-6 space-y-12 min-w-0">

          {/* Article Header block */}
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 text-[10px] font-black tracking-widest text-blue-700 bg-blue-100 rounded-md uppercase">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight break-words">
              {post.title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed break-words">
              {post.summary}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 border-y border-slate-200/80 py-4 font-mono">

              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Large illustration layout wrapper */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Sections Render Loop */}
          <div className="space-y-12 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            {post.sections && post.sections.map((sec, secIdx) => {

              return (
                <div key={sec.id} id={sec.id} className="space-y-4 pt-4 scroll-mt-20">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight border-b border-slate-200/80 pb-2">
                    {sec.title}
                  </h2>

                  {/* Render paragraphs with dropcap on first paragraph of first section */}
                  {sec.paragraphs && sec.paragraphs.map((pText, pIdx) => {
                    const isFirstParagraphOfIntro = secIdx === 0 && pIdx === 0;
                    if (isFirstParagraphOfIntro) {
                      const firstChar = pText.charAt(0);
                      const restText = pText.slice(1);
                      return (
                        <p key={pIdx}>
                          <span className="text-4xl sm:text-5xl font-black text-blue-600 float-left mr-2.5 mt-1 font-serif leading-none select-none">
                            {firstChar}
                          </span>
                          {restText}
                        </p>
                      );
                    }
                    return <p key={pIdx}>{pText}</p>;
                  })}

                  {/* Render bullets */}
                  {sec.bullets && (
                    <ul className="space-y-3 pl-5 list-none my-4">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start text-xs sm:text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-3 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Render blockquote */}
                  {sec.blockquote && (
                    <div className="p-6 rounded-2xl bg-blue-50/50 border-l-4 border-blue-600 my-6 relative select-none">
                      <p className="text-blue-900 font-extrabold text-sm sm:text-base italic leading-relaxed">
                        “ {sec.blockquote} ”
                      </p>
                    </div>
                  )}

                  {/* Interactive Accordion for Guardrails (Section 3) */}
                  {sec.guardrails && (
                    <div className="space-y-4 my-6">
                      {sec.guardrails.map((gr) => {
                        const isExpanded = expandedGuardrails[gr.num];
                        return (
                          <div
                            key={gr.num}
                            className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                          >
                            <button
                              onClick={() => toggleGuardrail(gr.num)}
                              className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-black flex items-center justify-center select-none shrink-0">
                                  {gr.num}
                                </span>
                                <span className="text-sm sm:text-base font-extrabold tracking-tight">
                                  {gr.title}
                                </span>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex flex-col md:flex-row gap-6 items-center">
                                <div className="flex-1 space-y-4">
                                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    {gr.desc}
                                  </p>
                                  {gr.insight && (
                                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-2.5">
                                      <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                      <p className="text-[11px] font-black text-blue-900 leading-normal uppercase">
                                        {gr.insight}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* Custom SVG Chart / Diagram (Visual assets for guardrails 1 & 2) */}
                                {gr.num === 1 && (
                                  <div className="w-full md:w-56 shrink-0 bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-[9px] text-slate-300 space-y-3">
                                    <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                                      <span className="font-bold text-slate-400">BUDGET OVERVIEW</span>
                                      <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded">64% spent</span>
                                    </div>
                                    {/* SVG Chart */}
                                    <svg viewBox="0 0 200 100" className="w-full h-24 overflow-visible">
                                      <defs>
                                        <linearGradient id="gradient-spend" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                        </linearGradient>
                                      </defs>
                                      {/* Grid Lines */}
                                      <line x1="0" y1="80" x2="200" y2="80" stroke="#1e293b" strokeWidth="1" />
                                      <line x1="0" y1="50" x2="200" y2="50" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
                                      <line x1="0" y1="20" x2="200" y2="20" stroke="#1e293b" strokeWidth="1" />
                                      {/* Target Budget Line */}
                                      <line x1="0" y1="40" x2="200" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2" />
                                      <text x="5" y="36" className="fill-red-400 text-[7px]">BUDGET LIMIT ($50K)</text>

                                      {/* Fill Path */}
                                      <path d="M 0,80 Q 50,75 100,55 T 200,45 L 200,80 L 0,80 Z" fill="url(#gradient-spend)" />
                                      {/* Spend Line */}
                                      <path d="M 0,80 Q 50,75 100,55 T 200,45" fill="none" stroke="#3b82f6" strokeWidth="2" />

                                      <circle cx="100" cy="55" r="3" className="fill-blue-400" />
                                      <text x="110" y="55" className="fill-white text-[8px] font-bold">$32,450</text>
                                    </svg>
                                  </div>
                                )}

                                {gr.num === 2 && (
                                  <div className="w-full md:w-56 shrink-0 bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-[8px] text-slate-400 space-y-4">
                                    <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                                      <span className="font-bold text-slate-300">MONITORING FLOW</span>
                                    </div>
                                    {/* Flowchart Diagram */}
                                    <div className="flex flex-col items-center space-y-2">
                                      <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-center w-full">
                                        Cloud Usage Telemetry
                                      </div>
                                      <div className="text-[12px]">↓</div>
                                      <div className="px-2 py-1 rounded bg-blue-900/20 border border-blue-500/30 text-blue-400 text-center w-full font-bold">
                                        Datadog/Prometheus Stack
                                      </div>
                                      <div className="text-[12px]">↓</div>
                                      <div className="px-2 py-1 rounded bg-purple-900/20 border border-purple-500/30 text-purple-400 text-center w-full">
                                        Anomaly Alert Trigger
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Render Tools recommend cards */}
                  {sec.tools && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 my-6">
                      {sec.tools.map((t) => (
                        <div
                          key={t.name}
                          className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col justify-between items-center text-center shadow-sm select-none"
                        >
                          <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">
                            {t.provider}
                          </span>
                          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 my-3 border border-slate-200/60 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-blue-300">
                            {getToolLogo(t.name, t.provider)}
                          </div>
                          <span className="text-[10px] font-black text-slate-850 leading-tight">
                            {t.name.split(" ")[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dynamic checklist for Key Takeaways */}
                  {sec.id === "takeaways" && post.takeaways && (
                    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white space-y-4 shadow-lg my-6">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-6 h-6" />
                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider">
                          Key Takeaways
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {post.takeaways.map((take, tIdx) => (
                          <li key={tIdx} className="flex items-start text-xs sm:text-sm font-medium">
                            <Check className="w-5 h-5 mr-3 shrink-0 bg-white/20 rounded-full p-1" />
                            <span>{take}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Links */}
          <div className="flex justify-between items-center border-t border-slate-200 pt-8 mt-12 font-sans min-w-0 w-full">
            {prevSlug ? (
              <Link
                href={`/blog/${prevSlug}`}
                className="text-left group select-none flex-1 max-w-[45%] min-w-0"
              >
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1 group-hover:-translate-x-1 transition-transform shrink-0" />
                  <span className="truncate">Previous Article</span>
                </div>
                <div className="text-xs font-black text-slate-850 truncate group-hover:text-blue-600 transition-colors mt-1">
                  {allBlogs[prevSlug].title}
                </div>
              </Link>
            ) : <div className="flex-1 max-w-[45%]" />}

            <Link href="/blog" className="mx-4 text-slate-400 hover:text-blue-600 transition-colors shrink-0">
              <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
                <rect x="15" y="15" width="26" height="26" rx="4" />
                <rect x="59" y="15" width="26" height="26" rx="4" />
                <rect x="15" y="59" width="26" height="26" rx="4" />
                <rect x="59" y="59" width="26" height="26" rx="4" />
              </svg>
            </Link>

            {nextSlug ? (
              <Link
                href={`/blog/${nextSlug}`}
                className="text-right group select-none flex-1 max-w-[45%] min-w-0"
              >
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end">
                  <span className="truncate">Next Article</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
                <div className="text-xs font-black text-slate-850 truncate group-hover:text-blue-600 transition-colors mt-1">
                  {allBlogs[nextSlug].title}
                </div>
              </Link>
            ) : <div className="flex-1 max-w-[45%]" />}
          </div>

        </main>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-12 self-start h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollbar-thin">



          {/* Sticky updates widget */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase border-b border-slate-100 pb-2 text-center">
              Never Miss An Update
            </h4>
            <p className="text-[11px] text-slate-500 leading-normal text-center">
              Get the latest engineering insights and best practices.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-slate-700"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm transition-all"
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>

        </aside>

      </div>

      {/* ================= CONTINUE READING SECTION (Bottom Full Width) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 mt-20 pt-16 space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Continue Reading
          </h3>
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All Posts
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((rPost) => (
            <div
              key={rPost.slug}
              className="rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={rPost.image}
                  alt={rPost.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded bg-white/90 backdrop-blur text-blue-700 border border-slate-100 shadow-sm">
                  {rPost.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{rPost.readTime}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${rPost.slug}`}>
                      {rPost.title}
                    </Link>
                  </h4>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {rPost.summary}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
