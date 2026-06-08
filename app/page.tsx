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

const TRUST_BLOCKS: TrustBlock[] =[
  {
    id: "inquiry",
    title: "Inquiry Based Classrooms",
    category: "SMART LEARNING",
    image: "/images/class-room.webp"
  },

  {
    id: "faculty",
    title: "Expert Faculty",
    category: "EXPERIENCED EDUCATORS",
    image: "/images/Expert.webp"
  },

  {
    id: "communities",
    title: "Small Learning Communities",
    category: "PERSONAL ATTENTION",
    image: "/images/library.webp"
  },

  {
    id: "sports",
    title: "Sports Infrastructure",
    category: "SPORTS & WELLNESS",
    image: "/images/sports.jpg"
  },

  {
    id: "arts",
    title: "Arts & Creativity",
    category: "CREATIVE EXPRESSION",
    image: "/images/Arts.webp"
  },

  {
    id: "dining",
    title: "Healthy Dining",
    category: "STUDENT WELLBEING",
    image: "/images/dining-hall.webp"
  },

  {
    id: "day-boarding",
    title: "Basketball & Tennis Court",
    category: "ACTIVE CAMPUS LIFE",
    image: "/images/Basketball.jpg"
  },

  {
    id: "full-boarding",
    title: "Box Cricket Facility",
    category: "Box Cricket Facility",
    image: "/images/full-boarding.webp"
  }
];

export default function MiraiSchoolWebsite() {
const [phoneError, setPhoneError] = useState("");

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
    src="/images/mirai-logo.webp"
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
{/* SECTION 1 — HERO */}
<section
  id="hero"
  className="relative min-h-screen flex items-center pt-24 pb-24 overflow-hidden bg-[#FAF7F2]"
>
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-[radial-gradient(#AFBFAA_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#C99996]/10 blur-3xl" />
    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#AFBFAA]/10 blur-3xl" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

      {/* LEFT CONTENT */}
      <div className="lg:col-span-7 text-center lg:text-left">

        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#AA4A44]/5 border border-[#AA4A44]/15 rounded-full mb-5">
          <span className="w-2 h-2 rounded-full bg-[#AA4A44] animate-ping" />
          <span className="font-mono text-[10px] text-[#AA4A44] font-extrabold uppercase tracking-widest">
            Ghaziabad • Delhi NCR
          </span>
        </div>

        <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] leading-tight tracking-tight mb-5">
          Preparing Children
          <br />
          <span className="text-[#AA4A44] relative inline-block">
            For The World Ahead
            <span className="absolute left-0 bottom-1 w-full h-[6px] bg-[#77966D]/15 -z-10" />
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#1C1917]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
          An Experiential IB School where students learn to think, build,
          question and create. Designing the builders of the AI Era.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

          <button
            onClick={() => handleCtaClick("tab-tour")}
            className="w-full sm:w-auto px-8 py-4 bg-[#AA4A44] text-white hover:bg-[#AA4A44]/95 transition rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
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
            className="w-full sm:w-auto px-8 py-4 border-2 border-[#1C1917]/20 text-[#1C1917] bg-white/60 hover:bg-[#1C1917]/5 transition rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            id="hero-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Talk to Admissions</span>
          </button>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] aspect-square rounded-[2rem] overflow-hidden border border-[#E7E7E7] shadow-xl bg-white p-2 group">

          <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">

            <Image
              src="/images/campus.webp"
              alt="Mirai Experiential School Campus"
              fill
              priority
              sizes="(max-width:768px) 100vw, 700px"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#AFBFAA] to-transparent opacity-70" />

            {/* Mobile Optimized Campus Card */}
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/92 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl">

              <div className="flex items-center gap-3">

                <div className="p-2 bg-[#AA4A44]/10 rounded-xl">
                  <School className="w-4 h-4 text-[#AA4A44]" />
                </div>

                <div>
                  <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-[#77966D] font-bold">
                    IB WORLD SCHOOL
                  </span>

                  <span className="block font-serif font-bold text-xs sm:text-sm text-[#1C1917]">
                    Future Fridays™ • 4+1 Learning Model
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
  <div className="absolute bottom-0 left-0 right-0 bg-[#AA4A44] py-3 overflow-hidden z-10">
    <div className="flex w-max animate-ticker">

      <div className="flex items-center whitespace-nowrap text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-white">
        <span className="px-6">IB Curriculum</span>
        <span className="px-6">Future Fridays™</span>
        <span className="px-6">Design Thinking</span>
        <span className="px-6">Maker Labs</span>
        <span className="px-6">Day Boarding</span>
        <span className="px-6">Full Boarding</span>
      </div>

      <div className="flex items-center whitespace-nowrap text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-white">
        <span className="px-6">IB Curriculum</span>
        <span className="px-6">Future Fridays™</span>
        <span className="px-6">Design Thinking</span>
        <span className="px-6">Maker Labs</span>
        <span className="px-6">Day Boarding</span>
        <span className="px-6">Full Boarding</span>
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
             A Safe Environment for Learning & Growth
            </h2>
            <p className="text-sm text-[#1C1917]/70 mt-4 leading-relaxed font-sans max-w-xl mx-auto">
             A secure, nurturing campus where children feel confident, supported, and inspired to explore their full potential.
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
                   <span className="font-mono text-[9px] uppercase tracking-widest bg-[#AA4A44] px-2.5 py-1 rounded-full text-white shadow-sm">
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
           <div className="lg:col-span-4">
  <span className="font-mono text-[10px] uppercase text-[#AA4A44] font-extrabold tracking-widest block mb-4">
    IMMEDIATE IMMERSION HOTSPOTS
  </span>

  <div className="space-y-2">
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
      <div
        key={sIdx}
        className="w-full py-3 px-4 rounded-xl border border-[#E7E7E7] bg-white text-[#1C1917]/80 text-xs font-mono font-medium"
      >
        📍 {site}
      </div>
    ))}
  </div>
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
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917] mb-4">Strong IB Academics with Real Understanding</h3>
                  <p className="text-sm text-[#1C1917]/85 leading-relaxed mb-6 font-sans">
                   Structured around deep thinking, interdisciplinary learning, and scientific inquiry. Students develop strong skills in language, mathematics, and science while building the critical thinking and problem-solving abilities expected in an IB classroom.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7E7E7]">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#77966D] block mb-1">01. CONNECTED LEARNING</span>
                      <p className="text-xs text-[#1C1917]/80 leading-relaxed font-sans">Subjects are linked together to help students see the bigger picture.</p>
                    </div>
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7E7E7]">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#77966D] block mb-1">02. DEEP UNDERSTANDING</span>
                      <p className="text-xs text-[#1C1917]/80 leading-relaxed font-sans">Students learn the "why" behind concepts, not just the answers.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E7E7E7]">
                  <Image 
                    src="/images/fourday.webp"
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
                  Guided by experienced entrepreneurs and industry experts, students build, test, and improve real-world projects. They learn by creating solutions, solving challenges, and turning ideas into reality.
                  </p>
                  <div className="grid grid-cols-2 gap-4 font-sans text-xs text-[#1C1917]/85">
                    <div className="p-4 bg-[#AA4A44]/5 border border-[#AA4A44]/10 rounded-2xl">
                      <span className="font-mono font-extrabold uppercase text-[#AA4A44] text-[9px] block mb-1">01. REAL-WORLD LEARNING</span>
                      <span>Explore industries, technologies, and real-life applications.</span>
                    </div>
                    <div className="p-4 bg-[#AA4A44]/5 border border-[#AA4A44]/10 rounded-2xl">
                      <span className="font-mono font-extrabold uppercase text-[#AA4A44] text-[9px] block mb-1">02. MENTORSHIP & PROTOTYPES</span>
                      <span>Create prototypes and develop solutions with mentor support.</span>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E7E7E7]">
                  <Image 
                    src="/images/friday.webp"
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
            <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">FUTURE-READY LEARNING</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#AA4A44] leading-tight">
            Building Skills For The Future
            </h2>
            <p className="text-sm text-[#1C1917]/70 mt-3 leading-relaxed max-w-lg mx-auto">
              Through the IB framework, students develop critical thinking, creativity, communication, research, and problem-solving skills that prepare them for success in higher education and future careers.
            </p>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {[
  {
    role: "Critical Thinker",
    desc: "Students learn to question, analyse, and evaluate information from different perspectives.",
    ibSkill: "Inquiry-Based Learning"
  },
  {
    role: "Effective Communicator",
    desc: "Students build confidence in expressing ideas, presenting solutions, and working with others.",
    ibSkill: "Collaboration & Communication"
  },
  {
    role: "Creative Problem Solver",
    desc: "Students explore challenges, generate ideas, and develop practical solutions.",
    ibSkill: "Design Thinking"
  },
  {
    role: "Independent Researcher",
    desc: "Students learn how to investigate topics, gather evidence, and draw meaningful conclusions.",
    ibSkill: "Research & Inquiry"
  },
  {
    role: "Future-Ready Learner",
    desc: "Students develop adaptability, leadership, and lifelong learning habits for a changing world.",
    ibSkill: "IB Learner Profile"
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
    
    {/* Section Heading */}
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-3">
        STUDENT LEARNING JOURNEY
      </span>

      <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
        Every Age. Every Stage.
      </h2>

      <p className="text-[#1C1917]/70 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
        A carefully designed learning journey that nurtures curiosity,
        confidence, creativity, and critical thinking at every stage.
      </p>

      <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
    </div>

    {/* Learning Journey Timeline */}
    <div className="flex justify-center mb-14">
      <div className="bg-white border border-[#E7E7E7] rounded-full px-6 md:px-10 py-4 shadow-sm">
        <div className="flex items-center gap-3 md:gap-6">

          <div className="text-center">
            <div className="text-xl">🌱</div>
            <div className="text-xs font-bold text-[#77966D] uppercase">
              EYP
            </div>
            <div className="text-[10px] text-[#1C1917]/60">
              Discover
            </div>
          </div>

          <div className="w-10 md:w-16 h-[2px] bg-[#AA4A44]" />

          <div className="text-center">
            <div className="text-xl">🚀</div>
            <div className="text-xs font-bold text-[#AA4A44] uppercase">
              PYP
            </div>
            <div className="text-[10px] text-[#1C1917]/60">
              Explore
            </div>
          </div>

          <div className="w-10 md:w-16 h-[2px] bg-[#AA4A44]" />

          <div className="text-center">
            <div className="text-xl">🔬</div>
            <div className="text-xs font-bold text-[#1C1917] uppercase">
              MYP
            </div>
            <div className="text-[10px] text-[#1C1917]/60">
              Innovate
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* EYP */}
      <div className="group p-8 rounded-[2rem] bg-white border border-[#E7E7E7] hover:border-[#77966D] transition shadow-sm flex flex-col">

      <div className="relative h-56 overflow-hidden rounded-2xl mb-6">
  
  {/* Top Left Label */}
  <div className="absolute top-4 left-4 z-10">
    <span className="px-3 py-1 rounded-full bg-[#AA4A44] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
      EARLY YEARS PROGRAMME (EYP)
    </span>
  </div>

  <Image
    src="/images/eyp.webp"
    alt="Early Years Programme"
    fill
    className="object-cover transition duration-700 group-hover:scale-105"
  />

  {/* Optional Dark Overlay for Better Visibility */}
  <div className="absolute inset-0 bg-black/10" />
</div>

        <span className="font-mono text-[10px] text-[#77966D] font-extrabold uppercase block mb-2">
          Ages 2-5. Toddlers, Nursery to UKG
        </span>

        <h3 className="font-serif font-extrabold text-2xl text-[#1C1917] mb-4">
          Discover
        </h3>

        <p className="text-sm leading-relaxed text-[#1C1917]/75 mb-6">
          Through play, exploration, and inquiry, children develop confidence,
          curiosity, and a love for learning.
        </p>

        <div className="flex flex-wrap gap-2">
          {["Play", "Explore", "Wonder", "Discover"].map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-[#FAF7F2] border border-[#E7E7E7] rounded-full text-xs font-bold text-[#AA4A44]"
            >
              ✓ {t}
            </span>
          ))}
        </div>
      </div>

      {/* PYP */}
      <div className="group p-8 rounded-[2rem] bg-white border border-[#E7E7E7] hover:border-[#77966D] transition shadow-sm flex flex-col">

        <div className="relative h-56 overflow-hidden rounded-2xl mb-6">
            <div className="absolute top-4 left-4 z-10">
    <span className="px-3 py-1 rounded-full bg-[#AA4A44] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
      PRIMARY YEARS PROGRAMME (PYP)
    </span>
  </div>
          <Image
            src="/images/pyp.webp"
            alt="Primary Years Programme"
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        <span className="font-mono text-[10px] text-[#77966D] font-extrabold uppercase block mb-2">
         Ages 6-10 - Grades I to V
        </span>

        <h3 className="font-serif font-extrabold text-2xl text-[#1C1917] mb-4">
          Explore
        </h3>

        <p className="text-sm leading-relaxed text-[#1C1917]/75 mb-6">
          Students investigate real-world ideas through inquiry, collaboration,
          communication, and research.
        </p>

        <div className="flex flex-wrap gap-2">
          {["Inquiry", "Research", "Collaboration", "Communication"].map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-[#FAF7F2] border border-[#E7E7E7] rounded-full text-xs font-bold text-[#AA4A44]"
            >
              ✓ {t}
            </span>
          ))}
        </div>
      </div>

      {/* MYP */}
      <div className="group p-8 rounded-[2rem] bg-white border border-[#E7E7E7] hover:border-[#77966D] transition shadow-sm flex flex-col">

        <div className="relative h-56 overflow-hidden rounded-2xl mb-6">
            <div className="absolute top-4 left-4 z-10">
    <span className="px-3 py-1 rounded-full bg-[#AA4A44] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
       MIDDLE YEARS PROGRAMME (MYP)
    </span>
  </div>
          <Image
            src="/images/myp.webp"
            alt="Middle Years Programme"
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        <span className="font-mono text-[10px] text-[#77966D] font-extrabold uppercase block mb-2">
         Ages 11-15 Grades VI to X

        </span>

        <h3 className="font-serif font-extrabold text-2xl text-[#1C1917] mb-4">
          Innovate
        </h3>

        <p className="text-sm leading-relaxed text-[#1C1917]/75 mb-6">
          Students apply critical thinking, design thinking, and global
          perspectives to solve meaningful challenges.
        </p>

        <div className="flex flex-wrap gap-2">
          {["Critical Thinking", "Design Thinking", "Innovation", "Global Perspectives"].map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-[#FAF7F2] border border-[#E7E7E7] rounded-full text-xs font-bold text-[#AA4A44]"
            >
              ✓ {t}
            </span>
          ))}
        </div>
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
              { id: "science-labs", label: "Early Years Classroom" },
              { id: "sports", label: "Sports Fields" },
              { id: "art-spaces", label: "Play Zone" },
              { id: "dining", label: "Dining Hall" },
              { id: "hostel", label: "Hostel Rooms" },
              { id: "activities", label: "School Corridor" },
              { id: "outdoor", label: "Campus Architecture" }
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
                img: "/images/class-room.webp"
              },
              {
                id: "library",
                title: "Global Scholastic Library",
                desc: "A world-class library where curiosity grows through books, research, and discovery.",
                img: "/images/library.webp"
              },
             
              {
                id: "science-labs",
                title: "Early Years Programme (EYP)",
                desc: "A joyful learning environment where children learn through play, exploration, and inquiry, building confidence, curiosity, and a love for learning.",
                img: "/images/eyp-classroom.webp"
              },
              {
                id: "sports",
                title: "Sports & Activity Facilities",
                desc: "Thoughtfully designed indoor and outdoor spaces that encourage movement, teamwork, confidence, and healthy development at every age.",
                img: "/images/sports.jpg"
              },
              {
                id: "art-spaces",
                title:  "Indoor Play & Activity Zone",
                desc:  "A safe and engaging indoor space where children develop coordination, creativity, confidence, and social skills through active play.",
                img: "/images/Arts.webp"
              },
              {
                id: "dining",
                title: "Nutritional Dining Hall",
                desc: "Bright, thoroughly clean, utilizing automated thermal sanitizer washers and healthy farmer networks.",
                img: "/images/dining-hall.webp"
              },
              {
                id: "hostel",
                title: "Climate Controlled Hostel Suites",
                desc: "Designed with healthy organic mattresses, personal logic study desks, and neat personal lockers.",
                img: "/images/hostel-room.webp"
              },
              {
                id: "activities",
               title: "Modern School Corridors",
                desc: "Bright, spacious, and well-designed corridors that create a safe, welcoming, and organized learning environment.",
                img: "/images/Corridor.webp"
              },
              {
                id: "outdoor",
                title: "Nature-Inspired Campus Design",
                desc: " Designed to encourage exploration, creativity, outdoor learning, and meaningful student interactions.",
                img: "/images/campus.webp"
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
              The Flexibility Stack
            </h2>
            <div className="w-16 h-[3px] bg-[#AA4A44] mx-auto mt-4" />
          </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

  {/* DAY SCHOOL */}
  <div className="bg-white border border-[#E7E7E7] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
    
    <div className="relative aspect-square overflow-hidden">
      <Image
        src="/images/day-school.webp"
        alt="Day School"
        fill
        className="object-cover transition duration-700 hover:scale-105"
      />
    </div>

    <div className="p-8">
      <span className="font-mono text-[9px] uppercase tracking-wider text-[#77966D] font-extrabold block mb-3 bg-[#FAF7F2] py-1 px-3 rounded-full w-fit">
        OPTION A
      </span>

      <h3 className="font-serif font-black text-2xl mb-2 text-[#1C1917]">
        Day School
      </h3>

      <p className="text-xs text-[#1C1917]/75 font-sans leading-relaxed mb-6">
        The foundation of the Mirai experience focused on inquiry-based learning, strong academics, sports, and co-curricular development.
      </p>

      <div className="pt-4 border-t border-[#E7E7E7] text-xs font-mono">
        <span className="block uppercase text-gray-400 mb-1">
          INCLUDES
        </span>

        <span className="font-semibold block text-[#AA4A44] mb-4">
          Core academics, sports activities, breakfast & lunch.
        </span>

        <span className="block uppercase text-gray-400 mb-1">
          TIMING
        </span>

        <span className="font-semibold block">
          08:00 AM – 02:00 PM
        </span>
      </div>
    </div>
  </div>

  {/* DAY BOARDING */}
  <div className="bg-white border-2 border-[#AA4A44] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">

    <div className="relative aspect-square overflow-hidden">
      <Image
        src="/images/day-boarding.webp"
        alt="Day Boarding"
        fill
        className="object-cover transition duration-700 hover:scale-105"
      />
    </div>

    <div className="p-8">
      <span className="font-mono text-[9px] uppercase tracking-wider text-white bg-[#AA4A44] font-extrabold block mb-3 py-1 px-3 rounded-full w-fit">
        MOST POPULAR
      </span>

      <h3 className="font-serif font-black text-2xl mb-2 text-[#AA4A44]">
        Day Boarding
      </h3>

      <p className="text-xs text-[#1C1917]/75 font-sans leading-relaxed mb-6">
        Designed for deeper academic support with supervised activities, homework guidance, and nutritious meals throughout the day.
      </p>

      <div className="pt-4 border-t border-[#E7E7E7] text-xs font-mono">
        <span className="block uppercase text-gray-400 mb-1">
          IDEAL FOR
        </span>

        <span className="font-semibold block text-[#AA4A44] mb-4">
          Working parents seeking extended learning and care.
        </span>

        <span className="block uppercase text-gray-400 mb-1">
          TIMING
        </span>

        <span className="font-semibold block">
          08:00 AM – 05:00 PM
        </span>
      </div>
    </div>
  </div>

  {/* FULL BOARDING */}
  <div className="bg-white border border-[#E7E7E7] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

    <div className="relative aspect-square overflow-hidden">
      <Image
        src="/images/full-boarding1.webp"
        alt="Full Boarding"
        fill
        className="object-cover transition duration-700 hover:scale-105"
      />
    </div>

    <div className="p-8">
      <span className="font-mono text-[9px] uppercase tracking-wider text-[#77966D] font-extrabold block mb-3 bg-[#FAF7F2] py-1 px-3 rounded-full w-fit">
        OPTION C
      </span>

      <h3 className="font-serif font-black text-2xl mb-2 text-[#1C1917]">
        Full Boarding
      </h3>

      <p className="text-xs text-[#1C1917]/75 font-sans leading-relaxed mb-6">
        A complete residential experience with structured academics, life skills, personal growth, and 24-hour care and supervision.
      </p>

      <div className="pt-4 border-t border-[#E7E7E7] text-xs font-mono">
        <span className="block uppercase text-gray-400 mb-1">
          INCLUDES
        </span>

        <span className="font-semibold block text-[#AA4A44] mb-4">
          Residence life, weekend enrichment, life skills & academic support.
        </span>

        <span className="block uppercase text-gray-400 mb-1">
          RESIDENTIAL
        </span>

        <span className="font-semibold block">
          24×7 Campus Residence
        </span>
      </div>
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
                      <h4 className="font-serif font-bold text-lg text-[#AA4A44] mb-2">Book a Campus Visit</h4>
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
  <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1 font-bold">
    Phone Number
  </label>

  <div className="flex">
    <span className="flex items-center px-3 border border-r-0 border-[#E7E7E7] bg-[#FAF7F2] rounded-l text-xs font-semibold">
      +91
    </span>

    <input
      type="tel"
      required
      maxLength={10}
      inputMode="numeric"
      placeholder="9876543210"
      value={tourData.phone}
      onChange={(e) => {
        const rawValue = e.target.value;

        if (/[^0-9]/.test(rawValue)) {
          setPhoneError("Only digits (0-9) are allowed.");
          return;
        }

        setPhoneError("");

        if (rawValue.length <= 10) {
          setTourData({
            ...tourData,
            phone: rawValue,
          });
        }
      }}
      className={`w-full p-2.5 rounded-r border bg-white text-xs outline-none focus:ring-1 ${
        phoneError
          ? "border-red-500 focus:ring-red-500"
          : "border-[#E7E7E7] focus:ring-[#AA4A44]"
      }`}
    />
  </div>

  {phoneError && (
    <p className="mt-1 text-[11px] text-red-500">
      {phoneError}
    </p>
  )}

  {!phoneError &&
    tourData.phone &&
    tourData.phone.length > 0 &&
    tourData.phone.length < 10 && (
      <p className="mt-1 text-[11px] text-red-500">
        Please enter a valid 10-digit mobile number.
      </p>
    )}
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
  <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1 font-bold">
    Target Private Tour Saturday
  </label>

  <input
    type="date"
    required
    min={new Date().toISOString().split("T")[0]}
    value={tourData.date}
    onChange={(e) =>
      setTourData({ ...tourData, date: e.target.value })
    }
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
  

  <div className="flex items-start gap-3">
    <MapPin className="w-5 h-5 text-[#C99996] mt-0.5 flex-shrink-0" />

    <p className="text-xs text-[#FAF7F2]/70 leading-relaxed font-sans">
      Mirai Experiential School<br />
      BLK Ansal, D00,<br />
      Avantika Colony, Shastri Nagar,<br />
      Ghaziabad, Uttar Pradesh 201002
    </p>
  </div>
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
