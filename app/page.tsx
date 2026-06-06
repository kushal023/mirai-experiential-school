"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import {
  Cpu,
  Workflow,
  Palette,
  Music,
  BookOpen,
  Shield,
  Activity,
  Award,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  MessageCircle,
  Clock,
  Compass,
  Users,
  Menu,
  X,
  Send,
  Check,
  Search,
  FileText,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Brain,
  Globe,
  Building,
  Utensils,
  Flame,
  MessageSquare,
  Map,
  ChevronRight,
  Sparkle,
  Target,
  Monitor,
  AlertCircle,
  HelpCircle,
  Heart,
  School,
  BookMarked
} from "lucide-react";

// --- SECTION DATA TYPES & CONSTANTS ---
interface TrustBlock {
  id: string;
  title: string;
  category: string;
  image: string;
}

const TRUST_BLOCKS: TrustBlock[] = [
  {
    id: "inquiry",
    title: "Inquiry Based Classrooms",
    category: "COGNITIVE RIGOR",
    image: "/images/class-room.png"
  },


  {
    id: "faculty",
    title: "Expert Faculty",
    category: "GLOBAL EDUCATORS",
    image: "/images/inquiry.png"
  },
  {
    id: "communities",
    title: "Small Learning Communities",
    category: "PASTORAL ADVANTAGE",
   image: "/images/library.png"
  },
  {
    id: "sports",
    title: "Sports Infrastructure",
    category: "PHYSICAL FORTITUDE",
    image: "/images/sports.jpg"
  },
  {
    id: "arts",
    title: "Arts & Creativity",
    category: "CREATIVE FLUENCY",
    image: "/images/Arts.png"
  },
  {
    id: "dining",
    title: "Healthy Dining",
    category: "NUTRITIONAL EXCELLENCE",
   image: "/images/dining-hall.png"
  },
  {
    id: "day-boarding",
    title: "Basketball & Tennis Court",
    category: "MODERN CONVENIENCE",
   image: "/images/Basketball.jpg"
  },
  {
    id: "full-boarding",
    title: "Full Boarding",
    category: "CHARACTER ENGAGEMENT",
    image: "/images/inquiry.png"
  }
];

export default function MiraiSchoolWebsite() {
  // Navigation & UI States
  const [expandedTile, setExpandedTile] = useState<number | null>(null);
  const [activeDiffCard, setActiveDiffCard] = useState<number>(0);
  const [activeFridayClass, setActiveFridayClass] = useState<number>(0);
  const [activeCalendarTab, setActiveCalendarTab] = useState<"standard" | "friday">("standard");
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);
  const [activeJourney, setActiveJourney] = useState<"eyp" | "pyp" | "myp">("eyp");
  const [activeCampusTab, setActiveCampusTab] = useState<string>("classrooms");
  const [scrolled, setScrolled] = useState(false);

  // Floating AI Chat Box States
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    {
      role: "bot",
      text: "Welcome to Mirai Experiential School. I am your premium AI Admissions Concierge. Ask me about our AI Era readiness, Harvard-inspired Future Fridays™, Stanford-inspired Design Thinking, fees, or boarding options."
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Form Submissions States
  const [tourFormSubmitted, setTourFormSubmitted] = useState(false);
  const [tourData, setTourData] = useState({ name: "", email: "", phone: "", grade: "Grade 6 to 10", date: "" });
  
  const [prospectusSubmitted, setProspectusSubmitted] = useState(false);
  const [prospectusData, setProspectusData] = useState({ name: "", email: "", phone: "", interestedProgram: "DP (Grades 11-12)" });

  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackData, setCallbackData] = useState({ name: "", phone: "", preferredTime: "Morning (09:00 AM - 12:00 PM)" });

  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applyData, setApplyData] = useState({
    parentName: "", childName: "", childDob: "", email: "", phone: "",
    applyingGrade: "Grade 11 (DP)", currentBoard: "CBSE", interestArea: "Science & AI Projects"
  });

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = (tabId: "tab-tour" | "tab-prospectus" | "tab-callback" | "tab-apply") => {
    scrollToSection("admissions-forms");
    setTimeout(() => {
      const tabElement = document.getElementById(tabId);
      if (tabElement) {
        (tabElement as HTMLButtonElement).click();
      }
    }, 400);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync AI Chat Scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isAiLoading]);

  // AI API Handler
  const handleSendAiMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isAiLoading) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsAiLoading(true);

    try {
      const history = chatMessages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: userMsg,
          chatHistory: history,
        }),
      });

      if (!res.ok) throw new Error("API Route failure");
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: "bot", text: data.text }]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I experienced a minor connection latency. However, based on our guidelines, you can book a campus tour directly on Saturday, or submit an admission callback, and our physical dean will contact you shortly."
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1C1917] min-h-screen selection:bg-[#AA4A44] selection:text-white relative font-sans">
      
      {/* HEADER NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#E7E7E7] py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
 <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
  <img
    src="/images/mirai-logo.png"
    alt="Mirai Experiential School"
    className="h-14 w-auto object-contain"
  />
</div>
          
          <nav className="hidden lg:flex space-x-7 text-xs font-semibold uppercase tracking-wider font-mono text-[#1C1917]/80">
            <button onClick={() => scrollToSection("why-exists")} className="hover:text-[#AA4A44] transition">Our Philosophy</button>
            <button onClick={() => scrollToSection("why-parents")} className="hover:text-[#AA4A44] transition">Why Us</button>
            <button onClick={() => scrollToSection("difference")} className="hover:text-[#AA4A44] transition">AI Era</button>
            <button onClick={() => scrollToSection("fridays")} className="hover:text-[#AA4A44] transition">Future Fridays</button>
            <button onClick={() => scrollToSection("calendar-model")} className="hover:text-[#AA4A44] transition">4+1 Model</button>
            <button onClick={() => scrollToSection("ib-era")} className="hover:text-[#AA4A44] transition">Why IB</button>
            <button onClick={() => scrollToSection("campus-exp")} className="hover:text-[#AA4A44] transition">Campus</button>
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleCtaClick("tab-tour")} 
              className="px-5 py-2.5 rounded-full bg-[#AA4A44] text-white hover:bg-[#AA4A44]/90 transition text-xs font-bold uppercase tracking-wide font-mono shadow-sm"
              id="nav-book-tour-btn"
            >
              Book Tour
            </button>
            {/* <button 
              onClick={() => setIsAiChatOpen(true)}
              className="p-2.5 rounded-full border border-[#C99996]/50 text-[#AA4A44] bg-[#C99996]/10 hover:bg-[#C99996]/20 transition relative"
              title="Admissions Chat"
              id="nav-ai-chat-btn"
            >
              <Sparkles className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 block w-2 h-2 rounded-full bg-[#77966D]" />
            </button> */}
          </div>
        </div>
      </header>

      {/* FLOAT CONCIERGE BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* <button
          onClick={() => setIsAiChatOpen(true)}
          className="flex items-center space-x-2 bg-[#AA4A44] text-white py-3.5 px-5 rounded-full shadow-2xl hover:bg-[#AA4A44]/90 transition border border-white/20"
          id="floating-ai-concierge-btn"
        >
          <Sparkle className="w-4 h-4 animate-pulse text-[#FAF7F2]" />
          <span className="font-mono text-xs font-bold tracking-wide uppercase">Admissions AI</span>
        </button> */}
      </div>

      {/* SECTION 1 — HERO */}
      <section id="hero" className="relative h-[95vh] lg:h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-[#FAF7F2]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#AFBFAA_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#C99996]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#AFBFAA]/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#AA4A44]/5 border border-[#AA4A44]/15 rounded-full w-fit mb-5">
                <span className="w-2 h-2 rounded-full bg-[#AA4A44] animate-ping" />
                <span className="font-mono text-[10px] text-[#AA4A44] font-extrabold uppercase tracking-widest">Ghaziabad Delhi NCR, India</span>
              </div>
              
              <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-[#1C1917] leading-[1.08] tracking-tight mb-6">
                Preparing Children <br className="hidden sm:inline" />
                <span className="text-[#AA4A44] inline-block relative">
                  For The World Ahead
                  <span className="absolute left-0 bottom-1 w-full h-[6px] bg-[#77966D]/15 -z-10" />
                </span>
              </h1>
              
              <p className="font-sans text-base sm:text-lg text-[#1C1917]/80 max-w-xl leading-relaxed mb-8">
                An Experiential IB School where students learn to think, build, question and create. Designing the builders of the AI Era.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button 
                  onClick={() => handleCtaClick("tab-tour")}
                  className="w-full sm:w-auto px-8 py-4 bg-[#AA4A44] text-white hover:bg-[#AA4A44]/95 transition rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:translate-y-[-1px]"
                  id="hero-book-tour-btn"
                >
                  <span>Book A Campus Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
<button
  onClick={() =>
    window.open(
      "https://wa.me/919220522282?text=Hello%20Mirai%20School,%20I%20would%20like%20to%20know%20more%20about%20admissions.",
      "_blank"
    )
  }
  className="w-full sm:w-auto px-8 py-4 border-2 border-[#1C1917]/20 text-[#1C1917] bg-transparent hover:bg-[#1C1917]/5 transition rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2"
  id="hero-whatsapp-btn"
>
  <MessageCircle className="w-4 h-4" />
  <span>Talk to Admissions</span>
</button>
              </div>
            </div>

            {/* Right Cinematic Slider / Layout representing Robotics, Prototype, Collaboration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#E7E7E7] shadow-xl group bg-white p-2">
            <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
  <Image
    src="/images/mirai-campus-hero.png"
    alt="Mirai Experiential School Campus"
    fill
    priority
    sizes="(max-width: 768px) 100vw, 700px"
    className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
  />

  {/* Premium Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

  {/* Accent Light Sweep */}
  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#AFBFAA] to-transparent opacity-70" />

  {/* Campus Information Card */}
  <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/92 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-[#AA4A44]/10 rounded-xl">
        <School className="w-5 h-5 text-[#AA4A44]" />
      </div>

      <div>
        <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#77966D] font-bold">
          IB WORLD SCHOOL
        </span>

        <span className="block font-serif font-bold text-sm text-[#1C1917]">
          Future Fridays™ • Harvard-Inspired 4+1 Learning Model
        </span>
      </div>
    </div>
  </div>
</div>
              </div>
            </div>
            
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="border-t border-[#E7E7E7] bg-white absolute bottom-0 left-0 right-0 py-4 shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-between min-w-[700px] text-[11px] font-mono font-bold uppercase tracking-widest text-[#1C1917]/70 divide-x divide-[#E7E7E7]">
              <span className="px-4 text-[#AA4A44]">IB Curriculum Integration</span>
              <span className="px-4">Future Fridays™ Fieldwork</span>
              <span className="px-4">Stanford Design Thinking</span>
              <span className="px-4">Integrated Maker Lab</span>
              <span className="px-4">Flexible Day Boarding</span>
              <span className="px-4">Elite Resident Boarding</span>
            </div>
          </div>
        </div>
      </section>

      {/* EMOTIONAL FOUNDATION BRIDGING INTERFACE */}
      <section className="bg-[#1C1917] text-[#FAF7F2] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#77966D] font-bold block mb-4">THE CHASM IN INDIAN EDUCATION</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto mb-10">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
              <span className="font-mono text-[10px] text-[#C99996] uppercase tracking-wider block mb-2">TRADITIONAL SCHOOLING ASKS</span>
              <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#C99996] italic">&ldquo;What did you score?&rdquo;</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#AA4A44]/10 border border-[#AA4A44]/30 text-center scale-105 shadow-xl">
              <span className="font-mono text-[10px] text-[#FAF7F2] uppercase tracking-wider block mb-2 text-[#77966D]">MIRAI COMMITTEDLY ASKS</span>
              <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FAF7F2]">&ldquo;What can you build?&rdquo;</p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#FAF7F2]/70 max-w-2xl mx-auto leading-relaxed">
            This inquiry defines our emotional and pedagogical foundation. We do not value memorizing formulas for ancient examinations; we evaluate a child&apos;s agency to think from first principles and resolve real complexities.
          </p>
        </div>
      </section>

      {/* SECTION 2 — WHY MIRAI EXISTS */}
      <section id="why-exists" className="py-24 bg-[#FCFAF7] border-b border-[#E7E7E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">CONVERSING FIRST PRINCIPLES</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
              The World Has Changed. <br />Has Education?
            </h2>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#E7E7E7] rounded-3xl hover:border-[#AA4A44]/30 transition group shadow-sm">
              <div className="text-center pb-4 border-b border-[#E7E7E7] mb-4">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase">OLD SYSTEM FOCUS</span>
                <p className="font-serif text-2xl font-bold text-[#1C1917]/50 line-through mt-1">Memorisation</p>
              </div>
              <div className="text-center pt-2">
                <span className="text-xs font-mono font-bold text-[#77966D] uppercase">MIRAI SYSTEM ACTION</span>
                <p className="font-serif text-2xl font-bold text-[#AA4A44] mt-1 group-hover:scale-105 transition-transform">Creation</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E7E7E7] rounded-3xl hover:border-[#AA4A44]/30 transition group shadow-sm">
              <div className="text-center pb-4 border-b border-[#E7E7E7] mb-4">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase">OLD SYSTEM FOCUS</span>
                <p className="font-serif text-2xl font-bold text-[#1C1917]/50 line-through mt-1">Textbooks</p>
              </div>
              <div className="text-center pt-2">
                <span className="text-xs font-mono font-bold text-[#77966D] uppercase">MIRAI SYSTEM ACTION</span>
                <p className="font-serif text-2xl font-bold text-[#AA4A44] mt-1 group-hover:scale-105 transition-transform">Projects</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E7E7E7] rounded-3xl hover:border-[#AA4A44]/30 transition group shadow-sm">
              <div className="text-center pb-4 border-b border-[#E7E7E7] mb-4">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase">OLD SYSTEM FOCUS</span>
                <p className="font-serif text-2xl font-bold text-[#1C1917]/50 line-through mt-1">Answers</p>
              </div>
              <div className="text-center pt-2">
                <span className="text-xs font-mono font-bold text-[#77966D] uppercase">MIRAI SYSTEM ACTION</span>
                <p className="font-serif text-2xl font-bold text-[#AA4A44] mt-1 group-hover:scale-105 transition-transform">Questions</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E7E7E7] rounded-3xl hover:border-[#AA4A44]/30 transition group shadow-sm">
              <div className="text-center pb-4 border-b border-[#E7E7E7] mb-4">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase">OLD SYSTEM FOCUS</span>
                <p className="font-serif text-2xl font-bold text-[#1C1917]/50 line-through mt-1">Exams</p>
              </div>
              <div className="text-center pt-2">
                <span className="text-xs font-mono font-bold text-[#77966D] uppercase">MIRAI SYSTEM ACTION</span>
                <p className="font-serif text-2xl font-bold text-[#AA4A44] mt-1 group-hover:scale-105 transition-transform">Real Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHY PARENTS CHOOSE MIRAI */}
      <section id="why-parents" className="py-24 bg-[#FAF7F2] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">PARENTAL CONFIDENCE INDEX</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
              An Architectural Framework Built on Uncompromised Trust
            </h2>
            <p className="text-sm text-[#1C1917]/70 mt-4 leading-relaxed font-sans max-w-xl mx-auto">
              Thrive inside a secure campus mapping critical thinking directly against physical, logical, and computational milestones.
            </p>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BLOCKS.map((block, idx) => (
              <div
                key={block.id}
                className="group relative aspect-square rounded-[2rem] overflow-hidden border border-[#E7E7E7] bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={block.image}
                    alt={block.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
                </div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-white backdrop-blur-sm border border-white/10">
                      {block.category}
                    </span>
                    <span className="font-mono text-xs text-white/40">{"0" + (idx + 1)}</span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg mb-1 text-white leading-tight group-hover:text-[#C99996] transition-colors">{block.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — THE MIRAI DIFFERENCE */}
      <section id="difference" className="py-24 bg-[#FCFAF7] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">COGNITIVE SOVEREIGNTY</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
              Learning Designed For The AI Era
            </h2>
            <p className="text-sm text-[#1C1917]/75 mt-3 leading-relaxed max-w-xl mx-auto">
              To thrive beside artificial neural intelligence, human children must learn to master First Principles Thinking, deep conceptual query and creative execution frameworks.
            </p>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
            {[
              {
                title: "First Principles Thinking",
                subtitle: "Breaking complex issues to bedrock fundamentals.",
                desc: "Inspired by Elon Musk's legendary analytical template, scholars dissect real-world challenges down to foundational physics, math, or biology codes, avoiding outdated analogies.",
                badge: "ELON MUSK PARADIGM"
              },
              {
                title: "Conceptual Inquiry",
                subtitle: "The profound IB 'HOW' of system mechanics.",
                desc: "Instead of remembering raw code syntax or historical events, scholars map how systems emerge, interact, and organize over critical timelines.",
                badge: "IB METHODOLOGY"
              },
              {
                title: "Ethical Maturity",
                subtitle: "The absolute human 'WHY' of decision frameworks.",
                desc: "Evaluating the ecological, social, and moral consequences of algorithmic or environmental changes, grooming empathetic world leaders.",
                badge: "MORAL REASONING"
              },
              {
                title: "Creative Agency",
                subtitle: "The decisive IB 'ACTION' pathway.",
                desc: "Students are structurally guided to develop, model, and deploy software, hardware, or biological solutions that address regional challenges.",
                badge: "APPLIED EXECUTION"
              }
            ].map((diff, dIndex) => (
              <div 
                key={dIndex}
                onClick={() => setActiveDiffCard(dIndex)}
                className={`p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeDiffCard === dIndex 
                  ? "bg-[#1C1917] text-white border-[#1C1917] lg:translate-y-[-6px] shadow-lg" 
                  : "bg-white text-[#1C1917] border-[#E7E7E7] hover:border-[#AA4A44]/30"
                }`}
              >
                <span className={`font-mono text-[9px] font-extrabold uppercase tracking-widest block mb-4 ${activeDiffCard === dIndex ? "text-[#77966D]" : "text-[#AA4A44]"}`}>
                  {diff.badge}
                </span>
                <h3 className="font-serif font-bold text-xl mb-2 leading-tight">{diff.title}</h3>
                <h4 className="font-sans text-xs italic mb-4 opacity-80 leading-relaxed font-semibold">{diff.subtitle}</h4>
                <p className="text-xs leading-relaxed opacity-70 font-sans">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FUTURE FRIDAYS™ */}
      <section id="fridays" className="py-24 bg-[#FAF7F2] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">OUTOFCLASSROOM PARADIGM</span>
              <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
                Every Friday The World Becomes The Classroom
              </h2>
              <div className="w-16 h-[3px] bg-[#AA4A44] mt-4" />
              <p className="text-sm sm:text-base text-[#1C1917]/85 leading-relaxed mt-6 max-w-2xl">
                We eliminate traditional instructional walls. Every Friday, students participate in deep-tech, design, and ecological actions inside research spaces, production factories, and universities.
              </p>
            </div>
            
            <div className="lg:col-span-4 bg-white border border-[#E7E7E7] p-6 rounded-3xl shadow-sm">
              <span className="font-mono text-[10px] text-[#77966D] uppercase block mb-1 font-bold">FRIDAY STATISTICS</span>
              <p className="text-3xl font-extrabold text-[#AA4A44] font-serif">40+ Immersion Sites</p>
              <p className="text-xs text-[#1C1917]/70 mt-1 leading-relaxed">
                Ranging from local startup labs to astronomical research parks and automotive prototyping studios.
              </p>
            </div>
          </div>

          {/* Place Swapper & Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono text-[10px] uppercase text-[#AA4A44] font-extrabold tracking-widest block mb-1">IMMEDIATE IMMERSION HOTSPOTS</span>
              {[
                "Robotics Labs",
                "Innovation Centers",
                "Museums & Heritage Parks",
                "Research Facilities",
                "Corporate Industry Visits",
                "Dialogues with Entrepreneurs",
                "Scientists Conferences",
                "Design Studios",
                "Technology Hubs",
                "Visiting Universities"
              ].map((site, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setActiveFridayClass(sIdx)}
                  className={`w-full text-left py-3 px-4 rounded-xl border text-xs font-mono font-medium transition flex justify-between items-center ${
                    activeFridayClass === sIdx 
                    ? "bg-[#AA4A44] text-white border-[#AA4A44] font-bold" 
                    : "bg-white border-[#E7E7E7] text-[#1C1917]/80 hover:border-[#C99996]"
                  }`}
                >
                  <span>📍 {site}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeFridayClass === sIdx ? "rotate-90 text-[#C99996]" : "text-gray-400"}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-white border border-[#E7E7E7] p-8 rounded-[2rem] shadow-sm">
              <span className="font-mono text-[10px] text-[#77966D] uppercase tracking-widest block font-bold mb-4">IMMERSIVE ACTION TIMELINE</span>
              
              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E7E7E7]">
                {[
                  {
                    step: "Monday–Thursday",
                    title: "Rigorous Academic Concepts",
                    desc: "Core academic inquiry, theories, mathematics, and IB framework training."
                  },
                  {
                    step: "Friday",
                    title: "Real World Immersion Action",
                    desc: "Shedding uniforms to test calculations inside real-world environments and laboratories."
                  },
                  {
                    step: "Capstone Project",
                    title: "Synthesis & Mechanical Realization",
                    desc: "Consolidating observations into functional computational, digital, or social prototypes."
                  },
                  {
                    step: "Presentation",
                    title: "Public Engineering Showcase",
                    desc: "Exhibiting and defense of models before active university mentors and startup executives."
                  },
                  {
                    step: "Reflection & Feed-forward",
                    title: "IB Metacognitive Review",
                    desc: "Evaluating limits, structural efficiency, and mapping pathways forward."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 relative">
                    <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border-2 border-[#AA4A44] flex items-center justify-center font-mono text-[10px] font-bold text-[#AA4A44] relative z-10 shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#77966D] tracking-widest block font-bold mb-0.5">{item.step}</span>
                      <h4 className="font-serif font-bold text-base text-[#1C1917]">{item.title}</h4>
                      <p className="text-xs text-[#1C1917]/70 leading-relaxed font-sans mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — 4+1 LEARNING MODEL */}
      <section id="calendar-model" className="py-24 bg-[#FCFAF7] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3 font-bold">THE MIRAI SCHEMA</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
              4 Days Learning. <br className="sm:hidden" />1 Day Building The Future.
            </h2>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="flex bg-[#FAF7F2] p-1.5 rounded-full border border-[#E7E7E7] max-w-md mx-auto mb-10 overflow-hidden font-mono text-xs font-bold uppercase transition scale-95">
            <button
              onClick={() => setActiveCalendarTab("standard")}
              className={`flex-1 py-3 px-4 rounded-full text-center transition ${
                activeCalendarTab === "standard" ? "bg-[#AA4A44] text-[#FAF7F2]" : "text-[#1C1917]/70 hover:bg-[#1C1917]/5"
              }`}
            >
              🗓️ Mon–Thu (Academic Focus)
            </button>
            <button
              onClick={() => setActiveCalendarTab("friday")}
              className={`flex-1 py-3 px-4 rounded-full text-center transition ${
                activeCalendarTab === "friday" ? "bg-[#AA4A44] text-[#FAF7F2]" : "text-[#1C1917]/70 hover:bg-[#1C1917]/5"
              }`}
            >
              🚀 Friday (Applied Focus)
            </button>
          </div>

          <div className="bg-white border border-[#E7E7E7] rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
            {activeCalendarTab === "standard" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="font-mono text-xs uppercase text-[#AA4A44] tracking-widest font-bold block mb-1">MON TO THU CYCLE</span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917] mb-4">Fusing Rigorous IB Concepts</h3>
                  <p className="text-sm text-[#1C1917]/85 leading-relaxed mb-6 font-sans">
                    Structured around cognitive depth, transdisciplinary frameworks, and high-compute science cycles. Students master literature analysis, mathematical calculations, and physical sciences systematically, conforming to candidate IB expectations.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7E7E7]">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#77966D] block mb-1">01. TRANS-DISCIPLINARY</span>
                      <p className="text-xs text-[#1C1917]/80 leading-relaxed font-sans">Synthesize humanities with logic.</p>
                    </div>
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7E7E7]">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#77966D] block mb-1">02. CONCEPT INQUIRY</span>
                      <p className="text-xs text-[#1C1917]/80 leading-relaxed font-sans">Understanding underlying principles deeply.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E7E7E7]">
                  <Image 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
                    alt="Active standard classroom session"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="font-mono text-xs uppercase text-[#77966D] tracking-widest font-bold block mb-1">FRIDAY DEEP CYCLE</span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917] mb-4">Applied Discovery & Innovation</h3>
                  <p className="text-sm text-[#1C1917]/85 leading-relaxed mb-6 font-sans">
                    Guarded by expert entrepreneurs and active scientists. Scholars dedicate full focus to prototyping, troubleshooting algorithms, and working through Stanford-inspired design matrices to deliver mechanical or digital solutions.
                  </p>
                  <div className="grid grid-cols-2 gap-4 font-sans text-xs text-[#1C1917]/85">
                    <div className="p-4 bg-[#AA4A44]/5 border border-[#AA4A44]/10 rounded-2xl">
                      <span className="font-mono font-extrabold uppercase text-[#AA4A44] text-[9px] block mb-1">01. APPLIED DISCOVERY</span>
                      <span>Observe real machinery and structures in native corporate sites.</span>
                    </div>
                    <div className="p-4 bg-[#AA4A44]/5 border border-[#AA4A44]/10 rounded-2xl">
                      <span className="font-mono font-extrabold uppercase text-[#AA4A44] text-[9px] block mb-1">02. MENTORSHIP & PROTOTYPES</span>
                      <span>Create and review prototypes under elite mentorship.</span>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E7E7E7]">
                  <Image 
                    src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800"
                    alt="Maker Lab building action"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7 — WHY IB FOR THE AI ERA */}
      <section id="ib-era" className="py-24 bg-[#FAF7F2] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">CURRICULAR VALIDATION</span>
              <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#1C1917] leading-tight">
                Why IB Matters More Than Ever
              </h2>
              <div className="w-16 h-[3px] bg-[#AA4A44] mt-4 mb-6" />
              <p className="text-sm sm:text-base text-[#1C1917]/85 leading-relaxed mb-6 font-sans">
                Traditional boards are built for factory-era efficiency, evaluating memorization of concepts. The International Baccalaureate (IB) framework teaches students <strong>HOW to think, not WHAT to think</strong>.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-white rounded-full border border-[#E7E7E7] font-mono text-[10px] text-[#AA4A44] font-bold">Inquiry Led Framework</span>
                <span className="px-4 py-2 bg-white rounded-full border border-[#E7E7E7] font-mono text-[10px] text-[#77966D] font-bold">Globally Recognized Curriculum</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#E7E7E7] p-8 rounded-3xl shadow-sm text-center">
                <span className="font-mono text-xs text-[#77966D] font-bold block mb-1">MACKINSEY SKILLS REQUIREMENT</span>
                <p className="text-5xl sm:text-6xl font-serif font-black text-[#AA4A44] line-height-none">72%</p>
                <p className="font-sans text-xs text-[#1C1917]/70 font-semibold mt-2 uppercase tracking-wide">
                  Demand For Active Critical Thinking In AI Economy
                </p>
              </div>

              <div className="bg-white border border-[#E7E7E7] p-8 rounded-3xl shadow-sm text-center">
                <span className="font-mono text-xs text-[#77966D] font-bold block mb-1">WORLD ECONOMIC FORUM PLURALITY</span>
                <p className="text-5xl sm:text-6xl font-serif font-black text-[#1C1917] line-height-none">44%</p>
                <p className="font-sans text-xs text-[#1C1917]/70 font-semibold mt-2 uppercase tracking-wide">
                  Skills Disruption Expected via AI models in 5 years
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 — TRANSLATING IB INTO THE AI ERA */}
      <section className="py-24 bg-[#FCFAF7] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">FUTURE-PROOF OCCUPATIONS</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#AA4A44] leading-tight">
              Translating IB Excellence Into Future Professions
            </h2>
            <p className="text-sm text-[#1C1917]/70 mt-3 leading-relaxed max-w-lg mx-auto">
              How our bespoke delivery of the IB framework builds the fundamental capacities required for tomorrow&apos;s leading occupations.
            </p>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {[
              {
                role: "Prompt Engineer",
                desc: "Instructing large language models via logical precision and systems understanding.",
                ibSkill: "Conceptual inquiry & deep contextual logic"
              },
              {
                role: "AI Ethicist",
                desc: "Evaluating the moral consequences, bias, and parameters of automated systems.",
                ibSkill: "Theory of Knowledge (TOK) & Ethical reasoning"
              },
              {
                role: "Systems Thinker",
                desc: "Synthesizing cross-disciplinary insights to manage complex engineering flows.",
                ibSkill: "IB Transdisciplinary inquiries"
              },
              {
                role: "Future Entrepreneur",
                desc: "Taking ideas from concept to real-world solution under pressure.",
                ibSkill: "IB CAS Action & Friday capstones"
              },
              {
                role: "Innovation Leader",
                desc: "Heading multi-disciplinary teams in solving global climate or technological challenges.",
                ibSkill: "IB Extended Essay & research ethics"
              }
            ].map((prof, pIndex) => (
              <div 
                key={pIndex}
                onClick={() => setActiveRoleIndex(pIndex)}
                className={`p-6 rounded-2xl border transition duration-300 cursor-pointer ${
                  activeRoleIndex === pIndex 
                  ? "bg-[#1C1917] text-white border-[#1C1917] scale-105" 
                  : "bg-white text-[#1C1917] border-[#E7E7E7] hover:border-[#AA4A44]/30"
                }`}
              >
                <h3 className="font-serif font-bold text-lg mb-2 leading-tight">{prof.role}</h3>
                <p className="text-xs leading-relaxed opacity-70 mb-4 font-sans">{prof.desc}</p>
                <div className="pt-3 border-t border-[#E7E7E7]/30">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#77966D] font-bold block mb-1">PRECISE IB SKILL CORRELATION</span>
                  <span className="text-xs font-semibold font-serif block">{prof.ibSkill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — EXPERIENTIAL LEARNING JOURNEY */}
      <section className="py-24 bg-[#FAF7F2] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3 font-bold">KIDS MILESTONE HORIZONS</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
              Every Age. Every Stage.
            </h2>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-white border border-[#E7E7E7] hover:border-[#77966D] transition shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#77966D] font-extrabold uppercase block mb-2">EARLY YEARS (EYP / PRE-K TO K)</span>
                <h3 className="font-serif font-extrabold text-2xl text-[#1C1917] mb-4">Focus: Sensory Discovery</h3>
                <p className="text-xs leading-relaxed text-[#1C1917]/75 mb-6 font-sans">
                  Reggio-Emilia-inspired sensory play coupled with early IB inquiry milestones. Structured entirely around:
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Play", "Explore", "Wonder", "Discover"].map((t) => (
                    <span key={t} className="px-3 py-1 bg-[#FAF7F2] border border-[#E7E7E7] rounded-full text-xs font-mono font-bold text-[#AA4A44]">✓ {t}</span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">AUDITED BY ADVISORY COUNCELS</span>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-[#E7E7E7] hover:border-[#77966D] transition shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#77966D] font-extrabold uppercase block mb-2">PRIMARY DEEP YEARS (PYP / GRADES 1-5)</span>
                <h3 className="font-serif font-extrabold text-2xl text-[#1C1917] mb-4">Focus: Applied Inquiry</h3>
                <p className="text-xs leading-relaxed text-[#1C1917]/75 mb-6 font-sans">
                  Transitioning from basic discovery to collaborative, structured inquiries where math meets physical prototyping:
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Inquiry", "Research", "Collaboration", "Communication"].map((t) => (
                    <span key={t} className="px-3 py-1 bg-[#FAF7F2] border border-[#E7E7E7] rounded-full text-xs font-mono font-bold text-[#AA4A44]">✓ {t}</span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">1:8 TEACHER RATIO ASSURED</span>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-[#E7E7E7] hover:border-[#77966D] transition shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#77966D] font-extrabold uppercase block mb-2">MIDDLE EDUCATION (MYP / GRADES 6-10)</span>
                <h3 className="font-serif font-extrabold text-2xl text-[#1C1917] mb-4">Focus: System Design</h3>
                <p className="text-xs leading-relaxed text-[#1C1917]/75 mb-6 font-sans">
                  Deep transdisciplinary challenges, algorithmic logic, Friday corporate actions, and critical capstones:
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Critical Thinking", "Future Pathways", "Design Challenges", "Global Perspectives"].map((t) => (
                    <span key={t} className="px-3 py-1 bg-[#FAF7F2] border border-[#E7E7E7] rounded-full text-xs font-mono font-bold text-[#AA4A44]">✓ {t}</span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">PORTFOLIO TRACK CHANNELS</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — CAMPUS EXPERIENCE */}
      <section id="campus-exp" className="py-24 bg-[#FCFAF7] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3 font-bold">SPATIAL REALIZATION NCR</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
              A Campus Built For Real-World Discovery
            </h2>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="flex bg-[#FAF7F2] p-1 border border-[#E7E7E7] rounded-xl mb-10 overflow-x-auto scrollbar-none font-mono text-xs font-bold uppercase whitespace-nowrap">
            {[
              { id: "classrooms", label: "Classrooms" },
              { id: "library", label: "Library" },
              { id: "science-labs", label: "Science Labs" },
              { id: "sports", label: "Sports Fields" },
              { id: "art-spaces", label: "Art Spaces" },
              { id: "dining", label: "Dining Hall" },
              { id: "hostel", label: "Hostel Rooms" },
              { id: "activities", label: "Activity Areas" },
              { id: "outdoor", label: "Outdoor Spaces" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCampusTab(tab.id)}
                className={`py-2 px-4 rounded-lg transition ${
                  activeCampusTab === tab.id ? "bg-[#AA4A44] text-white" : "text-[#1C1917]/70 hover:bg-[#1C1917]/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white border border-[#E7E7E7] rounded-[2.5rem] p-8 shadow-sm">
            {[
              {
                id: "classrooms",
                title: "Inquiry-Based Classrooms",
                desc: "Smart spaces designed for curiosity, collaboration, and deeper learning.",
                img: "/images/class-room.png"
              },
              {
                id: "library",
                title: "Global Scholastic Library",
                desc: "A world-class library where curiosity grows through books, research, and discovery.",
                img: "/images/library.png"
              },
             
              {
                id: "science-labs",
                title: "Physics, Chem & Bio Complexes",
                desc: "Double-insulated environmental ventilation, professional tools, and direct telemetry plotting monitors.",
                img: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800"
              },
              {
                id: "sports",
                title: "Sports & Activity Facilities",
                desc: "Thoughtfully designed indoor and outdoor spaces that encourage movement, teamwork, confidence, and healthy development at every age.",
                img: "/images/sports.jpg"
              },
              {
                id: "art-spaces",
                title: "Sound, Theater & Fine Arts Studios",
                desc: "Fully isolated sound editing labs, recording rooms, and custom theater stages.",
                img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800"
              },
              {
                id: "dining",
                title: "Nutritional Dining Hall",
                desc: "Bright, thoroughly clean, utilizing automated thermal sanitizer washers and healthy farmer networks.",
                img: "/images/dining-hall.png"
              },
              {
                id: "hostel",
                title: "Climate Controlled Hostel Suites",
                desc: "Designed with healthy organic mattresses, personal logic study desks, and neat personal lockers.",
                img: "/images/hostel-room.webp"
              },
              {
                id: "activities",
                title: "Dynamic Co-Curricular Complexes",
                desc: "Open spaces facing steps where student-initiated guilds assemble to showcase action capstones.",
                img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
              },
              {
                id: "outdoor",
                title: "Neem Gardens & Amphitheaters",
                desc: " Waldorf-inspired green canopies designed to shelter physical activities and student discussions.",
                img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
              }
            ].map((campus) => {
              if (activeCampusTab !== campus.id) return null;
              return (
                <div key={campus.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
                  <div className="lg:col-span-5">
                    <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#1C1917] mb-4">{campus.title}</h3>
                    <p className="text-sm font-sans text-[#1C1917]/85 leading-relaxed leading-relaxed mb-6">
                      {campus.desc}
                    </p>
                  </div>
                  <div className="lg:col-span-7 relative aspect-video rounded-3xl overflow-hidden border border-[#E7E7E7]">
                    <Image 
                      src={campus.img}
                      alt={campus.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11 — FLEXIBILITY STACK™ */}
      <section className="py-24 bg-[#FAF7F2] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3 font-bold">SCHOLASTIC ENROLLMENTS</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#AA4A44] leading-tight">
              The Flexibility Stack™
            </h2>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#E7E7E7] rounded-3xl relative shadow-sm">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#77966D] font-extrabold block mb-3 bg-[#FAF7F2] py-1 px-3 rounded-full w-fit">OPTION A</span>
              <h3 className="font-serif font-black text-2xl mb-2 text-[#1C1917]">Day School</h3>
              <p className="text-xs text-[#1C1917]/75 font-sans leading-relaxed mb-6">
                Standard rigorous academics integrated with morning transdisciplinary inquiries and global IB candidates programs.
              </p>
              <div className="pt-4 border-t border-[#E7E7E7] text-xs font-mono">
                <span className="block uppercase text-gray-400 mb-1">IDEAL FOR</span>
                <span className="font-semibold block text-[#AA4A44] mb-4">Local Gurugram NCR scholars desiring standard family evenings.</span>
                <span className="block uppercase text-gray-400 mb-1">TIMING SLOTS</span>
                <span className="font-semibold block">08:00 AM - 03:00 PM</span>
              </div>
            </div>

            <div className="p-8 bg-white border-2 border-[#AA4A44] rounded-3xl relative shadow-md">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white bg-[#AA4A44] font-extrabold block mb-3 py-1 px-3 rounded-full w-fit">OPTION B (MOST POPULAR)</span>
              <h3 className="font-serif font-black text-2xl mb-2 text-[#AA4A44]">Day Boarding</h3>
              <p className="text-xs text-[#1C1917]/75 font-sans leading-relaxed mb-6">
                Enriched evening academic, design laboratory explorations, sports coached clinics, and nutritious dietitian snacks.
              </p>
              <div className="pt-4 border-t border-[#E7E7E7] text-xs font-mono">
                <span className="block uppercase text-gray-400 mb-1">IDEAL FOR</span>
                <span className="font-semibold block text-[#AA4A44] mb-4">Working parents desiring deep technical, computational guidance.</span>
                <span className="block uppercase text-gray-400 mb-1">TIMING SLOTS</span>
                <span className="font-semibold block">08:00 AM - 06:00 PM</span>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#E7E7E7] rounded-3xl relative shadow-sm">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#77966D] font-extrabold block mb-3 bg-[#FAF7F2] py-1 px-3 rounded-full w-fit">OPTION C</span>
              <h3 className="font-serif font-black text-2xl mb-2 text-[#1C1917]">Full Boarding</h3>
              <p className="text-xs text-[#1C1917]/75 font-sans leading-relaxed mb-6">
                Complete resident life fostering high emotional intelligence, individual logic routines, and physical fitness.
              </p>
              <div className="pt-4 border-t border-[#E7E7E7] text-xs font-mono">
                <span className="block uppercase text-gray-400 mb-1">IDEAL FOR</span>
                <span className="font-semibold block text-[#AA4A44] mb-4">Outstation scholars seeking absolute moral validation and leadership training.</span>
                <span className="block uppercase text-gray-400 mb-1">RESIDENCE PLAN</span>
                <span className="font-semibold block">7 Days fully supervised resident suites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12 — SAFETY & WELLBEING */}
      <section className="py-24 bg-[#FCFAF7] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">FIDUCIARY STEWARDSHIP</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
              Safety & Absolute Wellbeing
            </h2>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Health & Care",
                desc: "An active on-campus clinic with full-time resident physicians and double-certified trauma nurses.",
                metric: "24/7 ADVANTAGE"
              },
              {
                title: "Insulated Security",
                desc: "Neoprene atmospheric seals and centralized HVAC keeping PM2.5 particulates consistently below 15.",
                metric: "HEPA-13 COMMITTED"
              },
              {
                title: "Pastoral Counselling",
                desc: "Personal mental guides and advisory circles monitoring stress vectors and fostering high EQ.",
                metric: "1:12 ADVISORY CIRCLES"
              },
              {
                title: "Safety Transports",
                desc: "RFID coupled school buses with constant GPS, verified speed controllers, and female wardens.",
                metric: "GPS & RFID COMPULSORY"
              }
            ].map((saf, sIndex) => (
              <div key={sIndex} className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E7E7E7] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#77966D] block mb-2 font-bold">{saf.metric}</span>
                  <h3 className="font-serif font-bold text-lg mb-2 text-[#AA4A44]">{saf.title}</h3>
                  <p className="text-xs text-[#1C1917]/70 font-sans leading-relaxed">{saf.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#E7E7E7] mt-6 flex justify-between items-center text-[10px] font-mono font-bold text-[#77966D]">
                  <span>DAILY INTEGRITY AUDITED</span>
                  <span>✓ GUARANTEED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13 — STUDENT LIFE */}
      <section className="py-24 bg-[#FAF7F2] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3 font-bold">CO-CURRICULAR FLUX</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#AA4A44] leading-tight">
              An Active Expression of Student Life
            </h2>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "sports-life",
                title: "Competitive Athletics & Sports",
                desc: "Full football tournaments, professional basketball leagues, and swimming rinks audited daily.",
                category: "SPORTS & WELLNESS"
              },
              {
                id: "guilds-life",
                title: "Student Research Guilds",
                desc: "Debating societies, space telemetry hobby circles, and electronics prototyping leagues.",
                category: "STUDENT CLUBS"
              },
              {
                id: "celebration-life",
                title: "Experiential Cultural Explorations",
                desc: "Anual festivals, Shakespearean amphitheater productions, and global climatic workshops.",
                category: "CELEBRATIONS & EVENTS"
              }
            ].map((st, sIndex) => (
              <div 
                key={ST_LIFE_IMAGES[sIndex]} 
                className="group relative h-80 rounded-[2rem] overflow-hidden border border-[#E7E7E7] shadow-sm hover:shadow-lg transition-transform hover:translate-y-[-2px] duration-300"
              >
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={ST_LIFE_IMAGES[sIndex]}
                    alt={st.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                </div>
                
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white font-sans">
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-white/20 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm w-fit block">{st.category}</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white mb-1 leading-snug group-hover:text-[#C99996] transition-colors">{st.title}</h3>
                    <p className="text-xs text-white/80 leading-relaxed font-sans">{st.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14 — ADMISSIONS */}
      <section id="admissions" className="py-24 bg-[#FCFAF7] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3 font-bold">PORTAL TIMELINE 2026/27</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
              Join The Inaugural Generation Of Future Builders
            </h2>
            <p className="text-sm text-[#1C1917]/70 mt-3 leading-relaxed max-w-xl mx-auto">
              We select scholars built around curiosity. Admissions are strictly evaluated starting with sensory reviews and personal conceptual inquiry discussions.
            </p>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Admissions Open",
                desc: "Candidate registrations for Early Years, PYP, and MYP divisions open."
              },
              {
                step: "02",
                title: "Book A Campus Tour",
                desc: "An exclusive walk through our HEPA-13 plants, robotics modules, and heated pool systems on Saturday."
              },
              {
                step: "03",
                title: "Counselling Session",
                desc: "A direct conceptual dialogue with our admissions head to align scholar interests with 4+1 parameters."
              },
              {
                step: "04",
                title: "Application Process",
                desc: "Document evaluation, portfolio tracking setup, and final registration approval."
              }
            ].map((adm, aIndex) => (
              <div key={aIndex} className="p-8 bg-[#FAF7F2] border border-[#E7E7E7] rounded-3xl relative flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#AA4A44] text-[#FAF7F2] flex items-center justify-center font-mono font-bold mb-6">
                    {adm.step}
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2 text-[#1C1917] leading-tight">{adm.title}</h3>
                  <p className="text-xs text-[#1C1917]/70 font-sans leading-relaxed">{adm.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS INTERACTIVE FORMS CENTER */}
      <section id="admissions-forms" className="py-24 bg-[#FAF7F2] border-b border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Narrative */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">SECURE STUDENT ENROLLMENT</span>
                <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#AA4A44] leading-tight mb-6">
                  Secure Your Placement
                </h2>
                <div className="w-16 h-[3px] bg-[#AA4A44] mb-6" />
                <p className="text-sm text-[#1C1917]/85 font-sans leading-relaxed">
                  Join a dynamic workspace built entirely on transdisciplinary inquiries and global IB expectations. Complete our active validation form to lock a slot.
                </p>
              </div>

              <div className="bg-white border border-[#E7E7E7] p-6 rounded-2xl shadow-sm mt-8">
                <span className="font-mono text-[9px] text-[#77966D] font-extrabold uppercase block mb-1">CONCIERGE AMBASSADOR DEAN</span>
                <div className="flex items-center space-x-2 text-[#AA4A44] font-serif font-bold text-lg mb-1">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>+91 9220522282</span>
                </div>
                <div className="flex items-center space-x-2 text-[#77966D] font-mono text-[10px]">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>BLK Ansal, D00, Avantika Colony, Shastri Nagar, Ghaziabad, Uttar Pradesh 201002</span>
                </div>
              </div>
            </div>

            {/* Right Form Swapper Component */}
            <div className="lg:col-span-8 bg-white border border-[#E7E7E7] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div className="flex bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E7E7E7] justify-around mb-8 font-mono text-xs font-bold uppercase overflow-x-auto scrollbar-none whitespace-nowrap">
                <button
                  onClick={() => {
                    setTourFormSubmitted(false);
                    setProspectusSubmitted(false);
                    setCallbackSubmitted(false);
                    setApplySubmitted(false);
                  }}
                  id="tab-tour"
                  className="py-2.5 px-4 text-xs tracking-wider text-[#AA4A44] focus:outline-none focus:ring-1 focus:ring-[#AA4A44]/10 rounded-lg text-left"
                >
                  🏫 Book Tour
                </button>
                <button
                  onClick={() => {
                    setTourFormSubmitted(false);
                    setProspectusSubmitted(false);
                    setCallbackSubmitted(false);
                    setApplySubmitted(false);
                  }}
                  id="tab-prospectus"
                  className="py-2.5 px-4 text-xs tracking-wider text-[#77966D] focus:outline-none focus:ring-1 focus:ring-[#77966D]/10 rounded-lg text-left"
                >
                  📖 Get Prospectus
                </button>
                <button
                  onClick={() => {
                    setTourFormSubmitted(false);
                    setProspectusSubmitted(false);
                    setCallbackSubmitted(false);
                    setApplySubmitted(false);
                  }}
                  id="tab-callback"
                  className="py-2.5 px-4 text-xs tracking-wider text-[#AA4A44] focus:outline-none focus:ring-1 focus:ring-[#AA4A44]/10 rounded-lg text-left"
                >
                  📞 Request Call
                </button>
                <button
                  onClick={() => {
                    setTourFormSubmitted(false);
                    setProspectusSubmitted(false);
                    setCallbackSubmitted(false);
                    setApplySubmitted(false);
                  }}
                  id="tab-apply"
                  className="py-2.5 px-4 text-xs tracking-wider text-[#77966D] focus:outline-none focus:ring-1 focus:ring-[#77966D]/10 rounded-lg text-left"
                >
                  📝 Apply Now
                </button>
              </div>

              {/* ACTIVE DYNAMIC FORM */}
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7E7E7]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTourFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  {tourFormSubmitted ? (
                    <div className="text-center py-8 space-y-4 font-sans">
                      <div className="w-12 h-12 rounded-full bg-[#77966D]/15 text-[#77966D] flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6 animate-bounce" />
                      </div>
                      <h4 className="font-serif font-bold text-xl text-[#AA4A44]">Walkthrough Slot Booked</h4>
                      <p className="text-xs text-[#1C1917]/85 max-w-sm mx-auto leading-relaxed">
                        Thank you, <strong>{tourData.name || "Scholar Parent"}</strong>. We have allocated a tentative slot on <strong>{tourData.date || "your requested date"}</strong> for a deep engineering lab, sensory classroom, and swimming unit inspection. A pass is dispatched to <strong>{tourData.email}</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 font-sans text-left">
                      <h4 className="font-serif font-bold text-lg text-[#AA4A44] mb-2">Schedule Admissions Private Tour</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1 font-bold">Parent Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter full name"
                            value={tourData.name}
                            onChange={(e) => setTourData({...tourData, name: e.target.value})}
                            className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs outline-none focus:ring-1 focus:ring-[#AA4A44]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1 font-bold">Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={tourData.phone}
                            onChange={(e) => setTourData({...tourData, phone: e.target.value})}
                            className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs outline-none focus:ring-1 focus:ring-[#AA4A44]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1 font-bold">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="parent@domain.com"
                            value={tourData.email}
                            onChange={(e) => setTourData({...tourData, email: e.target.value})}
                            className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs outline-none focus:ring-1 focus:ring-[#AA4A44]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1 font-bold">Interested Division</label>
                          <select
                            value={tourData.grade}
                            onChange={(e) => setTourData({...tourData, grade: e.target.value})}
                            className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs outline-none focus:ring-1 focus:ring-[#AA4A44]"
                          >
                            <option>Early Years (Pre-K to K)</option>
                            <option>Grade 1 to 5 (PYP)</option>
                            <option>Grade 6 to 10 (MYP)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1 font-bold">Target Private Tour Saturday</label>
                        <input
                          type="date"
                          required
                          value={tourData.date}
                          onChange={(e) => setTourData({...tourData, date: e.target.value})}
                          className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs outline-none focus:ring-1 focus:ring-[#AA4A44]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#AA4A44] text-[#FAF7F2] hover:bg-[#AA4A44]/90 transition text-xs font-semibold uppercase tracking-wider rounded-xl font-mono block text-center"
                      >
                        Confirm Private Walkthrough Saturday Slot
                      </button>
                    </div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15 — FINAL CTA */}
      <section className="py-28 bg-[#1C1917] text-[#FAF7F2] text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[#FAF7F2]/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#77966D] font-bold block mb-4">Inaugural Cohort Admissions Open</span>
          
          <h2 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-8">
            The Future Doesn&apos;t Belong <br className="hidden sm:inline" />
            To Those Who Memorize It.<br />
            <span className="text-[#AA4A44]">It Belongs To Those Who Build It.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <button
              onClick={() => handleCtaClick("tab-tour")}
              className="w-full sm:w-auto px-8 py-4 bg-[#AA4A44] hover:bg-[#AA4A44]/90 text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest transition duration-250 shadow-lg"
            >
              Schedule A Campus Tour
            </button>
            <button
              onClick={() => handleCtaClick("tab-apply")}
              className="w-full sm:w-auto px-8 py-4 border-2 border-white hover:bg-white/10 text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest transition duration-250"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1C1917] text-[#FAF7F2]/80 py-16 border-t border-white/5 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div>
         <div className="mb-6">
  <img
    src="/images/mirai-logo.png"
    alt="Mirai Experiential School"
    className="h-16 w-auto object-contain"
  />
</div>
            <p className="text-xs text-[#FAF7F2]/65 leading-relaxed mb-6 font-sans">
              NCR&apos;s candidate IB school mapping transdisciplinary academic inquiry directly against hands-on robotic capstones, heated ozone aquatics, and elite university portfolio paths.
            </p>
          </div>

          <div>
            <h5 className="font-serif font-semibold text-base text-[#C99996] mb-4">Candidate Curriculum</h5>
            <ul className="space-y-2 text-xs font-mono text-[#FAF7F2]/70">
              <li>• Early Years (Pre-K & K)</li>
              <li>• Primary Years (Grades 1-5)</li>
              <li>• Middle Years (Grades 6-10)</li>
              <li>• Portfolio Development</li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif font-semibold text-base text-[#C99996] mb-4">Unique Frameworks</h5>
            <ul className="space-y-2 text-xs font-mono text-[#FAF7F2]/70">
              <li>• Mirai 4+1 Learning Model</li>
              <li>• Future Fridays™ immersion</li>
              <li>• Stanford Design Thinking</li>
              <li>• Real Prototyping Capstones</li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif font-semibold text-base text-[#C99996] mb-4">Global Registrations</h5>
            <p className="text-xs text-[#FAF7F2]/60 leading-relaxed mb-4 font-sans">
              Mirai Experiential School is an officially registered candidate school for the International Baccalaureate (IB) primary, middle, and diploma years pathways.
            </p>
            <span className="text-[9px] font-mono text-gray-500 block">© 2026 Mirai Experiential School NCR.</span>
          </div>
        </div>
      </footer>

      {/* FLOAT CHAT DRAWER */}
      <AnimatePresence>
        {isAiChatOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end"
            id="ai-concierge-drawer-backdrop"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between"
              id="ai-concierge-drawer"
            >
              
              {/* Drawer Header */}
              <div className="bg-[#AA4A44] p-6 text-white flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Sparkle className="w-5 h-5 text-[#C99996]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg">Admissions Concierge AI</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E7E7E7] block">Ambassador Chatbot</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAiChatOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition animate-pulse"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.role === "user" 
                      ? "bg-[#AA4A44] text-white rounded-br-none" 
                      : "bg-[#FCFAF7] border border-[#E7E7E7] text-[#1C1917] rounded-bl-none shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#E7E7E7] rounded-2xl p-4 text-xs text-gray-500 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AA4A44] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AA4A44] animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AA4A44] animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions */}
              <div className="p-4 bg-[#FCFAF7] border-t border-[#E7E7E7] grid grid-cols-2 gap-2 text-[10px] font-mono text-[#AA4A44] font-bold">
                <button 
                  onClick={() => setChatInput("Tell me outline of Future Fridays framework.")}
                  className="p-2 border border-[#C99996]/30 bg-white hover:bg-[#AA4A44]/5 transition rounded-lg text-left"
                >
                  🏫 Future Fridays Detail
                </button>
                <button 
                  onClick={() => setChatInput("What are sensory classes for Early Years?")}
                  className="p-2 border border-[#C99996]/30 bg-white hover:bg-[#AA4A44]/5 transition rounded-lg text-left"
                >
                  🎨 Early Years Sensories
                </button>
              </div>

              {/* Chat Form */}
              <form onSubmit={handleSendAiMessage} className="p-4 bg-white border-t border-[#E7E7E7] flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask about 4+1, STEM labs, admissions or fees..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow p-3 border border-[#E7E7E7] rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#AA4A44]"
                />
                <button 
                  type="submit"
                  className="p-3 bg-[#AA4A44] text-white hover:bg-[#AA4A44]/90 rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

const ST_LIFE_IMAGES = [
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
];
