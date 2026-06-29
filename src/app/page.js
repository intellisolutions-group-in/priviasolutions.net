"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { 
  Code, Cpu, Settings, Terminal, UserCheck, 
  Activity, Lock, Database, Sparkles, ArrowRight,
  Zap, ShieldCheck, CreditCard, Heart, Cloud, ShoppingCart, DollarSign, Star, Award, Check, Quote,
  Play, Globe, Users, Rocket, Clock
} from "lucide-react";
import { servicesData, blogData, solutionsData } from "@/data/siteData";

const ThreeDHero = dynamic(() => import("@/components/ThreeDHero"), { ssr: false });

const gridPositions = [
  // Row 1
  [-570, -120], // Col 1
  [-190, -120], // Col 2
  [190, -120],  // Col 3
  [570, -120],  // Col 4

  // Row 2
  [-570, 120],  // Col 1
  [-190, 120],  // Col 2
  [190, 120],   // Col 3
  [570, 120],   // Col 4
];

const serviceIcons = {
  "custom-development": Code,
  "mobile-apps": Cpu,
  "cloud-sre": Settings,
  "api-integrations": Terminal,
  "qa-performance": UserCheck,
  "managed-support": Activity,
  "cybersecurity": Lock,
  "data-ai": Database,
  "ux-ui": Sparkles
};

const serviceAnimationMeta = {
  "cybersecurity": {
    themeColor: "text-blue-400",
    bulletColor: "bg-blue-400/70",
    iconBg: "bg-blue-500/10 text-blue-400",
    hoverGlow: "rgba(59, 130, 246, 0.15)",
    hoverBorder: "rgba(59, 130, 246, 0.4)"
  },
  "data-ai": {
    themeColor: "text-emerald-400",
    bulletColor: "bg-emerald-400/70",
    iconBg: "bg-emerald-500/10 text-emerald-400",
    hoverGlow: "rgba(16, 185, 129, 0.15)",
    hoverBorder: "rgba(16, 185, 129, 0.4)"
  },
  "ux-ui": {
    themeColor: "text-purple-400",
    bulletColor: "bg-purple-400/70",
    iconBg: "bg-purple-500/10 text-purple-400",
    hoverGlow: "rgba(168, 85, 247, 0.15)",
    hoverBorder: "rgba(168, 85, 247, 0.4)"
  },
  "api-integrations": {
    themeColor: "text-cyan-400",
    bulletColor: "bg-cyan-400/70",
    iconBg: "bg-cyan-500/10 text-cyan-400",
    hoverGlow: "rgba(6, 182, 212, 0.15)",
    hoverBorder: "rgba(6, 182, 212, 0.4)"
  },
  "qa-performance": {
    themeColor: "text-amber-400",
    bulletColor: "bg-amber-400/70",
    iconBg: "bg-amber-500/10 text-amber-400",
    hoverGlow: "rgba(245, 158, 11, 0.15)",
    hoverBorder: "rgba(245, 158, 11, 0.4)"
  },
  "managed-support": {
    themeColor: "text-rose-400",
    bulletColor: "bg-rose-400/70",
    iconBg: "bg-rose-500/10 text-rose-400",
    hoverGlow: "rgba(244, 63, 94, 0.15)",
    hoverBorder: "rgba(244, 63, 94, 0.4)"
  },
  "custom-development": {
    themeColor: "text-sky-400",
    bulletColor: "bg-sky-400/70",
    iconBg: "bg-sky-500/10 text-sky-400",
    hoverGlow: "rgba(14, 165, 233, 0.15)",
    hoverBorder: "rgba(14, 165, 233, 0.4)"
  },
  "mobile-apps": {
    themeColor: "text-teal-400",
    bulletColor: "bg-teal-400/70",
    iconBg: "bg-teal-500/10 text-teal-400",
    hoverGlow: "rgba(20, 184, 166, 0.15)",
    hoverBorder: "rgba(20, 184, 166, 0.4)"
  },
  "cloud-sre": {
    themeColor: "text-violet-400",
    bulletColor: "bg-violet-400/70",
    iconBg: "bg-violet-500/10 text-violet-400",
    hoverGlow: "rgba(139, 92, 246, 0.15)",
    hoverBorder: "rgba(139, 92, 246, 0.4)"
  }
};

const serviceImages = {
  "custom-development": "/assets/images/services/custom-development.webp",
  "mobile-apps": "/assets/images/services/mobile-apps.webp",
  "cloud-sre": "/assets/images/services/cloud-sre.webp",
  "api-integrations": "/assets/images/services/api-integrations.webp",
  "qa-performance": "/assets/images/services/qa-performance.webp",
  "managed-support": "/assets/images/services/managed-support.webp",
  "cybersecurity": "/assets/images/services/cybersecurity.webp",
  "data-ai": "/assets/images/services/data-ai.webp"
};

const serviceLinkColors = {
  "cybersecurity": { light: "#1d4ed8", dark: "#60a5fa" },
  "data-ai": { light: "#047857", dark: "#34d399" },
  "ux-ui": { light: "#7e22ce", dark: "#c084fc" },
  "api-integrations": { light: "#0e7490", dark: "#22d3ee" },
  "qa-performance": { light: "#b45309", dark: "#fbbf24" },
  "managed-support": { light: "#be123c", dark: "#fb7185" },
  "custom-development": { light: "#0369a1", dark: "#38bdf8" },
  "mobile-apps": { light: "#0f766e", dark: "#2dd4bf" },
  "cloud-sre": { light: "#6d28d9", dark: "#a78bfa" }
};

function Carousel3dCard({ slug, data, index, scrollYProgress, isActive, onCardClick }) {
  const meta = serviceAnimationMeta[slug] || {
    themeColor: "text-primary",
    bulletColor: "bg-primary/70",
    iconBg: "bg-slate-50 text-slate-500",
    hoverGlow: "rgba(44, 94, 173, 0.15)",
    hoverBorder: "rgba(44, 94, 173, 0.4)"
  };
  const IconComponent = serviceIcons[slug] || Code;

  // Custom distance calculation from the active front position
  const distanceVal = useTransform(scrollYProgress, (progress) => {
    const activeP = progress * 7;
    const diff = Math.abs(index - activeP);
    return Math.min(diff, 8 - diff);
  });

  // Smoothly interpolate styling values based on distance from the front
  const scale = useTransform(distanceVal, [0, 1, 2, 3], [1.05, 0.82, 0.68, 0.58]);
  const opacity = useTransform(distanceVal, [0, 1, 2, 3], [1, 0.75, 0.3, 0.12]);
  const visibility = useTransform(distanceVal, (val) => val > 1.6 ? "hidden" : "visible");
  const pointerEvents = useTransform(distanceVal, (val) => val > 1.6 ? "none" : "auto");

  const cardTitleColor = useTransform(scrollYProgress, [0, 0.5], ["#0f172a", "#ffffff"]);

  // Only display titles for the 3 front-facing cards
  const contentOpacity = useTransform(distanceVal, [1.2, 1.6], [1, 0]);

  const angle = index * 45;

  return (
    <div 
      className="carousel-3d-card-wrapper"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateY(${angle}deg) translateZ(480px)`
      }}
    >
      <Link 
        href={`/services/${slug}`}
        onClick={(e) => {
          if (!isActive) {
            e.preventDefault();
            e.stopPropagation();
            onCardClick(index);
          } else {
            e.stopPropagation();
          }
        }}
        className="flex flex-col items-center select-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* The actual card containing the image with hover effect */}
        <motion.div
          style={{
            scale,
            opacity,
            visibility,
            pointerEvents,
            willChange: "transform, opacity",
            "--hover-glow": meta.hoverGlow,
            "--hover-border": meta.hoverBorder
          }}
          className="carousel-3d-card relative overflow-hidden group rounded-[24px]"
        >
          {/* Service Image */}
          <Image 
            src={serviceImages[slug] || `/assets/images/services/${slug}.webp`}
            alt={data.title}
            fill
            sizes="360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Bevel gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

          {/* Floating icon */}
          <div className="absolute top-4 left-4 z-10">
            <div className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-110 ${meta.iconBg}`}>
              <IconComponent className="w-4 h-4" />
            </div>
          </div>

          {/* Hover overlay with details */}
          <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-md transition-all duration-300 p-5 flex flex-col justify-between z-20">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">key metrics</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {data.description}
              </p>
            </div>
            <ul className="space-y-1.5 pt-2 border-t border-white/5">
              {data.features.slice(0, 3).map((f) => (
                <li key={f} className="text-[9px] text-slate-300 flex items-center leading-snug">
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.bulletColor} mr-2 flex-shrink-0`} />
                  <span className="line-clamp-1">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Title below the card (only visible for the front 3 cards) */}
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="mt-4 flex flex-col items-center"
        >
          <motion.h4 
            style={{ color: cardTitleColor }} 
            className="text-sm font-extrabold text-center tracking-wide drop-shadow-md select-none"
          >
            {data.title}
          </motion.h4>
        </motion.div>
      </Link>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [orderCount, setOrderCount] = useState(3370);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stuckStates = { card1: false, card2: false, card3: false };

    const updateClasses = () => {
      const card1 = document.getElementById("step-card-1");
      const card2 = document.getElementById("step-card-2");
      const card3 = document.getElementById("step-card-3");
      if (!card1 || !card2 || !card3) return;

      if (window.innerWidth <= 1023) {
        [card1, card2, card3].forEach((card) => {
          card.classList.remove("stacked-under-1", "stacked-under-2", "active-focus");
        });
        return;
      }

      card1.classList.remove("stacked-under-1", "stacked-under-2", "active-focus");
      card2.classList.remove("stacked-under-1", "stacked-under-2", "active-focus");
      card3.classList.remove("stacked-under-1", "stacked-under-2", "active-focus");

      if (stuckStates.card3) {
        card1.classList.add("stacked-under-1");
        card2.classList.add("stacked-under-2");
        card3.classList.add("active-focus");
      } else if (stuckStates.card2) {
        card1.classList.add("stacked-under-2");
        card2.classList.add("active-focus");
      } else if (stuckStates.card1) {
        card1.classList.add("active-focus");
      }
    };

    const createObserver = (cardKey, marginString, stuckOffset) => {
      return new IntersectionObserver((entries) => {
        const [entry] = entries;
        // Element is stuck if it is not intersecting the active area AND is above/at the sticky top offset
        stuckStates[cardKey] = !entry.isIntersecting && entry.boundingClientRect.top <= stuckOffset + 5;
        updateClasses();
      }, {
        rootMargin: marginString
      });
    };

    const observer1 = createObserver("card1", "-170px 0px 0px 0px", 170);
    const observer2 = createObserver("card2", "-210px 0px 0px 0px", 210);
    const observer3 = createObserver("card3", "-250px 0px 0px 0px", 250);

    const s1 = document.getElementById("step-card-sentinel-1");
    const s2 = document.getElementById("step-card-sentinel-2");
    const s3 = document.getElementById("step-card-sentinel-3");

    if (s1) observer1.observe(s1);
    if (s2) observer2.observe(s2);
    if (s3) observer3.observe(s3);

    const handleResize = () => {
      updateClasses();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
      observer3.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Grab 3 latest blog posts
  const blogSlugs = Object.keys(blogData).slice(0, 3);

  const gitInsightsData = {
    "cloud-cost-guardrails": {
      branch: "sre",
      branchName: "sre/infra-budget",
      branchColor: "#a78bfa",
      commitHash: "f6b8c4d",
      commitMsg: "sre: enforce autoscale budgets & instance caps",
      fileName: "infra/aws_guardrails.tf",
      diff: [
        { type: "normal", text: "resource \"aws_instance\" \"app_node\" {" },
        { type: "deletion", text: "-   instance_type = \"t3.xlarge\"" },
        { type: "addition", text: "+   instance_type = \"t3.medium\"" },
        { type: "normal", text: "}" },
        { type: "normal", text: "" },
        { type: "normal", text: "resource \"aws_autoscaling_group\" \"asg\" {" },
        { type: "addition", text: "+   max_size          = 4" },
        { type: "addition", text: "+   # Cron shutdown at 18:00 UTC for sandboxes" },
        { type: "addition", text: "+   recurrence        = \"0 18 * * 1-5\"" },
        { type: "normal", text: "}" }
      ]
    },
    "shift-security-left": {
      branch: "security",
      branchName: "sec/pipeline-audit",
      branchColor: "#2dd4bf",
      commitHash: "e3d9f2a",
      commitMsg: "sec: add signed commits & automated vulnerability gates",
      fileName: ".gitlab-ci.yml",
      diff: [
        { type: "normal", text: "test_job:" },
        { type: "deletion", text: "-   stage: test" },
        { type: "deletion", text: "-   script: npm run test" },
        { type: "addition", text: "+   stage: compliance" },
        { type: "addition", text: "+   script:" },
        { type: "addition", text: "+     - npm run audit-licenses" },
        { type: "addition", text: "+     - owasp-dependency-check --project \"Privia\"" },
        { type: "addition", text: "+     - semgrep --config auto" }
      ]
    },
    "kubernetes-resource-optimization": {
      branch: "dev",
      branchName: "dev/api-caching",
      branchColor: "#38bdf8",
      commitHash: "b2a5f7c",
      commitMsg: "feat: integrate redis cluster for rate-limiting",
      fileName: "api/gateway/middleware.js",
      diff: [
        { type: "normal", text: "const rateLimit = require('express-rate-limit');" },
        { type: "deletion", text: "- app.use(basicRateLimit);" },
        { type: "addition", text: "+ const limitStore = new RedisStore({ client: redisCluster });" },
        { type: "addition", text: "+ app.use(rateLimit({" },
        { type: "addition", text: "+   windowMs: 60 * 1000, // 1 minute window" },
        { type: "addition", text: "+   max: 120, // Limit each IP to 120 requests" },
        { type: "addition", text: "+   store: limitStore" },
        { type: "addition", text: "+ }));" }
      ]
    }
  };
  
  // Grab key metrics
  const stats = [
    { 
      number: "250+", 
      label: "Platforms Delivered", 
      heading: "Global Scale & Deployments",
      desc: "We have built, hardened, and deployed high-performance custom engines and data systems for enterprise brands worldwide.",
      icon: Award,
      glowClass: "glow-card-gold"
    },
    { 
      number: "4x", 
      label: "Accelerated Release Speed", 
      heading: "Rapid Release Velocity",
      desc: "Our integration of automated CI/CD guardrails and declarative infrastructure templates enables engineering teams to deploy 4x faster.",
      icon: Zap,
      glowClass: "glow-card-teal"
    },
    { 
      number: "99.99%", 
      label: "System Uptime Guaranteed", 
      heading: "Maximum Operational Resilience",
      desc: "By designing fault-tolerant multi-region cluster topologies and hooking up active 24/7 reliability engineering, we secure critical availability.",
      icon: ShieldCheck,
      glowClass: "glow-card-purple"
    }
  ];





  const testimonials = [
    { 
      id: 1,
      q: "Privia Solutions provided exceptional cloud setup and migrations. Their engineers solved our synchronization errors and did it with zero platform downtime.", 
      name: "Amit Desai", 
      role: "VP of Product", 
      glowClass: "glow-card-gold",
      stars: 5,
      initials: "AD",
      avatarClass: "avatar-grad-1"
    },
    { 
      id: 2,
      q: "Their team rebuilt our medical booking system, securing patient logs and compliance audits efficiently. Extremely knowledgeable.", 
      name: "Sanjay Rao", 
      role: "VP of Engineering", 
      glowClass: "glow-card-teal",
      stars: 5,
      initials: "SR",
      avatarClass: "avatar-grad-2"
    },
    { 
      id: 3,
      q: "Excellent experience working with them. They redesigned our entire payment processing architecture to support a massive volume increase.", 
      name: "Meera Iyer", 
      role: "CTO", 
      glowClass: "glow-card-purple",
      stars: 5,
      initials: "MI",
      avatarClass: "avatar-grad-3"
    },
    { 
      id: 4,
      q: "The scroll stack animations are incredibly smooth. Privia Solutions helped us elevate our website design to a whole new premium level in just a few hours.", 
      name: "Sneha Jha", 
      role: "Lead Product Designer", 
      glowClass: "glow-card-gold",
      stars: 5,
      initials: "SJ",
      avatarClass: "avatar-grad-4"
    },
    { 
      id: 5,
      q: "Implementing infinite loops and interactive elements with vanilla JS has never been this clean. Excellent performance and zero layout thrashing.", 
      name: "Alok Ranjan", 
      role: "Senior Frontend Engineer", 
      glowClass: "glow-card-teal",
      stars: 5,
      initials: "AR",
      avatarClass: "avatar-grad-5"
    },
    { 
      id: 6,
      q: "Our conversion rates increased by 22% after we refreshed our home page using these fluid motion designs. Highly recommended for modern SaaS websites.", 
      name: "Divya Choudhary", 
      role: "VP of Product", 
      glowClass: "glow-card-purple",
      stars: 5,
      initials: "DC",
      avatarClass: "avatar-grad-6"
    },
    { 
      id: 7,
      q: "The attention to minor details in typography, gradients, and micro-interactions makes a massive difference. Outstanding UI toolkit and support!", 
      name: "Esha Wagle", 
      role: "Creative Director", 
      glowClass: "glow-card-gold",
      stars: 5,
      initials: "EW",
      avatarClass: "avatar-grad-7"
    },
    { 
      id: 8,
      q: "We were skeptical about pure CSS performance on heavy pages, but Privia runs perfectly at 120 FPS even on lower-end mobile devices.", 
      name: "Mohit Verma", 
      role: "Tech Lead", 
      glowClass: "glow-card-teal",
      stars: 4,
      initials: "MV",
      avatarClass: "avatar-grad-8"
    },
    { 
      id: 9,
      q: "The team has created something truly state-of-the-art here. The glassmorphism transitions are extremely crisp, modern, and perfectly robust.", 
      name: "Harsha Kamat", 
      role: "Design Engineer", 
      glowClass: "glow-card-purple",
      stars: 5,
      initials: "HK",
      avatarClass: "avatar-grad-9"
    },
    { 
      id: 10,
      q: "Setting this up was a breeze. We integrated the component structure into our NextJS project in under ten minutes with zero compilation errors.", 
      name: "Omkar Lal", 
      role: "Frontend Lead", 
      glowClass: "glow-card-gold",
      stars: 5,
      initials: "OL",
      avatarClass: "avatar-grad-10"
    }
  ];

  const [reviews, setReviews] = useState(testimonials);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [useTransition, setUseTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);

  const getSlideDistance = () => {
    if (!trackRef.current || !trackRef.current.children.length) return 0;
    const card = trackRef.current.children[0];
    const cardWidth = card.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(trackRef.current).gap) || 24;
    return cardWidth + gap;
  };

  const slideNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setUseTransition(true);

    const distance = getSlideDistance();
    setTranslateX(-distance);

    setTimeout(() => {
      setUseTransition(false);
      setReviews((prev) => {
        const next = [...prev];
        const first = next.shift();
        next.push(first);
        return next;
      });
      setTranslateX(0);
      setIsTransitioning(false);
    }, 600);
  };

  const slidePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const distance = getSlideDistance();

    setReviews((prev) => {
      const next = [...prev];
      const last = next.pop();
      next.unshift(last);
      return next;
    });

    setUseTransition(false);
    setTranslateX(-distance);

    setTimeout(() => {
      setUseTransition(true);
      setTranslateX(0);
    }, 20);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 620);
  };

  const navigateToCardIndex = (targetId) => {
    if (isTransitioning) return;

    const targetPos = reviews.findIndex((r) => r.id === targetId);
    if (targetPos === 0) return;

    setIsTransitioning(true);
    setUseTransition(true);
    const distance = getSlideDistance();

    setTranslateX(-distance * targetPos);

    setTimeout(() => {
      setUseTransition(false);
      setReviews((prev) => {
        const next = [...prev];
        for (let i = 0; i < targetPos; i++) {
          const leading = next.shift();
          next.push(leading);
        }
        return next;
      });
      setTranslateX(0);
      setIsTransitioning(false);
    }, 600);
  };

  useEffect(() => {
    if (isHovered || isTransitioning) return;
    const interval = setInterval(() => {
      slideNext();
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered, isTransitioning, reviews]);

  const [isDesktop, setIsDesktop] = useState(false);
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [activeInsightSlug, setActiveInsightSlug] = useState("cloud-cost-guardrails");
  const [hoveredInsightSlug, setHoveredInsightSlug] = useState(null);
  const servicesContainerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sectionZIndex, setSectionZIndex] = useState("z-[70]");

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("privia_website_loaded") === "true";
    if (hasLoaded) {
      setIsLoaded(true);
      setSectionZIndex("z-10");
    } else {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const hasLoaded = sessionStorage.getItem("privia_website_loaded") === "true";
      if (hasLoaded) {
        setSectionZIndex("z-10");
      } else {
        const timer = setTimeout(() => {
          setSectionZIndex("z-10");
          sessionStorage.setItem("privia_website_loaded", "true");
        }, 1500); // Delay to match the transition & preloader exit
        return () => clearTimeout(timer);
      }
    } else {
      setSectionZIndex("z-[70]");
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsightSlug((prev) => {
        const keys = ["cloud-cost-guardrails", "shift-security-left", "kubernetes-resource-optimization"];
        const currentIndex = keys.indexOf(prev);
        const nextIndex = (currentIndex + 1) % keys.length;
        return keys[nextIndex];
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: isDesktop ? servicesContainerRef : undefined,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawScrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  useMotionValueEvent(rawScrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.max(Math.round(latest * 7), 0), 7);
    setActiveCarouselIndex(idx);
  });

  const [tiltStyle, setTiltStyle] = useState({ transform: "rotateX(52deg) rotateZ(-38deg)" });
  const stageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    const tiltX = 52 - yVal * 14;
    const tiltZ = -38 + xVal * 14;
    setTiltStyle({
      transform: `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "rotateX(52deg) rotateZ(-38deg)"
    });
  };

  const handleCardClick = (index) => {
    if (!servicesContainerRef.current) return;
    const element = servicesContainerRef.current;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const elementHeight = element.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = elementHeight - viewportHeight;
    const targetScroll = elementTop + (index / 7) * scrollableHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const headerOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0.85, 0.95], [0, -50]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -315]);
  const headerColor = useTransform(scrollYProgress, [0, 0.5], ["#0f172a", "#ffffff"]);
  const subHeaderColor = useTransform(scrollYProgress, [0, 0.5], ["#1591dc", "#4bb8fa"]);
  const descColor = useTransform(scrollYProgress, [0, 0.5], ["#475569", "#cbd5e1"]);

  const serviceGlowClasses = ["glow-card-teal", "glow-card-gold", "glow-card-purple", "glow-card-rose"];
  const blogGlows = ["glow-card-gold", "glow-card-teal", "glow-card-purple"];

  return (
    <div className={`relative text-slate-900 transition-colors duration-1000 ${isLoaded ? "bg-[#edf5fd]" : "bg-[#0a0c16]"}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: ${isLoaded ? '#edf5fd' : '#0a0c16'} !important;
          transition: background-color 1s ease-in-out !important;
        }
        nav, footer {
          opacity: ${isLoaded ? 1 : 0} !important;
          pointer-events: ${isLoaded ? 'auto' : 'none'} !important;
          transition: opacity 0.8s ease-in-out !important;
        }
      `}} />
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#0a0c16] z-[60] flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Spacer equal to core diameter to center text below it */}
            <div className="h-[280px] sm:h-[320px]" />
            
            <motion.h1
              initial={{ opacity: 0, y: 30, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-outfit font-black text-3xl sm:text-5xl text-white mt-12 bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] uppercase tracking-[0.25em]"
            >
              PRIVIA
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.2, 0.4], transition: { delay: 1.6, duration: 3, repeat: Infinity } }}
              exit={{ opacity: 0 }}
              className="text-[10px] sm:text-xs text-blue-200/50 mt-4 tracking-[0.4em] uppercase font-mono font-bold"
            >
              System Initialization
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Grid background overlay */}
      <div className="absolute inset-0 grid-pattern opacity-[0.4] pointer-events-none -z-20"></div>

      {/* Hero Section Container (Full-width wrapper to support full-bleed background image) */}
      <div className={`relative w-full overflow-hidden border-b border-slate-200/40 transition-colors duration-1000 ${isLoaded ? "bg-gradient-to-b from-[#edf5fd] to-[#dceaf7]" : "bg-[#0a0c16]"}`}>
        
        {/* Full-bleed Background Image */}
        <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <Image 
            src="/assets/images/futuristic_city_bg.webp"
            alt="Futuristic digital city background Privia Core"
            fill
            priority
            className="object-cover object-right opacity-35 sm:opacity-55 lg:opacity-100"
          />
          {/* Gradients to blend into slate-50 background on left and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#edf5fd] via-[#edf5fd]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#dceaf7] via-transparent to-transparent z-10" />
        </div>

        {/* 1. Hero Section (White/Light Slate Alternate) */}
        <section className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${sectionZIndex}`}>
        {/* We use a grid system that divides the space into 12 cols on desktop */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headings, Paragraph, Buttons, and Trust Metrics (lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#C4E2F5]/30 border border-[#C4E2F5]/50 text-xs font-bold text-[#2C5EAD]">
              <Sparkles className="w-4 h-4 text-[#1591DC]" />
              <span>Orchestrating Next-Generation Digital Architectures</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
              PRIVIA SYSTEMS <br />
              <span className="bg-gradient-to-r from-[#2C5EAD] via-[#1591DC] to-[#4BB8FA] bg-clip-text text-transparent">IT Solutions Engineered for Impact</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              We design, deploy, and support secure, scalable cloud systems, bespoke software platforms, and enterprise API gateways for global organizations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full font-mono">
              <Link 
                href="/contact" 
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] hover:opacity-95 hover:scale-102 hover:shadow-lg hover:shadow-primary/20 transition-all glow-btn text-sm"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                href="/case-studies" 
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-[#2C5EAD] bg-white border border-[#2C5EAD]/30 hover:bg-slate-50 hover:scale-102 transition-all text-sm shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mr-2">
                  <Play className="w-2.5 h-2.5 text-[#2C5EAD] fill-[#2C5EAD]" />
                </div>
                View Case Studies
              </Link>
            </div>

            {/* Trust metrics row to match image mockup */}
            <div className="pt-8 border-t border-slate-200/60 w-full flex flex-row flex-wrap justify-center sm:grid sm:grid-cols-2 gap-y-3 gap-x-6 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-mono text-slate-800 block font-bold leading-none mb-1">Fully Secure</span>
                  <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 leading-none">Environment</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-mono text-slate-800 block font-bold leading-none mb-1">99.99% SLA</span>
                  <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 leading-none">Uptime</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: 3D Hologram WebGL Scene (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center items-center w-full relative">
            <ThreeDHero isLoaded={isLoaded} />
          </div>
        </div>

        {/* Bottom Horizontal Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 sm:mt-24 p-6 sm:p-8 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.02)] grid grid-cols-2 lg:grid-cols-4 gap-6 items-center w-full"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2C5EAD] border border-blue-100 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Rocket className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-[#2c5ead] font-mono leading-none block">150+</span>
              <span className="text-[10px] font-bold text-slate-800 block uppercase tracking-wider mt-0.5">Successful Deployments</span>
              <span className="text-[9px] font-medium text-slate-400 block mt-0.5">Across Industries</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2C5EAD] border border-blue-100 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Globe className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-[#2c5ead] font-mono leading-none block">25+</span>
              <span className="text-[10px] font-bold text-slate-800 block uppercase tracking-wider mt-0.5">Countries Served</span>
              <span className="text-[9px] font-medium text-slate-400 block mt-0.5">Globally</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2C5EAD] border border-blue-100 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-[#2c5ead] font-mono leading-none block">500+</span>
              <span className="text-[10px] font-bold text-slate-800 block uppercase tracking-wider mt-0.5">Enterprise Clients</span>
              <span className="text-[9px] font-medium text-slate-400 block mt-0.5">Trust Us</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2C5EAD] border border-blue-100 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-[#2c5ead] font-mono leading-none block">10+</span>
              <span className="text-[10px] font-bold text-slate-800 block uppercase tracking-wider mt-0.5">Years of Engineering</span>
              <span className="text-[9px] font-medium text-slate-400 block mt-0.5">Excellence</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>

      {/* 2. About Intro Section (Light Blue Alternate Background) */}
      <section className="relative border-y border-slate-200/40 bg-gradient-to-b from-[#dceaf7] to-[#b9d3ee] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-xs font-black tracking-widest text-[#1591DC] uppercase">
                Your Trusted Partner for Digital Transformation
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering businesses with robust cloud strategies and tailored digital execution.
              </h3>
              <p className="text-slate-600 leading-relaxed">
                At Privia Solutions, we solve complex technical architecture bottlenecks. Whether you need to migrate from a legacy monolith database, configure zero-downtime deployments, or audit systems security compliance, our engineering division has the expertise.
              </p>
              <div>
                <Link 
                  href="/about" 
                  className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary transition-colors group"
                >
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Card 1: 18M+ Code */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-300 hover:border-blue-500/70 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(44,94,173,0.09)] transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-2xl bg-blue-50/70 text-blue-500 border border-blue-100/40 transition-all duration-300 group-hover:scale-110">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 font-bold tracking-wider uppercase select-none">stat // code</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-400 tracking-tight leading-none">18M+</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Total lines of production code delivered securely</p>
                </div>
              </motion.div>

              {/* Card 2: Zero Leaks */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-300 hover:border-emerald-500/70 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(44,94,173,0.09)] transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group mt-4"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-2xl bg-emerald-50/70 text-emerald-500 border border-emerald-100/40 transition-all duration-300 group-hover:scale-110">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 font-bold tracking-wider uppercase select-none">stat // sec</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-400 tracking-tight leading-none">Zero</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Data leaks or system breach incidents recorded</p>
                </div>
              </motion.div>

              {/* Card 3: 45+ Microservices */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-300 hover:border-purple-500/70 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(44,94,173,0.09)] transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-2xl bg-purple-50/70 text-purple-500 border border-purple-100/40 transition-all duration-300 group-hover:scale-110">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 font-bold tracking-wider uppercase select-none">stat // micro</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-400 tracking-tight leading-none">45+</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Microservices successfully extracted from monoliths</p>
                </div>
              </motion.div>

              {/* Card 4: 24/7 SRE */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-300 hover:border-rose-500/70 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(44,94,173,0.09)] transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group mt-4"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-rose-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-2xl bg-rose-50/70 text-rose-500 border border-rose-100/40 transition-all duration-300 group-hover:scale-110">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 font-bold tracking-wider uppercase select-none">stat // sre</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-400 tracking-tight leading-none">24/7</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">SRE monitoring coverage and incident alert setups</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Grid Section */}
      <section 
        ref={servicesContainerRef} 
        className={isDesktop ? "relative h-[300vh] bg-gradient-to-b from-[#b9d3ee] to-[#254d80]" : "w-full py-24 bg-gradient-to-b from-[#b9d3ee] to-[#254d80] border-b border-white/5"}
      >
        {!isDesktop ? (
          /* Standard layout for mobile/tablet */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-xs font-black tracking-widest text-[#1591DC] uppercase">Comprehensive IT Solutions</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Our Core Services</h3>
              <p className="text-slate-800 text-sm sm:text-base">
                From frontend development to high-availability database engineering, we deliver clean systems designed to withstand heavy loads.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {Object.entries(servicesData).slice(0, 4).map(([slug, data], index) => {
                const IconComponent = serviceIcons[slug] || Code;
                return (
                  <motion.div 
                    key={slug} 
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => router.push(`/services/${slug}`)}
                    className="relative h-[300px] rounded-3xl overflow-hidden shadow-lg border border-white/10 hover:border-[#1591DC]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end p-6 group cursor-pointer"
                  >
                    {/* Background Image Container */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                      <Image 
                        src={serviceImages[slug] || "/assets/images/services/custom-development.webp"}
                        alt={data.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 400px"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                    </div>

                    <div className="relative z-20 space-y-2 text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-[#1591DC] transition-colors duration-300">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#4BB8FA] font-mono">Service</span>
                      </div>
                      
                      <h4 className="text-base font-extrabold text-white group-hover:text-[#4BB8FA] transition-colors leading-tight">
                        {data.title}
                      </h4>
                      
                      <p className="text-[11px] text-slate-200 leading-normal line-clamp-2">
                        {data.description}
                      </p>

                      <div className="pt-1 flex items-center justify-between">
                        <Link 
                          href={`/services/${slug}`}
                          className="inline-flex items-center text-[10px] font-black tracking-widest text-[#4BB8FA] group-hover:text-white uppercase transition-colors"
                        >
                          Explore Pathway
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/services" 
                className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-slate-800 transition-colors group"
              >
                View Other Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          /* 3D Perspective Circular Carousel for desktop */
          <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-start pt-32 overflow-hidden bg-transparent">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

            {/* Fading Sticky Header */}
            <motion.div 
              style={{ opacity: headerOpacity, y: headerY }}
              className="relative z-20 text-center max-w-3xl mx-auto space-y-4 px-4 pointer-events-none mb-8"
            >
              <motion.h2 style={{ color: subHeaderColor }} className="text-xs font-black tracking-widest uppercase">Comprehensive IT Solutions</motion.h2>
              <motion.h3 style={{ color: headerColor }} className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Core Services</motion.h3>
            </motion.div>

            {/* 3D Perspective Ring Container */}
            <div className="carousel-3d-perspective-container">
              <motion.div 
                className="carousel-3d-ring"
                style={{ rotateY, transformStyle: "preserve-3d" }}
              >
                {Object.entries(servicesData).slice(0, 8).map(([slug, data], index) => (
                  <Carousel3dCard 
                    key={slug} 
                    slug={slug} 
                    data={data} 
                    index={index} 
                    scrollYProgress={scrollYProgress}
                    isActive={activeCarouselIndex === index}
                    onCardClick={handleCardClick}
                  />
                ))}
              </motion.div>
            </div>

            {/* Vertical Dot Pagination Indicator on the right side of the page */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
              {Object.entries(servicesData).slice(0, 8).map(([slug, data], index) => {
                const isActive = activeCarouselIndex === index;
                return (
                  <button
                    key={slug}
                    onClick={() => handleCardClick(index)}
                    className={`w-2.5 transition-all duration-300 rounded-full ${
                      isActive ? "bg-[#1591DC] h-8 shadow-[0_0_10px_rgba(21,145,220,0.6)]" : "bg-white/20 hover:bg-white/45 h-2.5"
                    }`}
                    aria-label={`Go to service ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 4. Industries Section (Smooth Gradient Background) */}
      <section className="relative py-20 bg-gradient-to-b from-[#254d80] to-[#14294d] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-black tracking-widest text-[#1591DC] uppercase">Sectors We Empower</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Serving Businesses Across Every Sector</h3>
          </div>

          {!isDesktop ? (
            /* Standard Grid for Mobile/Tablet */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {/* 1. FINTECH: Dark Terminal Theme */}
              <div 
                onClick={() => router.push("/solutions/fintech")} 
                className="sector-custom-card card-fintech relative overflow-hidden group" 
                role="button" 
                tabIndex={0}
              >
                {/* Background Image (blurred) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                  <Image 
                    src="/assets/images/sectors/fintech.webp"
                    alt="FinTech"
                    fill
                    className="object-cover opacity-20 filter blur-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full justify-between w-full">
                  <div className="ft-header">
                    <div className="ft-dot" style={{ background: "#ff5f56" }}></div>
                    <div className="ft-dot" style={{ background: "#ffbd2e" }}></div>
                    <div className="ft-dot" style={{ background: "#27c93f" }}></div>
                  </div>
                  <div className="sector-custom-card-body flex flex-col justify-between h-full">
                    <div>
                      <div className="ft-ticker mb-4">
                        <div className="ft-ticker-line">
                          <span className="ft-lbl"><span>▲</span>SEC_AUDIT</span>
                          <span className="ft-val">OK</span>
                        </div>
                        <div className="ft-ticker-line">
                          <span className="ft-lbl">TX_HASH</span>
                          <span className="ft-val" style={{ color: "#38bdf8", fontSize: "11px" }}>0xf3a…9c2</span>
                        </div>
                        <div className="ft-ticker-line">
                          <span className="ft-lbl">LEDGER</span>
                          <span className="ft-val">LOCKED</span>
                        </div>
                      </div>
                      <h2 className="sector-custom-card-title text-white font-black">{solutionsData.fintech.title}</h2>
                      <p className="sector-custom-card-desc text-slate-100 font-semibold text-xs leading-relaxed">{solutionsData.fintech.description.split('. ')[0] + '.'}</p>
                      
                      {/* Features list */}
                      <ul className="space-y-1.5 my-4">
                        {solutionsData.fintech.features.slice(0, 2).map((feat, idx) => (
                          <li key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {/* Metrics Row */}
                      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mt-2">
                        {solutionsData.fintech.metrics.map((m, idx) => (
                          <div key={idx} className="text-center bg-[#070d18] border border-white/5 p-2 rounded-xl">
                            <span className="text-[9px] font-bold text-slate-400 block truncate">{m.label}</span>
                            <span className="text-xs font-black text-sky-400 block mt-0.5">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {solutionsData.fintech.techStack.map((tech) => (
                          <span key={tech} className="ft-tech-badge text-[9px] px-2 py-0.5 rounded bg-white/5 text-sky-300 border border-white/10">{tech}</span>
                        ))}
                      </div>

                      <div className="sector-custom-card-link text-sky-400 mt-6 inline-flex items-center gap-1.5 text-xs font-bold">
                        Explore Solution
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="3" y1="8" x2="13" y2="8" />
                          <polyline points="9 4 13 8 9 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 2. HEALTHCARE: Clinical Mint Theme */}
              <div 
                onClick={() => router.push("/solutions/healthcare")} 
                className="sector-custom-card card-health relative overflow-hidden group" 
                role="button" 
                tabIndex={0}
              >
                {/* Background Image (blurred) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                  <Image 
                    src="/assets/images/sectors/healthcare.webp"
                    alt="Healthcare"
                    fill
                    className="object-cover opacity-20 filter blur-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full justify-between w-full">
                  <div className="hc-strip"></div>
                  <div className="sector-custom-card-body flex flex-col justify-between h-full pt-4">
                    <div>
                      <div className="hc-pulse mb-4">
                        <div className="hc-cross">
                          <Heart className="w-5 h-5" />
                        </div>
                      </div>
                      <h2 className="sector-custom-card-title text-white font-black">{solutionsData.healthcare.title}</h2>
                      <p className="sector-custom-card-desc text-slate-100 font-semibold text-xs leading-relaxed">{solutionsData.healthcare.description.split('. ')[0] + '.'}</p>
                      
                      {/* Features list */}
                      <ul className="space-y-1.5 my-4">
                        {solutionsData.healthcare.features.slice(0, 2).map((feat, idx) => (
                          <li key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {/* Metrics Row */}
                      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mt-2">
                        {solutionsData.healthcare.metrics.map((m, idx) => (
                          <div key={idx} className="text-center bg-[#061e17] border border-white/5 p-2 rounded-xl">
                            <span className="text-[9px] font-bold text-slate-400 block truncate">{m.label}</span>
                            <span className="text-xs font-black text-emerald-400 block mt-0.5">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {solutionsData.healthcare.techStack.map((tech) => (
                          <span key={tech} className="hc-tag text-[9px] px-2 py-0.5 rounded bg-white/5 text-emerald-300 border border-white/10">{tech}</span>
                        ))}
                      </div>

                      <div className="sector-custom-card-link text-emerald-400 mt-6 inline-flex items-center gap-1.5 text-xs font-bold">
                        Explore Solution
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="3" y1="8" x2="13" y2="8" />
                          <polyline points="9 4 13 8 9 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 3. SAAS: Infra Dashboard Theme */}
              <div 
                onClick={() => router.push("/solutions/saas")} 
                className="sector-custom-card card-saas relative overflow-hidden group" 
                role="button" 
                tabIndex={0}
              >
                {/* Background Image (blurred) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                  <Image 
                    src="/assets/images/sectors/saas.webp"
                    alt="SaaS"
                    fill
                    className="object-cover opacity-20 filter blur-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between w-full">
                  <div className="saas-header">
                    <div className="saas-dots">
                      <div className="saas-dot"></div>
                      <div className="saas-dot"></div>
                      <div className="saas-dot"></div>
                    </div>
                    <div className="saas-live">
                      <div className="saas-ping"></div>
                      <span className="saas-live-txt">LIVE</span>
                    </div>
                  </div>
                  <div className="sector-custom-card-body flex flex-col justify-between h-full">
                    <div>
                      <div className="saas-bars mb-4 !p-0">
                        <div className="saas-bar" style={{ height: "35%" }}></div>
                        <div className="saas-bar" style={{ height: "55%" }}></div>
                        <div className="saas-bar" style={{ height: "30%" }}></div>
                        <div className="saas-bar" style={{ height: "85%" }}></div>
                        <div className="saas-bar" style={{ height: "60%" }}></div>
                        <div className="saas-bar" style={{ height: "45%" }}></div>
                      </div>
                      <h2 className="sector-custom-card-title text-white font-black">{solutionsData.saas.title}</h2>
                      <p className="sector-custom-card-desc text-slate-100 font-semibold text-xs leading-relaxed">{solutionsData.saas.description.split('. ')[0] + '.'}</p>
                      
                      {/* Features list */}
                      <ul className="space-y-1.5 my-4">
                        {solutionsData.saas.features.slice(0, 2).map((feat, idx) => (
                          <li key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {/* Metrics Row */}
                      <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-2">
                        {solutionsData.saas.metrics.map((m, idx) => (
                          <div key={idx} className="text-center bg-[#534ab7]/10 border border-[#534AB7]/25 p-2 rounded-xl">
                            <span className="text-[9px] font-bold text-slate-400 block truncate">{m.label}</span>
                            <span className="text-xs font-black text-purple-400 block mt-0.5">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {solutionsData.saas.techStack.map((tech) => (
                          <span key={tech} className="saas-tech-badge text-[9px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">{tech}</span>
                        ))}
                      </div>

                      <div className="sector-custom-card-link text-purple-300 mt-6 inline-flex items-center gap-1.5 text-xs font-bold">
                        Explore Solution
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="3" y1="8" x2="13" y2="8" />
                          <polyline points="9 4 13 8 9 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. RETAIL: Warm Amber Theme */}
              <div 
                onClick={() => router.push("/solutions/retail")} 
                className="sector-custom-card card-retail relative overflow-hidden group" 
                role="button" 
                tabIndex={0}
              >
                {/* Background Image (blurred) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                  <Image 
                    src="/assets/images/sectors/retail.webp"
                    alt="Retail"
                    fill
                    className="object-cover opacity-20 filter blur-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between w-full">
                  <div className="ret-header">
                    <span className="ret-tag">Live orders</span>
                    <span className="ret-count">{orderCount.toLocaleString()}</span>
                  </div>
                  <div className="sector-custom-card-body flex flex-col justify-between h-full">
                    <div>
                      <div className="ret-shelf mb-4 !p-0">
                        <div className="ret-item">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                        </div>
                        <div className="ret-item">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="3" width="15" height="13" />
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                          </svg>
                        </div>
                        <div className="ret-item">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21h18" />
                            <path d="M3 7l1 4h16l1-4" />
                            <path d="M4 11v10" />
                            <path d="M20 11v10" />
                            <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
                          </svg>
                        </div>
                      </div>
                      <h2 className="sector-custom-card-title text-white font-black">{solutionsData.retail.title}</h2>
                      <p className="sector-custom-card-desc text-slate-100 font-semibold text-xs leading-relaxed">{solutionsData.retail.description.split('. ')[0] + '.'}</p>
                      
                      {/* Features list */}
                      <ul className="space-y-1.5 my-4">
                        {solutionsData.retail.features.slice(0, 2).map((feat, idx) => (
                          <li key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {/* Metrics Row */}
                      <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-2">
                        {solutionsData.retail.metrics.map((m, idx) => (
                          <div key={idx} className="text-center bg-[#ba7517]/10 border border-[#BA7517]/25 p-2 rounded-xl">
                            <span className="text-[9px] font-bold text-slate-400 block truncate">{m.label}</span>
                            <span className="text-xs font-black text-amber-400 block mt-0.5">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {solutionsData.retail.techStack.map((tech) => (
                          <span key={tech} className="ret-tech-badge text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">{tech}</span>
                        ))}
                      </div>

                      <div className="sector-custom-card-link text-amber-300 mt-6 inline-flex items-center gap-1.5 text-xs font-bold">
                        Explore Solution
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="3" y1="8" x2="13" y2="8" />
                          <polyline points="9 4 13 8 9 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Expanding Accordion for Desktop */
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="sectors-accordion-container"
            >
              {/* 1. FINTECH */}
              <div 
                onClick={() => setActiveSectorIndex(0)}
                className={`sector-accordion-card card-fintech ${activeSectorIndex === 0 ? 'active' : 'collapsed'}`}
              >
                <div className="collapsed-content">
                  <span className="collapsed-number">01</span>
                  <div className="collapsed-icon-wrapper">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="collapsed-title-rotated">FinTech</span>
                </div>
                <div className="expanded-content relative h-full">
                  {/* Background Image (blurred) */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                    <Image 
                      src="/assets/images/sectors/fintech.webp"
                      alt="FinTech"
                      fill
                      className="object-cover opacity-20 filter blur-2xl"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between w-full">
                    <div className="ft-header">
                      <div className="ft-dot" style={{ background: "#ff5f56" }}></div>
                      <div className="ft-dot" style={{ background: "#ffbd2e" }}></div>
                      <div className="ft-dot" style={{ background: "#27c93f" }}></div>
                    </div>
                    <div className="sector-custom-card-body flex flex-row gap-6 p-6">
                      <div className="sector-left-col flex-1 flex flex-col justify-between">
                        <div>
                          <div className="ft-ticker mb-4">
                            <div className="ft-ticker-line">
                              <span className="ft-lbl"><span>▲</span>SEC_AUDIT</span>
                              <span className="ft-val">OK</span>
                            </div>
                            <div className="ft-ticker-line">
                              <span className="ft-lbl">TX_HASH</span>
                              <span className="ft-val" style={{ color: "#38bdf8", fontSize: "11px" }}>0xf3a…9c2</span>
                            </div>
                            <div className="ft-ticker-line">
                              <span className="ft-lbl">LEDGER</span>
                              <span className="ft-val">LOCKED</span>
                            </div>
                          </div>
                          <h2 className="sector-custom-card-title text-white font-black">{solutionsData.fintech.title}</h2>
                          <p className="sector-custom-card-desc text-slate-100 font-semibold text-xs leading-relaxed">{solutionsData.fintech.description.split('. ')[0] + '.'}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {solutionsData.fintech.techStack.map((tech) => (
                            <span key={tech} className="ft-tech-badge text-[10px] px-2 py-1 rounded bg-white/5 text-sky-300 border border-white/10">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="sector-right-col w-[240px] flex flex-col justify-between border-l border-white/10 pl-6">
                        <div className="space-y-4">
                          <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase block">Key Metrics</span>
                          <div className="grid grid-cols-1 gap-2.5">
                            {solutionsData.fintech.metrics.map((m, idx) => (
                              <div key={idx} className="metric-box bg-[#070d18] border border-white/5 p-2 rounded-xl flex items-center justify-between">
                                <span className="text-xs font-bold text-[#e2e8f0]">{m.label}</span>
                                <span className="text-sm font-black text-sky-400">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 mt-4">
                          <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase block">Key Features</span>
                          <ul className="space-y-1.5">
                            {solutionsData.fintech.features.slice(0, 2).map((feat, idx) => (
                              <li key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link href="/solutions/fintech" className="sector-custom-card-link text-sky-400 hover:text-sky-300 mt-6 inline-flex items-center gap-1.5 text-xs font-bold">
                          Explore Solution
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="8" x2="13" y2="8" />
                            <polyline points="9 4 13 8 9 12" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 2. HEALTHCARE */}
              <div 
                onClick={() => setActiveSectorIndex(1)}
                className={`sector-accordion-card card-health ${activeSectorIndex === 1 ? 'active' : 'collapsed'}`}
              >
                <div className="collapsed-content">
                  <span className="collapsed-number">02</span>
                  <div className="collapsed-icon-wrapper">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="collapsed-title-rotated">Healthcare</span>
                </div>
                <div className="expanded-content relative h-full">
                  {/* Background Image (blurred) */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                    <Image 
                      src="/assets/images/sectors/healthcare.webp"
                      alt="Healthcare"
                      fill
                      className="object-cover opacity-20 filter blur-2xl"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between w-full">
                    <div className="hc-strip"></div>
                    <div className="sector-custom-card-body flex flex-row gap-6 p-6 pt-8">
                      <div className="sector-left-col flex-1 flex flex-col justify-between">
                        <div>
                          <div className="hc-pulse mb-4">
                            <div className="hc-cross">
                              <Heart className="w-5 h-5" />
                            </div>
                          </div>
                          <h2 className="sector-custom-card-title text-white font-black">{solutionsData.healthcare.title}</h2>
                          <p className="sector-custom-card-desc text-slate-100 font-semibold text-xs leading-relaxed">{solutionsData.healthcare.description.split('. ')[0] + '.'}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {solutionsData.healthcare.techStack.map((tech) => (
                            <span key={tech} className="hc-tag text-[10px] px-2 py-1 rounded bg-white/5 text-emerald-300 border border-white/10">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="sector-right-col w-[240px] flex flex-col justify-between border-l border-white/10 pl-6">
                        <div className="space-y-4">
                          <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block">Key Metrics</span>
                          <div className="grid grid-cols-1 gap-2.5">
                            {solutionsData.healthcare.metrics.map((m, idx) => (
                              <div key={idx} className="metric-box bg-[#061e17] border border-white/5 p-2 rounded-xl flex items-center justify-between">
                                <span className="text-xs font-bold text-[#e2e8f0]">{m.label}</span>
                                <span className="text-sm font-black text-emerald-400">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 mt-4">
                          <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block">Key Features</span>
                          <ul className="space-y-1.5">
                            {solutionsData.healthcare.features.slice(0, 2).map((feat, idx) => (
                              <li key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link href="/solutions/healthcare" className="sector-custom-card-link text-emerald-400 hover:text-emerald-300 mt-6 inline-flex items-center gap-1.5 text-xs font-bold">
                          Explore Solution
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="8" x2="13" y2="8" />
                            <polyline points="9 4 13 8 9 12" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 3. SAAS */}
              <div 
                onClick={() => setActiveSectorIndex(2)}
                className={`sector-accordion-card card-saas ${activeSectorIndex === 2 ? 'active' : 'collapsed'}`}
              >
                <div className="collapsed-content">
                  <span className="collapsed-number">03</span>
                  <div className="collapsed-icon-wrapper">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <span className="collapsed-title-rotated">SaaS</span>
                </div>
                <div className="expanded-content relative h-full">
                  {/* Background Image (blurred) */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                    <Image 
                      src="/assets/images/sectors/saas.webp"
                      alt="SaaS"
                      fill
                      className="object-cover opacity-20 filter blur-2xl"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between w-full">
                    <div className="saas-header">
                      <div className="saas-dots">
                        <div className="saas-dot"></div>
                        <div className="saas-dot"></div>
                        <div className="saas-dot"></div>
                      </div>
                      <div className="saas-live">
                        <div className="saas-ping"></div>
                        <span className="saas-live-txt">LIVE</span>
                      </div>
                    </div>
                    <div className="sector-custom-card-body flex flex-row gap-6 p-6">
                      <div className="sector-left-col flex-1 flex flex-col justify-between">
                        <div>
                          <div className="saas-bars mb-4 !p-0">
                            <div className="saas-bar" style={{ height: "35%" }}></div>
                            <div className="saas-bar" style={{ height: "55%" }}></div>
                            <div className="saas-bar" style={{ height: "30%" }}></div>
                            <div className="saas-bar" style={{ height: "85%" }}></div>
                            <div className="saas-bar" style={{ height: "60%" }}></div>
                            <div className="saas-bar" style={{ height: "45%" }}></div>
                          </div>
                          <h2 className="sector-custom-card-title text-white font-black">{solutionsData.saas.title}</h2>
                          <p className="sector-custom-card-desc text-slate-100 font-semibold text-xs leading-relaxed">{solutionsData.saas.description.split('. ')[0] + '.'}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {solutionsData.saas.techStack.map((tech) => (
                            <span key={tech} className="saas-tech-badge text-[10px] px-2 py-1 rounded bg-white/5 text-purple-300 border border-white/10">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="sector-right-col w-[240px] flex flex-col justify-between border-l border-white/10 pl-6">
                        <div className="space-y-4">
                          <span className="text-[10px] font-bold text-purple-300 tracking-wider uppercase block">Key Metrics</span>
                          <div className="grid grid-cols-1 gap-2.5">
                            {solutionsData.saas.metrics.map((m, idx) => (
                              <div key={idx} className="metric-box bg-[#1b173c] border border-white/5 p-2 rounded-xl flex items-center justify-between">
                                <span className="text-xs font-bold text-[#e2e8f0]">{m.label}</span>
                                <span className="text-sm font-black text-purple-300">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 mt-4">
                          <span className="text-[10px] font-bold text-purple-300 tracking-wider uppercase block">Key Features</span>
                          <ul className="space-y-1.5">
                            {solutionsData.saas.features.slice(0, 2).map((feat, idx) => (
                              <li key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link href="/solutions/saas" className="sector-custom-card-link text-purple-300 hover:text-purple-200 mt-6 inline-flex items-center gap-1.5 text-xs font-bold">
                          Explore Solution
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="8" x2="13" y2="8" />
                            <polyline points="9 4 13 8 9 12" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. RETAIL */}
              <div 
                onClick={() => setActiveSectorIndex(3)}
                className={`sector-accordion-card card-retail ${activeSectorIndex === 3 ? 'active' : 'collapsed'}`}
              >
                <div className="collapsed-content">
                  <span className="collapsed-number">04</span>
                  <div className="collapsed-icon-wrapper">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <span className="collapsed-title-rotated">Retail</span>
                </div>
                <div className="expanded-content relative h-full">
                  {/* Background Image (blurred) */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                    <Image 
                      src="/assets/images/sectors/retail.webp"
                      alt="Retail"
                      fill
                      className="object-cover opacity-20 filter blur-2xl"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between w-full">
                    <div className="ret-header">
                      <span className="ret-tag">Live orders</span>
                      <span className="ret-count">{orderCount.toLocaleString()}</span>
                    </div>
                    <div className="sector-custom-card-body flex flex-row gap-6 p-6">
                      <div className="sector-left-col flex-1 flex flex-col justify-between">
                        <div>
                          <div className="ret-shelf mb-4 !p-0">
                            <div className="ret-item">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                              </svg>
                            </div>
                            <div className="ret-item">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="15" height="13" />
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                <circle cx="5.5" cy="18.5" r="2.5" />
                                <circle cx="18.5" cy="18.5" r="2.5" />
                              </svg>
                            </div>
                            <div className="ret-item">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18" />
                                <path d="M3 7l1 4h16l1-4" />
                                <path d="M4 11v10" />
                                <path d="M20 11v10" />
                                <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
                              </svg>
                            </div>
                          </div>
                          <h2 className="sector-custom-card-title text-white font-black">{solutionsData.retail.title}</h2>
                          <p className="sector-custom-card-desc text-slate-100 font-semibold text-xs leading-relaxed">{solutionsData.retail.description.split('. ')[0] + '.'}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {solutionsData.retail.techStack.map((tech) => (
                            <span key={tech} className="ret-tech-badge text-[10px] px-2 py-1 rounded bg-white/5 text-amber-300 border border-white/10">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="sector-right-col w-[240px] flex flex-col justify-between border-l border-white/10 pl-6">
                        <div className="space-y-4">
                          <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase block">Key Metrics</span>
                          <div className="grid grid-cols-1 gap-2.5">
                            {solutionsData.retail.metrics.map((m, idx) => (
                              <div key={idx} className="metric-box bg-[#381f03] border border-white/5 p-2 rounded-xl flex items-center justify-between">
                                <span className="text-xs font-bold text-[#e2e8f0]">{m.label}</span>
                                <span className="text-sm font-black text-amber-300">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 mt-4">
                          <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase block">Key Features</span>
                          <ul className="space-y-1.5">
                            {solutionsData.retail.features.slice(0, 2).map((feat, idx) => (
                              <li key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link href="/solutions/retail" className="sector-custom-card-link text-amber-300 hover:text-amber-200 mt-6 inline-flex items-center gap-1.5 text-xs font-bold">
                          Explore Solution
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="8" x2="13" y2="8" />
                            <polyline points="9 4 13 8 9 12" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. How We Work (Process) Section (Smooth Gradient Background) */}
      <section className="relative py-24 bg-gradient-to-b from-[#14294d] to-[#0b172e] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-xs font-black tracking-widest text-sky-400 uppercase font-mono">Our Process</h2>
          </div>

          <div className="stacking-cards-section">
            <div className="sticky-heading-wrapper">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                How we work with you in 3 simple steps
              </h3>
            </div>

            <div className="stacking-cards-container">
              
              {/* Sentinel 1 */}
              <div id="step-card-sentinel-1" className="w-full h-px pointer-events-none opacity-0" style={{ marginTop: "-1px" }} />
              {/* Card 1 */}
              <div className="stacking-card stacking-card-1" id="step-card-1" role="button" tabIndex={0}>
                <div className="stacking-card-content">
                  <div className="stacking-card-left">
                    <span className="stacking-card-badge mb-4">Card 1</span>
                    <h2>Discovery</h2>
                    <p>We audit your infrastructure and design a cloud-native architecture blueprint. Through technical workshops and topology analysis, we set clear development milestones.</p>
                  </div>
                  <div className="stacking-card-right relative w-full h-[250px] lg:h-full p-6">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                      <Image 
                        src="/assets/images/Process/office_work_scene.webp"
                        alt="Discovery Strategy"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sentinel 2 */}
              <div id="step-card-sentinel-2" className="w-full h-px pointer-events-none opacity-0" style={{ marginTop: "-1px" }} />
              {/* Card 2 */}
              <div className="stacking-card stacking-card-2" id="step-card-2" role="button" tabIndex={0}>
                <div className="stacking-card-content">
                  <div className="stacking-card-left">
                    <span className="stacking-card-badge mb-4">Card 2</span>
                    <h2>Design & Development</h2>
                    <p>Our engineers build iterative cloud-native components and secure APIs. We write clean, well-tested code in agile sprints, using automated pipelines to ensure security and quality.</p>
                  </div>
                  <div className="stacking-card-right relative w-full h-[250px] lg:h-full p-6">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                      <Image 
                        src="/assets/images/Process/process_development.webp"
                        alt="Design & Development"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sentinel 3 */}
              <div id="step-card-sentinel-3" className="w-full h-px pointer-events-none opacity-0" style={{ marginTop: "-1px" }} />
              {/* Card 3 */}
              <div className="stacking-card stacking-card-3" id="step-card-3" role="button" tabIndex={0}>
                <div className="stacking-card-content">
                  <div className="stacking-card-left">
                    <span className="stacking-card-badge mb-4">Card 3</span>
                    <h2>Launch & Scale</h2>
                    <p>We coordinate zero-downtime deployments and configure 24/7 reliability monitoring. Using canary releases and real-time dashboards, we scale your platform smoothly.</p>
                  </div>
                  <div className="stacking-card-right relative w-full h-[250px] lg:h-full p-6">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                      <Image 
                        src="/assets/images/Process/process_launch.webp"
                        alt="Launch & Scale"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. Results / Stats Section (Cyber HUD / Cybernetic Midnight Theme) */}
      <section className="relative py-20 bg-gradient-to-b from-[#0b172e] to-[#050a14] border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-black tracking-widest text-[#1591DC] uppercase">Proven Track Record</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">Proven results that speak for themselves</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((st, index) => {
              const Icon = st.icon;
              return (
                <motion.div 
                  key={st.label} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`cyber-hud-card cyber-card-${index} relative p-8 rounded-3xl text-center flex flex-col items-center justify-between overflow-hidden group`}
                >
                  {/* Cyber Grid overlay */}
                  <div className="absolute inset-0 cyber-grid-overlay opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none" />
                  
                  {/* Decorative Sci-Fi corner lines */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />

                  {/* Top status bar */}
                  <div className="w-full flex justify-between items-center text-[8px] font-mono text-slate-500 mb-4 border-b border-white/5 pb-2">
                    <span>SYS_CORE // REF_{index+1}</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE
                    </span>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-white/5 group-hover:border-white/20 text-[#1591DC] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 mb-2">
                    <Icon className="w-7 h-7 stats-icon-glow" />
                  </div>
                  
                  <div className="space-y-1 my-4">
                    <h4 className="text-4xl md:text-5xl font-black font-mono tracking-tight stats-num-glow">{st.number}</h4>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest stats-label-glow">{st.label}</p>
                  </div>
                  
                  <div className="space-y-1 border-t border-white/5 pt-4 w-full">
                    <h5 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{st.heading}</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{st.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* 8. Testimonials Section (Dark Theme with Glows - Matching the Prototype Link) */}
      <section className="relative bg-gradient-to-b from-[#050a14] to-[#02050d] py-20 overflow-hidden border-b border-white/5">
        {/* Subtle background glow highlights */}
        <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#1591DC]/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-black tracking-widest text-[#1591DC] uppercase">Client Feedback</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">What our clients say about working with us</h3>
          </div>

          <div className="carousel-viewport-wrapper">
            <div 
              className="carousel-viewport"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                ref={trackRef}
                className="carousel-track"
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: useTransition ? "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)" : "none"
                }}
              >
                {reviews.map((t) => (
                  <div 
                    key={t.id}
                    className="review-card group"
                    data-index={t.id}
                  >
                    <div className="flex justify-between items-start">
                      <Quote className="w-7 h-7 text-[#1591DC]/20" />
                      <div className="flex items-center space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < t.stars ? "fill-[#fbbf24] text-[#fbbf24] filter drop-shadow-[0_0_4px_rgba(251,191,36,0.2)]" : "text-slate-700"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="review-text text-slate-200 italic">"{t.q}"</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className={`avatar ${t.avatarClass} w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md`}>
                        {t.initials}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-sm font-bold text-white">{t.name}</h4>
                        <p className="text-xs text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-controls">
              <button 
                className="carousel-control-btn" 
                onClick={slidePrev}
                aria-label="Previous review"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <div className="carousel-dots">
                {testimonials.map((t) => {
                  const isActive = reviews[0]?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      className={`carousel-dot ${isActive ? "active" : ""}`}
                      onClick={() => navigateToCardIndex(t.id)}
                      aria-label={`Go to review ${t.id}`}
                    />
                  );
                })}
              </div>

              <button 
                className="carousel-control-btn" 
                onClick={slideNext}
                aria-label="Next review"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>

            <div className="carousel-hint">Hover to pause rotation</div>
          </div>
        </div>
      </section>

      {/* 9. Latest Insights (Blog) Section - Interactive Developer Dashboard */}
      <section className="w-full bg-gradient-to-b from-[#02050d] to-[#1d3f75] py-24 relative overflow-hidden">
        {/* Techy Grid overlay */}
        <div className="absolute inset-0 dark-grid-pattern opacity-60 pointer-events-none" />
        
        {/* Soft neon background blobs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-xs font-black tracking-widest text-[#1591DC] uppercase font-mono">system::insights</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Latest insights from our tech team</h3>
            </div>
            <div>
              <Link 
                href="/blog" 
                className="inline-flex items-center text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors group font-mono"
              >
                git checkout blog
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Mobile-only selector tab bar for quick navigation */}
          <div className="flex md:hidden justify-around items-center bg-slate-950/60 border border-slate-900 rounded-xl p-2 mb-6 gap-2">
            {blogSlugs.map((slug) => {
              const gitMeta = gitInsightsData[slug];
              const isActive = activeInsightSlug === slug;
              return (
                <button
                  key={slug}
                  onClick={() => setActiveInsightSlug(slug)}
                  className={`flex-1 text-center py-2 px-1 rounded-lg text-[10px] font-mono transition-all ${
                    isActive 
                      ? "bg-slate-900 text-white border border-slate-800 shadow-md font-bold" 
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <span className="block text-[8px] text-slate-600 uppercase">{gitMeta.branch}</span>
                  <span className="truncate block max-w-full">{gitMeta.commitHash}</span>
                </button>
              );
            })}
          </div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Column 1: Git Branch Tree (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-center bg-slate-950/20 backdrop-blur-md border border-slate-900 rounded-2xl p-6 shadow-xl relative min-h-[460px]">
              <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[9px] font-mono text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
                <span>GIT TREE TRACKER</span>
              </div>
              
              <div className="flex justify-between items-center px-4 mt-8 mb-4 text-[10px] font-mono text-slate-500 select-none">
                <span className="text-purple-400/80 font-bold tracking-wider">sre/infra</span>
                <span className="text-sky-400/80 font-bold tracking-wider">dev/api</span>
                <span className="text-teal-400/80 font-bold tracking-wider">sec/compliance</span>
              </div>
              
              <div className="w-full flex justify-center items-center flex-1">
                <div className="w-full max-w-[320px] aspect-[320/450]">
                  <svg viewBox="0 0 320 450" className="w-full h-full">
                    {/* Definitions for filters and gradients */}
                    <defs>
                      <filter id="glow-dev" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter id="glow-sre" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter id="glow-security" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Base tracks (always visible, semi-transparent slate) */}
                    <path d="M 160,0 L 160,450" fill="none" stroke="rgba(30, 41, 59, 0.5)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 160,60 C 110,60 60,90 60,130 L 60,210 C 60,250 110,280 160,280" fill="none" stroke="rgba(30, 41, 59, 0.5)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 160,120 C 210,120 260,150 260,190 L 260,250 C 260,290 210,320 160,320" fill="none" stroke="rgba(30, 41, 59, 0.5)" strokeWidth="4" strokeLinecap="round" />

                    {/* Animated Active/Hovered tracks */}
                    <path 
                      d="M 160,0 L 160,450" 
                      fill="none" 
                      stroke="#38bdf8" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      className={`transition-opacity duration-300 ${(activeInsightSlug === "kubernetes-resource-optimization" || hoveredInsightSlug === "kubernetes-resource-optimization") ? "opacity-100" : "opacity-0"}`}
                      filter="url(#glow-dev)"
                    />
                    
                    <path 
                      d="M 160,60 C 110,60 60,90 60,130 L 60,210 C 60,250 110,280 160,280" 
                      fill="none" 
                      stroke="#c084fc" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      className={`transition-opacity duration-300 ${(activeInsightSlug === "cloud-cost-guardrails" || hoveredInsightSlug === "cloud-cost-guardrails") ? "opacity-100" : "opacity-0"}`}
                      filter="url(#glow-sre)"
                    />

                    <path 
                      d="M 160,120 C 210,120 260,150 260,190 L 260,250 C 260,290 210,320 160,320" 
                      fill="none" 
                      stroke="#2dd4bf" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      className={`transition-opacity duration-300 ${(activeInsightSlug === "shift-security-left" || hoveredInsightSlug === "shift-security-left") ? "opacity-100" : "opacity-0"}`}
                      filter="url(#glow-security)"
                    />

                    {/* Running light particles */}
                    <path 
                      d="M 160,0 L 160,450" 
                      fill="none" 
                      stroke="#e0f2fe" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeDasharray="10 30"
                      className={`git-running-light transition-opacity duration-300 ${(activeInsightSlug === "kubernetes-resource-optimization" || hoveredInsightSlug === "kubernetes-resource-optimization") ? "opacity-100" : "opacity-0"}`}
                    />
                    <path 
                      d="M 160,60 C 110,60 60,90 60,130 L 60,210 C 60,250 110,280 160,280" 
                      fill="none" 
                      stroke="#f3e8ff" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeDasharray="10 30"
                      className={`git-running-light transition-opacity duration-300 ${(activeInsightSlug === "cloud-cost-guardrails" || hoveredInsightSlug === "cloud-cost-guardrails") ? "opacity-100" : "opacity-0"}`}
                    />
                    <path 
                      d="M 160,120 C 210,120 260,150 260,190 L 260,250 C 260,290 210,320 160,320" 
                      fill="none" 
                      stroke="#f0fdfa" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeDasharray="10 30"
                      className={`git-running-light transition-opacity duration-300 ${(activeInsightSlug === "shift-security-left" || hoveredInsightSlug === "shift-security-left") ? "opacity-100" : "opacity-0"}`}
                    />

                    {/* Commit nodes */}
                    {/* 1. Initial Scaffold Commit Node */}
                    <g className="group/node">
                      <circle cx="160" cy="30" r="5" className="fill-slate-900 stroke-slate-700 stroke-2 transition-colors duration-300 group-hover/node:stroke-slate-500" />
                      <text x="176" y="34" className="text-[9px] font-mono fill-slate-600 transition-colors duration-300 group-hover/node:fill-slate-400 select-none">init project</text>
                    </g>

                    {/* 2. SRE Commit Node */}
                    <g 
                      className="cursor-pointer group/node"
                      onClick={() => setActiveInsightSlug("cloud-cost-guardrails")}
                      onMouseEnter={() => setHoveredInsightSlug("cloud-cost-guardrails")}
                      onMouseLeave={() => setHoveredInsightSlug(null)}
                    >
                      <circle 
                        cx="60" 
                        cy="170" 
                        r="10" 
                        className={`fill-none stroke-2 transition-all duration-300 ${
                          activeInsightSlug === "cloud-cost-guardrails" ? "animate-pulse-sre" : "stroke-slate-800 group-hover/node:stroke-purple-500/50"
                        }`}
                      />
                      <circle 
                        cx="60" 
                        cy="170" 
                        r="5" 
                        className={`transition-all duration-300 ${
                          activeInsightSlug === "cloud-cost-guardrails" ? "fill-purple-400 stroke-purple-200 stroke-2" : "fill-slate-950 stroke-slate-600 group-hover/node:fill-purple-500/80 group-hover/node:stroke-purple-300"
                        }`}
                      />
                      <text 
                        x="76" 
                        y="173" 
                        className={`text-[10px] font-mono transition-colors duration-300 select-none ${
                          activeInsightSlug === "cloud-cost-guardrails" ? "fill-purple-400 font-bold" : "fill-slate-600 group-hover/node:fill-slate-300"
                        }`}
                      >
                        f6b8c4d
                      </text>
                    </g>

                    {/* 3. Security Commit Node */}
                    <g 
                      className="cursor-pointer group/node"
                      onClick={() => setActiveInsightSlug("shift-security-left")}
                      onMouseEnter={() => setHoveredInsightSlug("shift-security-left")}
                      onMouseLeave={() => setHoveredInsightSlug(null)}
                    >
                      <circle 
                        cx="260" 
                        cy="220" 
                        r="10" 
                        className={`fill-none stroke-2 transition-all duration-300 ${
                          activeInsightSlug === "shift-security-left" ? "animate-pulse-sec" : "stroke-slate-800 group-hover/node:stroke-teal-500/50"
                        }`}
                      />
                      <circle 
                        cx="260" 
                        cy="220" 
                        r="5" 
                        className={`transition-all duration-300 ${
                          activeInsightSlug === "shift-security-left" ? "fill-teal-400 stroke-teal-200 stroke-2" : "fill-slate-950 stroke-slate-600 group-hover/node:fill-teal-500/80 group-hover/node:stroke-teal-300"
                        }`}
                      />
                      <text 
                        x="244" 
                        y="223" 
                        textAnchor="end"
                        className={`text-[10px] font-mono transition-colors duration-300 select-none ${
                          activeInsightSlug === "shift-security-left" ? "fill-teal-400 font-bold" : "fill-slate-600 group-hover/node:fill-slate-300"
                        }`}
                      >
                        e3d9f2a
                      </text>
                    </g>

                    {/* 4. Dev Commit Node */}
                    <g 
                      className="cursor-pointer group/node"
                      onClick={() => setActiveInsightSlug("kubernetes-resource-optimization")}
                      onMouseEnter={() => setHoveredInsightSlug("kubernetes-resource-optimization")}
                      onMouseLeave={() => setHoveredInsightSlug(null)}
                    >
                      <circle 
                        cx="160" 
                        cy="360" 
                        r="10" 
                        className={`fill-none stroke-2 transition-all duration-300 ${
                          activeInsightSlug === "kubernetes-resource-optimization" ? "animate-pulse-dev" : "stroke-slate-800 group-hover/node:stroke-sky-500/50"
                        }`}
                      />
                      <circle 
                        cx="160" 
                        cy="360" 
                        r="5" 
                        className={`transition-all duration-300 ${
                          activeInsightSlug === "kubernetes-resource-optimization" ? "fill-sky-400 stroke-sky-200 stroke-2" : "fill-slate-950 stroke-slate-600 group-hover/node:fill-sky-500/80 group-hover/node:stroke-sky-300"
                        }`}
                      />
                      <text 
                        x="176" 
                        y="363" 
                        className={`text-[10px] font-mono transition-colors duration-300 select-none ${
                          activeInsightSlug === "kubernetes-resource-optimization" ? "fill-sky-400 font-bold" : "fill-slate-600 group-hover/node:fill-slate-300"
                        }`}
                      >
                        b2a5f7c
                      </text>
                    </g>

                    {/* 5. Final Merge Commit Node */}
                    <g className="group/node">
                      <circle cx="160" cy="420" r="5" className="fill-slate-900 stroke-slate-700 stroke-2 transition-colors duration-300 group-hover/node:stroke-slate-500" />
                      <text x="176" y="424" className="text-[9px] font-mono fill-slate-600 transition-colors duration-300 group-hover/node:fill-slate-400 select-none">merge main</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 2: Selected Post Details (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-stretch">
              {(() => {
                const activePost = blogData[activeInsightSlug] || blogData["cloud-cost-guardrails"];
                const activeGitMeta = gitInsightsData[activeInsightSlug] || gitInsightsData["cloud-cost-guardrails"];
                return (
                  <motion.div
                    key={activeInsightSlug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 flex flex-col justify-between p-6 bg-[#0c0d16]/80 border border-slate-900 rounded-2xl shadow-2xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: activeGitMeta.branchColor }} />
                    <div className="space-y-4">
                      {/* Blog Cover Image */}
                      {activePost.image && (
                        <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 border border-slate-900 bg-slate-950 select-none">
                          <Image 
                            src={activePost.image} 
                            alt={activePost.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-102 transition-transform duration-500 opacity-60"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span 
                          className="font-bold px-2 py-0.5 rounded border uppercase tracking-wider text-[9px]"
                          style={{
                            color: activeGitMeta.branchColor,
                            borderColor: `${activeGitMeta.branchColor}30`,
                            backgroundColor: `${activeGitMeta.branchColor}10`
                          }}
                        >
                          {activePost.category}
                        </span>
                        <span>{activePost.readTime}</span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-white leading-snug group-hover:text-sky-400 transition-colors">
                        {activePost.title}
                      </h4>
                      
                      <p className="text-[10px] text-slate-500 font-mono">
                        Commit: <span className="text-slate-400 font-bold">{activeGitMeta.commitHash}</span> by {activePost.author}
                      </p>
                      
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {activePost.summary}
                      </p>
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-slate-900 flex justify-between items-center">
                      <Link 
                        href={`/blog/${activeInsightSlug}`}
                        className="inline-flex items-center text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors group/link font-mono"
                      >
                        cat full_post.md
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      <span className="text-[9px] font-mono text-slate-600">Updated: {activePost.date}</span>
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Column 3: IDE Diff Previewer (lg:col-span-4) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col justify-stretch">
              {(() => {
                const activeGitMeta = gitInsightsData[activeInsightSlug] || gitInsightsData["cloud-cost-guardrails"];
                return (
                  <motion.div
                    key={activeInsightSlug + "-ide"}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="flex-1 flex flex-col min-h-[420px]"
                  >
                    <div className="flex-1 flex flex-col h-full bg-[#090d16] border border-slate-900 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs relative">
                      {/* IDE Titlebar */}
                      <div className="ide-titlebar flex items-center justify-between px-4 py-3 bg-[#0c1220] border-b border-slate-950 select-none">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-1.5 font-mono font-bold">
                          <Terminal className="w-3.5 h-3.5 text-[#1591DC]" />
                          <span>git diff {activeGitMeta.commitHash}</span>
                        </div>
                        <div className="w-8" />
                      </div>

                      {/* IDE Tabs */}
                      <div className="ide-tabs flex bg-[#080b13] border-b border-slate-950 text-slate-500 select-none">
                        <div className="ide-tab active flex items-center gap-2 px-4 py-2 bg-[#090d16] border-r border-slate-950 border-t border-t-sky-500 text-slate-200">
                          <Code className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-[10px] font-bold font-mono">{activeGitMeta.fileName}</span>
                        </div>
                        <div className="flex-1 bg-[#080b13]" />
                      </div>

                      {/* IDE Editor Area */}
                      <div className="ide-editor flex-1 p-4 overflow-y-auto max-h-[360px] bg-[#06080e] text-slate-300 font-mono text-[10px] sm:text-[11px] leading-relaxed">
                        <div className="grid grid-cols-[auto_1fr] gap-3">
                          {/* Line Numbers */}
                          <div className="text-slate-700 text-right select-none pr-3 border-r border-slate-900 flex flex-col">
                            {activeGitMeta.diff.map((_, i) => (
                              <span key={i} className="leading-6 h-6">{i + 1}</span>
                            ))}
                          </div>
                          {/* Code Diff lines */}
                          <div className="flex flex-col overflow-x-auto whitespace-pre font-mono">
                            {activeGitMeta.diff.map((line, i) => {
                              let lineClass = "text-slate-400";
                              if (line.type === "addition") {
                                lineClass = "text-emerald-400 bg-emerald-500/5 -mx-4 px-4 block border-l border-emerald-500/70 font-semibold";
                              } else if (line.type === "deletion") {
                                lineClass = "text-rose-400 bg-rose-500/5 -mx-4 px-4 block border-l border-rose-500/70 font-semibold";
                              }
                              return (
                                <span key={i} className={`leading-6 h-6 font-mono ${lineClass}`}>
                                  {line.text}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* IDE Footer */}
                      <div className="ide-footer flex items-center justify-between px-4 py-2 bg-[#0c1220] border-t border-slate-950 text-[9px] text-slate-500 font-mono">
                        <div className="flex items-center gap-3">
                          <span>Branch: <span className="text-sky-400">{activeGitMeta.branchName}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                          <span>LF</span>
                          <span>UTF-8</span>
                          <span>Javascript</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
