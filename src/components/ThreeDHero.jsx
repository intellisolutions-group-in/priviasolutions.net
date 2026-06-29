"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { 
  Cloud, Database, Terminal, 
  Activity, Shield, Brain 
} from "lucide-react";

// 3D Central Gyroscopic Core Reactor Mesh Component
function CentralCore() {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    // Pulse core scale and rotate slowly
    if (coreRef.current) {
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y = elapsedTime * 0.25;
    }

    // Rotations for the three nested gyroscope rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = elapsedTime * 0.35;
      ring1Ref.current.rotation.x = elapsedTime * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -elapsedTime * 0.45;
      ring2Ref.current.rotation.z = elapsedTime * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -elapsedTime * 0.55;
      ring3Ref.current.rotation.y = -elapsedTime * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Floating Holographic Gyroscope Core */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.4} position={[0, 0.4, 0]}>
        {/* Central Emissive Glowing Power Sphere */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial 
            color="#1591dc" 
            emissive="#1591dc" 
            emissiveIntensity={2.8} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Outer wireframe shell for technological complexity */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color="#4bb8fa" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Gyroscope Ring 1 (Outer - Blue) */}
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[1.1, 0.028, 16, 100]} />
            <meshStandardMaterial color="#2c5ead" emissive="#2c5ead" emissiveIntensity={1.2} roughness={0.1} />
          </mesh>
          <mesh position={[1.1, 0, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color="#4bb8fa" />
          </mesh>
        </group>

        {/* Gyroscope Ring 2 (Middle - Cyan) */}
        <group ref={ring2Ref}>
          <mesh>
            <torusGeometry args={[0.82, 0.024, 16, 100]} />
            <meshStandardMaterial color="#1591dc" emissive="#1591dc" emissiveIntensity={1.5} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.82, 0]}>
            <sphereGeometry args={[0.048, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Gyroscope Ring 3 (Inner - Light Blue) */}
        <group ref={ring3Ref}>
          <mesh>
            <torusGeometry args={[0.55, 0.02, 16, 100]} />
            <meshStandardMaterial color="#4bb8fa" emissive="#4bb8fa" emissiveIntensity={2.0} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.55]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#1591dc" />
          </mesh>
        </group>
      </Float>

      {/* Orbiting data transmission particles */}
      <OrbitingParticles radius={2.2} speed={1.2} color="#1591dc" />
      <OrbitingParticles radius={2.6} speed={-0.8} color="#4bb8fa" />
    </group>
  );
}

// Emissive Orbit Line and Traveling Particle
function OrbitingParticles({ radius, speed, color }) {
  const particleRef = useRef();

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    const angle = elapsedTime * speed;
    if (particleRef.current) {
      particleRef.current.position.x = radius * Math.cos(angle);
      particleRef.current.position.z = radius * Math.sin(angle);
      particleRef.current.position.y = Math.sin(angle * 2) * 0.25; 
    }
  });

  return (
    <group rotation={[Math.PI / 8, 0, Math.PI / 12]}>
      {/* Orbit Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      
      {/* Traveling Particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function ThreeDHero({ isLoaded = true }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldFloat, setShouldFloat] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShouldFloat(false);
      }, 1400); // 1.2s animation duration + 200ms buffer
      return () => clearTimeout(timer);
    } else {
      setShouldFloat(true);
    }
  }, [isLoaded]);

  // Position definitions for Privia Nodes
  const nodes = [
    {
      id: "infrastructure",
      title: "Cloud Infrastructure",
      desc: "Scalable • Secure • Reliable",
      icon: Cloud,
      color: "text-blue-600 bg-gradient-to-br from-blue-500/10 to-blue-500/20 border-blue-500/20 shadow-inner",
      hoverGlow: "hover:border-blue-400 hover:shadow-[0_12px_30px_rgba(59,130,246,0.18)]",
      position: "absolute top-[-30px] left-1/2 -translate-x-1/2",
      animationDelay: 0.1
    },
    {
      id: "ai-automation",
      title: "AI & Automation",
      desc: "Smarter • Faster • Better",
      icon: Brain,
      color: "text-emerald-600 bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 border-emerald-500/20 shadow-inner",
      hoverGlow: "hover:border-emerald-400 hover:shadow-[0_12px_30px_rgba(16,185,129,0.18)]",
      position: "absolute top-[18%] right-[2%] sm:right-[5%] md:right-[-2%]",
      animationDelay: 0.2
    },
    {
      id: "security",
      title: "Security & Compliance",
      desc: "Built-in Protection",
      icon: Shield,
      color: "text-indigo-600 bg-gradient-to-br from-indigo-500/10 to-indigo-500/20 border-indigo-500/20 shadow-inner",
      hoverGlow: "hover:border-indigo-400 hover:shadow-[0_12px_30px_rgba(79,70,229,0.18)]",
      position: "absolute bottom-[18%] right-[1%] sm:right-[0%] md:right-[-5%]",
      animationDelay: 0.3
    },
    {
      id: "observability",
      title: "Observability",
      desc: "Real-time Insights",
      icon: Activity,
      color: "text-sky-600 bg-gradient-to-br from-sky-500/10 to-sky-500/20 border-sky-500/20 shadow-inner",
      hoverGlow: "hover:border-sky-400 hover:shadow-[0_12px_30px_rgba(14,165,233,0.18)]",
      position: "absolute bottom-[-30px] left-1/2 -translate-x-1/2",
      animationDelay: 0.4
    },
    {
      id: "devops",
      title: "DevOps Engineering",
      desc: "CI/CD • Automation",
      icon: Terminal,
      color: "text-cyan-600 bg-gradient-to-br from-cyan-500/10 to-cyan-500/20 border-cyan-500/20 shadow-inner",
      hoverGlow: "hover:border-cyan-400 hover:shadow-[0_12px_30px_rgba(6,182,212,0.18)]",
      position: "absolute bottom-[18%] left-[1%] sm:left-[0%] md:left-[-5%]",
      animationDelay: 0.5
    },
    {
      id: "data-solutions",
      title: "Data Solutions",
      desc: "Intelligent • Reliable",
      icon: Database,
      color: "text-purple-600 bg-gradient-to-br from-purple-500/10 to-purple-500/20 border-purple-500/20 shadow-inner",
      hoverGlow: "hover:border-purple-400 hover:shadow-[0_12px_30px_rgba(147,51,234,0.18)]",
      position: "absolute top-[18%] left-[2%] sm:left-[5%] md:left-[-2%]",
      animationDelay: 0.6
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center select-none py-12 sm:py-4">
      {/* Concentric CSS Orbit Rings in Background (faded in when loaded) */}
      <div className={`absolute inset-2 rounded-full border border-blue-200/40 border-dashed animate-[spin_45s_linear_infinite] pointer-events-none z-0 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}></div>
      <div className={`absolute inset-12 rounded-full border border-blue-300/30 border-dashed animate-[spin_30s_linear_infinite_reverse] pointer-events-none z-0 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}></div>
      <div className={`absolute inset-24 rounded-full border border-cyan-400/20 border-dashed animate-[spin_20s_linear_infinite] pointer-events-none z-0 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}></div>

      {/* 3D WebGL Canvas Layer wrapped in a layout-animating motion.div */}
      <motion.div 
        layout
        transition={{ 
          type: "spring", 
          stiffness: 35, 
          damping: 13, 
          mass: 1.2
        }}
        className={isLoaded 
          ? `w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] relative ${shouldFloat ? "z-[70]" : "z-10"}` 
          : "fixed inset-0 m-auto w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] z-[70] pointer-events-none"
        }
      >
        <Canvas camera={{ position: [0, 2, 4.5], fov: 60 }} dpr={[1, 2]} frameloop={isVisible ? "always" : "never"}>
          <ambientLight intensity={1.5} />
          <pointLight position={[5, 5, 5]} intensity={2.5} />
          <pointLight position={[-5, 3, -5]} intensity={1.2} />
          <directionalLight position={[0, 5, 2]} intensity={2.8} castShadow />
          
          <CentralCore />
        </Canvas>
      </motion.div>

      {/* Surround Node HTML Labels (fade in after reactor core reaches position) */}
      {nodes.map((node) => {
        const IconComponent = node.icon;
        const isHovered = hoveredNode === node.id;
        
        return (
          <motion.div
            key={node.id}
            className={`${node.position} z-20`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              scale: isLoaded ? 1 : 0.8 
            }}
            transition={{ 
              duration: 0.6, 
              delay: isLoaded ? node.animationDelay + 1.2 : 0 
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div
              className={`flex items-center gap-2 p-2 sm:gap-3.5 sm:p-4 bg-white/80 backdrop-blur-lg border rounded-[22px] cursor-pointer transition-all duration-300 w-[130px] min-[400px]:w-[145px] sm:w-[195px] shadow-[0_10px_25px_rgba(30,41,59,0.04)] ${
                isHovered 
                  ? `${node.hoverGlow} scale-105 -translate-y-1` 
                  : "border-white/50"
              }`}
            >
              {/* Icon */}
              <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border flex items-center justify-center flex-shrink-0 transition-all ${
                isHovered ? "scale-110 rotate-3" : ""
              } ${node.color}`}>
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Text metadata */}
              <div className="text-left overflow-hidden min-w-0 flex-1">
                <h4 className="text-[9px] sm:text-[11.5px] font-black uppercase tracking-tight text-slate-800 leading-tight whitespace-normal">
                  {node.title}
                </h4>
                <p className="text-[7.5px] sm:text-[9.5px] font-bold text-slate-400 mt-1 tracking-wider uppercase leading-tight whitespace-normal">
                  {node.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
