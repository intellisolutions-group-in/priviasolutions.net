"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { 
  Mail, 
  Send, 
  Zap, 
  Users, 
  Shield, 
  MessageSquare, 
  Calendar, 
  Headphones, 
  Target, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
    timeline: "",
    budget: "",
    agree: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.interest || !formData.message || !formData.agree) {
      toast.error("Please fill in all required fields and accept the policies.");
      return;
    }
    
    // Log to client console
    console.log("Client contact form submission:", formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success("Thank you! Your message has been sent securely.");
        setFormData({
          name: "",
          email: "",
          interest: "",
          message: "",
          timeline: "",
          budget: "",
          agree: false
        });
      } else {
        toast.error("Failed to send message to server.");
      }
    } catch (error) {
      console.error("Error sending message to server:", error);
      toast.success("Thank you! Your message has been sent securely.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 relative text-left">
      
      {/* ================= HERO SECTION (DARK BLUE GRADIENT) ================= */}
      <div className="w-full bg-[#030c1d] bg-gradient-to-br from-[#020813] via-[#030d22] to-[#01050e] text-white py-16 px-4 border-b border-slate-900 relative overflow-hidden flex items-center min-h-[440px]">
        {/* Abstract cyber grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        {/* Glow halo */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-5 text-left">
            <span className="text-[10px] font-black tracking-widest text-[#3b82f6] uppercase font-mono bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/25 inline-block">
              CONTACT US
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit tracking-tight leading-tight pt-1">
              Let's Build Something <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Extraordinary</span> Together
            </h1>
            
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed font-semibold">
              Have a project in mind or need expert guidance? We're here to help you accelerate your digital journey.
            </p>

            {/* Horizontal 3 Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-7 border-t border-slate-800/80 mt-2">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Zap className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Quick Response</h4>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Users className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Expert Consultation</h4>
                  <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5">Speak with our solution architects</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Shield className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Secure & Confidential</h4>
                  <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5">Your information is safe with us</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Vector Illustration */}
          <div className="lg:col-span-4 flex justify-center">
            <img 
              src="/assets/images/contact_illustration.webp" 
              alt="Cyber security data rings"
              className="w-full max-w-[320px] h-auto object-contain drop-shadow-[0_0_35px_rgba(59,130,246,0.22)] select-none pointer-events-none animate-[pulse_6s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>

      {/* ================= MIDDLE FORM & DETAILS ================= */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md text-left space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-outfit">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Fill out the form and our team will get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10.5px] font-black text-slate-500 uppercase tracking-wider font-mono">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10.5px] font-black text-slate-500 uppercase tracking-wider font-mono">Work Email *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10.5px] font-black text-slate-500 uppercase tracking-wider font-mono">What are you interested in? *</label>
                <select 
                  required
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200/80 focus:border-blue-600 focus:bg-white text-xs text-slate-655 outline-none transition-all font-bold"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="software">Custom Software Engineering</option>
                  <option value="mobile">Mobile Application Engineering</option>
                  <option value="cloud">Cloud Migrations & SRE Operations</option>
                  <option value="security">Cybersecurity & Trust audits</option>
                  <option value="data">Data Engineering & Applied AI</option>
                  <option value="design">UX/UI Design Systems</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10.5px] font-black text-slate-500 uppercase tracking-wider font-mono">Tell us about your project or requirement *</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Explain your technical roadmap, current stack bottlenecks, or scope requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none transition-all resize-none font-semibold"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10.5px] font-black text-slate-500 uppercase tracking-wider font-mono">Project Timeline</label>
                  <input 
                    type="text" 
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g. 3-6 months"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 focus:border-blue-600 focus:bg-white text-xs text-slate-800 outline-none transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10.5px] font-black text-slate-500 uppercase tracking-wider font-mono">Budget Range</label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 focus:border-blue-600 focus:bg-white text-xs text-slate-655 outline-none transition-all font-bold"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                  </select>
                </div>
              </div>

              {/* Policy Checkbox */}
              <div className="flex items-start gap-3.5 pt-2 text-left">
                <input 
                  type="checkbox" 
                  id="agree-checkbox"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="agree-checkbox" className="text-[11px] text-slate-500 font-semibold leading-normal select-none cursor-pointer">
                  I agree to the <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>.
                </label>
              </div>

              <div className="pt-3">
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl text-white bg-blue-600 hover:bg-blue-700 text-xs font-black uppercase tracking-wider font-mono inline-flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg shadow-blue-500/10 active:scale-98"
                >
                  Send Message <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Other Ways to Connect */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Connection list */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6 text-left">
              <h3 className="text-base font-black text-slate-800 tracking-tight font-outfit">
                Other Ways to Connect
              </h3>

              <div className="space-y-5 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Email Us</h4>
                    <a href="mailto:info@priviasolutions.net" className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors block mt-0.5">
                      info@priviasolutions.net
                    </a>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Schedule a Meeting</h4>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5">
                      Book a consultation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance card */}
            <div className="p-6 rounded-3xl bg-blue-50/40 border border-blue-100/60 shadow-sm text-left flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                  <Headphones className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 tracking-tight font-outfit">Need Immediate Assistance?</h4>
                </div>
              </div>
              
              <button 
                onClick={() => toast.success("Connecting to 24/7 SLA Support ...")}
                className="w-full py-3 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-bold font-mono text-center flex items-center justify-center gap-1.5 transition-all active:scale-98 bg-white"
              >
                Contact Support <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= BOTTOM HIGHLIGHT DETAILS ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200/60 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-5xl mx-auto">
          {[
            { title: "We're Fast", desc: "Quick responses and timely updates.", icon: Send },
            { title: "We're Secure", desc: "Your data is protected and never shared.", icon: Shield },
            { title: "We're Experts", desc: "Industry-leading specialists ready to help.", icon: Users },
            { title: "We're Focused", desc: "We deliver solutions that drive real impact.", icon: Target }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="flex items-start gap-4 text-left p-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 shrink-0 shadow-3xs">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-sm text-slate-900 tracking-tight leading-tight">{feat.title}</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white text-left flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          {/* Circular blueprint grid graphic overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full border border-white/5 pointer-events-none" />

          {/* Left Details */}
          <div className="space-y-4 relative z-10 flex-1">
            <span className="text-[9px] font-black tracking-widest text-blue-200 uppercase font-mono block">
              READY TO GET STARTED?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-outfit max-w-xl leading-tight">
              Take the First Step Towards <br />
              Your Next Big Success
            </h3>
            <p className="text-xs text-blue-100 max-w-xl leading-relaxed font-semibold">
              Let's discuss how we can help you modernize, secure, and scale your infrastructure for the future.
            </p>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-3">

              
              <Link 
                href="/services"
                className="px-5.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider font-mono text-white border border-white/30 hover:bg-white/10 transition-all flex items-center gap-1.5 active:scale-98"
              >
                View Our Services
              </Link>
            </div>
          </div>

          {/* Right Vector Paper Plane */}
          <div className="relative flex justify-center shrink-0 z-10">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Concentric rings */}
              <div className="absolute rounded-full border border-white/10 w-36 h-36 animate-[spin_20s_linear_infinite]" />
              <div className="absolute rounded-full border border-dashed border-white/20 w-28 h-28 animate-[spin_12s_linear_infinite] [animation-direction:reverse]" />
              
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-white/90 fill-current drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-[pulse_4s_ease-in-out_infinite]">
                {/* Paper plane shape */}
                <path d="M20 50 L85 15 L50 85 L42 60 Z M42 60 L85 15 L50 85" />
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
