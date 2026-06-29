"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Menu } from "lucide-react";
import { blogData } from "@/data/siteData";

export default function BlogHub() {
  const [selectedCategory, setSelectedCategory] = useState("LATEST");

  // Separate featured story (cloud-cost-guardrails) from the grid stories
  const featuredSlug = "cloud-cost-guardrails";
  const featuredPost = blogData[featuredSlug];

  // Grid stories (all except featured)
  const gridSlugs = Object.keys(blogData).filter((slug) => slug !== featuredSlug);

  // Filter grid stories by selected category
  const filteredGridSlugs = gridSlugs.filter((slug) => {
    if (selectedCategory === "LATEST") return true;
    const post = blogData[slug];
    const cat = post.category.toUpperCase().replace(/\s/g, "");
    const selected = selectedCategory.toUpperCase().replace(/\s/g, "");

    // Custom mappings to match filter clicks
    if (selected === "SECURITY") return cat.includes("SECURITY") || cat.includes("DEVOPS");
    if (selected === "DEVOPS") return cat.includes("DEVOPS") || cat.includes("CLOUD");
    if (selected === "CLOUD/SRE") return cat.includes("CLOUD") || cat.includes("SRE");
    if (selected === "AI&AUTOMATION") return cat.includes("AI") || cat.includes("AUTOMATION");
    if (selected === "OBSERVABILITY") return cat.includes("OBSERVABILITY");
    if (selected === "TRENDING") return slug.includes("optimization") || slug.includes("microservices");

    return cat.includes(selected);
  });

  const categories = [
    "LATEST",
    "TRENDING",
    "SECURITY",
    "DEVOPS",
    "CLOUD / SRE",
    "AI & AUTOMATION",
    "OBSERVABILITY"
  ];

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-slate-50/30">

      {/* Background radial glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* 1. Masthead / Newspaper Header */}
      <div className="space-y-4">
        <div className="border-t-2 border-b border-slate-900/90 py-6">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter text-center uppercase font-sans select-none">
            <span className="text-purple-700">Today</span> at Privia
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-black tracking-wider text-slate-500 uppercase border-b border-slate-900/90 pb-4">
          <span className="leading-relaxed">
            Guides, best practices, and insights regarding software engineering, automated DevOps, and security structures.
          </span>

        </div>
      </div>

      {/* 2. Featured Story Section */}
      {featuredPost && (
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6">
          {/* Featured details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase bg-purple-700 rounded-md">
              Featured Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight hover:text-purple-700 transition-colors">
              <Link href={`/blog/${featuredSlug}`}>
                {featuredPost.title}
              </Link>
            </h2>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
              <span>{featuredPost.readTime}</span>
              <span>•</span>
              <span>By {featuredPost.author}</span>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {featuredPost.summary}
            </p>
            <div className="pt-2">
              <Link
                href={`/blog/${featuredSlug}`}
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-black text-white bg-purple-700 hover:bg-purple-800 transition-all text-xs shadow-md uppercase tracking-wider"
              >
                Read Full Article
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Featured Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-100 shadow-sm group">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Grid of Horizontal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 pt-4">
        {filteredGridSlugs.map((slug) => {
          const post = blogData[slug];
          return (
            <div
              key={slug}
              className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl border border-slate-200/40 bg-white/40 hover:bg-white/90 hover:border-slate-200/80 hover:shadow-md transition-all duration-300 group"
            >
              {/* Image Column */}
              <div className="w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200/40">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Column */}
              <div className="flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-2">

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    By {post.author}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center text-xs font-bold text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Subscription Banner */}
      <div className="bg-purple-100/60 border border-purple-200/80 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 mt-16 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-600 rounded-xl text-white">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-purple-950">
              Never Miss An Update
            </h4>
            <p className="text-xs sm:text-sm text-purple-800 font-medium">
              Get the latest engineering insights, guides, and best practices straight to your inbox.
            </p>
          </div>
        </div>

        <div className="flex w-full lg:w-auto items-center space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 lg:w-64 px-4 py-2.5 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs font-medium"
          />
          <button className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-sm">
            Subscribe
          </button>
        </div>
      </div>

    </div>
  );
}

