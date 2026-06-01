"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Beaker,
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
  Dribbble,
  ChevronRight,
  Sparkle,
  Target,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle
} from "lucide-react";
import { SCHOOL_DATA } from "@/lib/schoolData";

const BENTO_BLOCKS = [
  {
    id: "classrooms",
    title: "Spaces Designed For Curiosity",
    category: "WORLD-CLASS CLASSROOMS",
    benefit: "Bright, collaborative classrooms that inspire inquiry, creativity, and meaningful learning.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Interactive learning zones",
      "Technology-enabled teaching",
      "Small-group collaboration",
      "Student-centered environments"
    ],
    className: "lg:col-span-8 md:col-span-12"
  },
  {
    id: "educators",
    title: "Teachers Who Inspire Excellence",
    category: "EXPERT IB EDUCATORS",
    benefit: "Highly qualified educators who guide every child with care, expertise, and global perspectives.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "IB-trained faculty",
      "Continuous professional development",
      "Low teacher-student ratio",
      "Individual attention",
      "Mentorship culture"
    ],
    className: "lg:col-span-4 md:col-span-6"
  },
  {
    id: "labs",
    title: "Learning Beyond Textbooks",
    category: "SCIENCE & INNOVATION LABS",
    benefit: "Hands-on exploration through cutting-edge laboratories and innovation spaces.",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Science Labs",
      "STEM Labs",
      "Maker Spaces",
      "Robotics",
      "Research Projects",
      "Experiment-based learning"
    ],
    className: "lg:col-span-4 md:col-span-6"
  },
  {
    id: "sports",
    title: "Building Champions On And Off The Field",
    category: "SPORTS & ATHLETICS",
    benefit: "Professional sports facilities that develop teamwork, resilience, and confidence.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Football",
      "Basketball",
      "Cricket",
      "Tennis",
      "Athletics",
      "Fitness",
      "Indoor sports"
    ],
    className: "lg:col-span-8 md:col-span-12"
  },
  {
    id: "arts",
    title: "Where Creativity Finds Expression",
    category: "ARTS & CREATIVITY",
    benefit: "A vibrant environment that nurtures imagination, artistic talent, and confidence.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Visual Arts",
      "Music",
      "Drama",
      "Dance",
      "Design",
      "Photography",
      "Creative expression"
    ],
    className: "lg:col-span-4 md:col-span-6"
  },
  {
    id: "boarding",
    title: "A Home Away From Home",
    category: "SAFE & NURTURING BOARDING",
    benefit: "Safe, comfortable, and nurturing boarding designed for growth and independence.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "24x7 supervision",
      "Pastoral care",
      "House parents",
      "Wellness support",
      "Structured routines",
      "Life skills development"
    ],
    className: "lg:col-span-4 md:col-span-6"
  },
  {
    id: "meals",
    title: "Healthy Bodies. Healthy Minds.",
    category: "NUTRITIOUS MEALS",
    benefit: "Fresh, balanced meals carefully planned to support student health and wellbeing.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Nutrition-focused menu",
      "Hygienic kitchens",
      "Balanced diet",
      "Variety of cuisines",
      "Special dietary requirements"
    ],
    className: "lg:col-span-4 md:col-span-12"
  },
  {
    id: "safety",
    title: "Because Nothing Matters More Than Safety",
    category: "SAFETY & SECURITY",
    benefit: "Comprehensive systems designed to ensure a secure and supportive environment.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "CCTV monitoring",
      "Secure campus",
      "Medical support",
      "Emergency protocols",
      "Transport safety",
      "Student wellbeing systems"
    ],
    className: "lg:col-span-7 md:col-span-6"
  },
  {
    id: "green",
    title: "A Campus That Inspires Exploration",
    category: "GREEN CAMPUS",
    benefit: "Beautiful outdoor environments that encourage movement, curiosity, and wellbeing.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Landscaped spaces",
      "Outdoor learning",
      "Environmental awareness",
      "Connection with nature"
    ],
    className: "lg:col-span-5 md:col-span-6"
  },
  {
    id: "holistic",
    title: "Preparing Children For Life",
    category: "HOLISTIC DEVELOPMENT",
    benefit: "A balanced education that develops academics, character, leadership, and confidence.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    bullets: [
      "Leadership",
      "Communication",
      "Critical thinking",
      "Creativity",
      "Collaboration",
      "Emotional intelligence"
    ],
    className: "lg:col-span-12 md:col-span-12"
  }
];

export default function MiraiSchoolWebsite() {
  // Navigation & UI States
  const [expandedTile, setExpandedTile] = useState<number | null>(null);
  const [activeTab, setActiveTab ] = useState<"eyp" | "pyp" | "myp" | "dp">("eyp");
  const [selectedProject, setSelectedProject] = useState(SCHOOL_DATA.studentProjects[0].id);
  const [selectedFridLocation, setSelectedFridLocation] = useState(0);
  const [selectedEnv, setSelectedEnv] = useState(SCHOOL_DATA.learningEnvironments[0].id);
  const [selectedSport, setSelectedSport] = useState(0);
  const [campusMapSpot, setCampusMapSpot] = useState<string | null>("assembly");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>("All");
  const [faqSearchQuery, setFaqSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq_1");

  // Floating AI Chat Box States
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    {
      role: "bot",
      text: "Welcome to Mirai Experiential School. I am your premium AI Admissions Concierge. Ask me anything about our IB curriculum, the 4+1 Learning Model, boarding life, fee structure, or how we guide students to Ivy League university pathways."
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

  const handleCtaClick = (tabId: "tab-tour" | "tab-prospectus" | "tab-callback") => {
    scrollToSection("cta-block");
    setTimeout(() => {
      const tabElement = document.getElementById(tabId);
      if (tabElement) {
        (tabElement as HTMLButtonElement).click();
      }
    }, 400);
  };

  // Scroll active section highlighting (optional helper)
  const [scrolled, setScrolled] = useState(false);
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
      // Map current messages of key text to standard format matching route
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

  // FAQ Filtering
  const faqCategories = ["All", "Admissions & Fees", "Academic Rigor", "Boarding & Pastoral Care", "Campus & Logistics", "Safety & Security", "Co-Curricular & Arts"];
  const filteredFaqs = SCHOOL_DATA.faq.filter((item) => {
    const matchesCategory = selectedFaqCategory === "All" || item.category === selectedFaqCategory;
    const matchesSearch = item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF7F2] text-[#2B2927] min-h-screen selection:bg-[#AA4A44] selection:text-white relative font-sans">
      
      {/* HEADER NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E7E7E7] py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 rounded-full bg-[#AA4A44] flex items-center justify-center text-[#FCFAF7] font-bold text-lg tracking-wider">
              M
            </div>
            <div>
              <span className="font-heading font-bold text-xl uppercase tracking-widest text-[#AA4A44] block">MIRAI</span>
              <span className="text-[10px] uppercase font-mono tracking-widest block text-[#77966D] -mt-1">Experiential School</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex space-x-8 text-sm font-medium">
            <button onClick={() => scrollToSection("why-choose-us")} className="text-[#2B2927] hover:text-[#AA4A44] transition">Why Mirai</button>
            <button onClick={() => scrollToSection("model-4-1")} className="text-[#2B2927] hover:text-[#AA4A44] transition">4+1 Method</button>
            <button onClick={() => scrollToSection("programs")} className="text-[#2B2927] hover:text-[#AA4A44] transition">Programmes</button>
            <button onClick={() => scrollToSection("campus-life")} className="text-[#2B2927] hover:text-[#AA4A44] transition">Campus Life</button>
            <button onClick={() => scrollToSection("faq")} className="text-[#2B2927] hover:text-[#AA4A44] transition">FAQs</button>
            <button onClick={() => scrollToSection("admissions")} className="text-[#2B2927] hover:text-[#AA4A44] transition">Admissions</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                scrollToSection("cta-block");
                const callbackBtn = document.getElementById("tab-tour");
                if (callbackBtn) callbackBtn.click();
              }} 
              className="px-5 py-2.5 rounded-full bg-[#AA4A44] text-white hover:bg-[#AA4A44]/90 transition text-xs font-semibold uppercase tracking-wider"
              id="nav-book-tour-btn"
            >
              Book Tour
            </button>
            <button 
              onClick={() => setIsAiChatOpen(true)}
              className="p-2.5 rounded-full border border-[#C99996]/50 text-[#AA4A44] bg-[#C99996]/10 hover:bg-[#C99996]/20 transition relative"
              title="Admissions Chat"
              id="nav-ai-chat-btn"
            >
              <Sparkles className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 block w-2.5 h-2.5 rounded-full bg-[#77966D]" />
            </button>
          </div>
        </div>
      </header>

      {/* FLOAT CONCIERGE BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="flex items-center space-x-2 bg-[#AA4A44] text-white py-4 px-6 rounded-full shadow-2xl hover:bg-[#AA4A44]/90 transition"
          id="floating-ai-concierge-btn"
        >
          <Sparkle className="w-5 h-5 animate-pulse" />
          <span className="font-semibold text-sm tracking-wide">Ask Admissions AI</span>
        </button>
      </div>

      {/* SECTION 1: HERO */}
      <section id="hero" className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-8 overflow-hidden bg-cover bg-center">
        {/* Ambient Luxurious Backdrop Representation */}
        <div className="absolute inset-0 z-0 bg-[#F4EFEA]">
          {/* Simulated Premium background patterns */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#AA4A44_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C99996]/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#AFBFAA]/20 blur-3xl" />
          
          {/* Animated Background Line representing Waves */}
          <svg className="absolute bottom-0 left-0 w-full opacity-30 h-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,224L120,208C240,192,480,160,720,165.3C960,171,1200,213,1320,234.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" fill="#C99996" fillOpacity="0.3"></path>
          </svg>
        </div>

        {/* Hero Interactive Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex items-center py-4 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#77966D] font-bold block mb-4">
                ✨ GURUGRAM NCR, INDIA
              </span>
              <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-[#AA4A44] leading-[1.1] tracking-tight mb-6">
                {SCHOOL_DATA.tagline}
              </h1>
              <p className="font-sans text-base sm:text-xl text-[#2B2927]/90 max-w-2xl leading-relaxed mb-8">
                {SCHOOL_DATA.subheading}
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => {
                    scrollToSection("cta-block");
                    const tourTab = document.getElementById("tab-tour");
                    if (tourTab) tourTab.click();
                  }}
                  className="px-8 py-4 bg-[#AA4A44] text-white hover:bg-[#AA4A44]/95 transition rounded-full font-semibold uppercase tracking-wider text-xs flex items-center space-x-2"
                  id="hero-book-tour-btn"
                >
                  <span>Book Campus Tour</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image/Visual Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div id="hero-image-wrapper" className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-2xl group bg-[#FAF7F2]">
                <Image 
                  src="https://picsum.photos/seed/miraischool/800/1000"
                  alt="Mirai Experiential School Campus & Interaction"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  referrerPolicy="no-referrer"
                />
                {/* Decorative overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2927]/30 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg flex items-center space-x-3 transition duration-300 group-hover:translate-y-[-4px]">
                  <div className="p-2.5 bg-[#AA4A44]/10 rounded-xl flex items-center justify-center text-[#AA4A44]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-[#77966D] font-bold">Experiential Learning</span>
                    <span className="block font-serif font-bold text-xs text-[#2B2927]">Shaping Tomorrow&apos;s Pioneers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HERO TRUST BAR */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
          <div className="bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#C99996]/30 p-6 rounded-2xl grid grid-cols-2 md:grid-cols-5 gap-6 shadow-md shadow-amber-900/5">
            <div className="border-r border-[#C99996]/20 pr-4 last:border-0">
              <span className="font-mono text-[10px] text-[#77966D] uppercase tracking-wider block mb-1">Curriculum</span>
              <span className="font-serif font-bold text-base text-[#AA4A44] block">IB Pathways</span>
            </div>
            <div className="border-r border-[#C99996]/20 pr-4 last:border-0 md:block hidden">
              <span className="font-mono text-[10px] text-[#77966D] uppercase tracking-wider block mb-1">Grade Structure</span>
              <span className="font-serif font-bold text-base text-[#AA4A44] block">Day School</span>
            </div>
            <div className="border-r border-[#C99996]/20 pr-4 last:border-0">
              <span className="font-mono text-[10px] text-[#77966D] uppercase tracking-wider block mb-1">Residency Options</span>
              <span className="font-serif font-bold text-base text-[#AA4A44] block">Day & Full Boarding</span>
            </div>
            <div className="border-r border-[#C99996]/20 pr-4 last:border-0">
              <span className="font-mono text-[10px] text-[#77966D] uppercase tracking-wider block mb-1">Unique Innovation</span>
              <span className="font-serif font-bold text-base text-[#AA4A44] block">Mirai 4+1 Model</span>
            </div>
            <div className="pr-4 last:border-0">
              <span className="font-mono text-[10px] text-[#77966D] uppercase tracking-wider block mb-1">Experiential Day</span>
              <span className="font-serif font-bold text-base text-[#AA4A44] block">Future Fridays</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY PARENTS CHOOSE MIRAI EXPERIENTIAL SCHOOL */}
      <section id="why-choose-us" className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Title & Subtitle */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#77966D] font-bold block mb-4">
              WHY PARENTS CHOOSE MIRAI EXPERIENTIAL SCHOOL
            </span>
            <h2 className="font-serif font-black text-4xl sm:text-5xl text-[#AA4A44] leading-[1.1] tracking-tight mb-6">
              Why Parents Choose<br />Mirai Experiential School
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#2B2927]/80 max-w-2xl mx-auto leading-relaxed">
              A school is more than academics. It&apos;s the environment where children learn, grow, explore, create, and discover who they become.
            </p>
          </div>

          {/* Premium Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mb-20">
            {BENTO_BLOCKS.map((block, idx) => (
              <div
                key={block.id}
                onClick={() => setExpandedTile(idx)}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-[#E7E7E7]/60 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[16/10] sm:aspect-video lg:aspect-auto lg:h-[400px] bg-[#FAF7F2] ${block.className}`}
              >
                {/* Background Image using Next.js Image component */}
                <div className="absolute inset-0 w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700 ease-out">
                  <Image
                    src={block.image}
                    alt={block.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle dark layout shading for extreme premium typography readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10">
                  {/* Top content row */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-[#FAF7F2]/75 font-semibold bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                      {block.category}
                    </span>
                    <span className="text-[#FAF7F2]/60 font-mono text-xs sm:text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {"// 0" + (idx + 1)}
                    </span>
                  </div>

                  {/* Bottom content block */}
                  <div className="mt-auto">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white leading-snug mb-2 group-hover:text-white/90 transition-colors">
                      {block.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-xl group-hover:text-white transition duration-300 mb-4 font-sans line-clamp-2">
                      {block.benefit}
                    </p>
                    
     
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM TRUST BAR */}
          <div className="border-y border-[#E7E7E7] py-6 mb-16 bg-[#FAF7F2]/50 rounded-2xl md:rounded-full px-6">
            <div className="grid grid-cols-2 md:grid-flow-col gap-4 text-center items-center justify-center font-serif text-[#AA4A44] font-bold text-sm sm:text-base division-bar divide-[#C99996]/30">
              <div className="px-4">500+ Future Leaders</div>
              <div className="px-4 border-l border-[#C99996]/30">World-Class Faculty</div>
              <div className="px-4 border-l border-[#C99996]/30">IB Curriculum</div>
              <div className="px-5 md:block hidden border-l border-[#C99996]/30">Future-Ready Learning</div>
              <div className="px-4 border-l border-[#C99996]/30 sm:block hidden font-serif font-bold">Safe Campus</div>
              <div className="px-4 border-l border-[#C99996]/30 lg:block hidden text-xs font-mono uppercase text-[#77966D] tracking-wider font-bold border-l border-[#C99996]/30">
                Day School | Day Boarding | Full Boarding
              </div>
            </div>
            {/* Mobile fallbacks */}
            <div className="lg:hidden text-center mt-3 font-mono text-[10px] uppercase text-[#77966D] tracking-widest font-bold">
              Day School | Day Boarding | Full Boarding
            </div>
          </div>

          {/* CTA SECTION */}
          <div className="bg-[#FAF7F2] border border-[#E7E7E7] rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center shadow-lg relative overflow-hidden">
            {/* Luxury decorative geometric grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#AA4A44_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-4">
                VISIT THE MIRAI ECOSYSTEM
              </span>
              <h3 className="font-serif font-black text-3xl sm:text-5xl text-[#AA4A44] leading-tight mb-6">
                Come Experience Mirai For Yourself
              </h3>
              <p className="text-sm sm:text-base text-[#2B2927]/85 max-w-lg mx-auto leading-relaxed mb-10">
                Witness our unique 4+1 Learning Model, engage with internationally certified IB mentors, and view our world-class safety & recreation infrastructure.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => handleCtaClick("tab-tour")}
                  className="w-full sm:w-auto px-8 py-4 bg-[#AA4A44] hover:bg-[#AA4A44]/95 text-white transition rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2"
                >
                  <span>Schedule A Campus Tour</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCtaClick("tab-callback")}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-[#AA4A44] hover:bg-[#AA4A44]/5 text-[#AA4A44] bg-transparent transition rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2"
                >
                  <span>Request A Callback</span>
                  <Phone className="w-4 h-4" />
                </button>
    
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Expanded Content Dialog Overlay (Click to Expand Block) */}
        <AnimatePresence>
          {expandedTile !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
              onClick={() => setExpandedTile(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-2xl bg-[#FCFAF7] rounded-[2rem] overflow-hidden shadow-2xl border border-[#E7E7E7]/50 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 text-[#2B2927]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setExpandedTile(null)}
                  className="absolute top-4 right-4 p-2 bg-white/85 hover:bg-white rounded-full text-[#AA4A44] transition shadow-md z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Left/Image */}
                <div className="w-full md:w-1/2 relative aspect-video md:aspect-[3/4] rounded-2xl overflow-hidden shadow-inner shrink-0 leading-none">
                  <Image
                    src={BENTO_BLOCKS[expandedTile].image}
                    alt={BENTO_BLOCKS[expandedTile].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Modal Right/Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#77966D] font-bold block mb-1">
                      {BENTO_BLOCKS[expandedTile].category}
                    </span>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#AA4A44] leading-tight mb-3">
                      {BENTO_BLOCKS[expandedTile].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#2B2927]/90 leading-relaxed mb-6 italic">
                      &ldquo;{BENTO_BLOCKS[expandedTile].benefit}&rdquo;
                    </p>
                    
                    <div className="space-y-2 mb-8">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#AA4A44] font-bold mb-2">Extended Features</span>
                      {BENTO_BLOCKS[expandedTile].bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start text-xs text-[#2B2927]/80">
                          <span className="mr-2 text-[#77966D] font-bold">✓</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setExpandedTile(null);
                        handleCtaClick("tab-tour");
                      }}
                      className="flex-1 py-3 px-4 bg-[#AA4A44] hover:bg-[#AA4A44]/90 text-white rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition text-center"
                    >
                      Book Tour
                    </button>
                    <button
                      onClick={() => {
                        setExpandedTile(null);
                        handleCtaClick("tab-callback");
                      }}
                      className="flex-1 py-3 px-4 border border-[#AA4A44]/30 hover:border-[#AA4A44] text-[#AA4A44] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition text-center bg-transparent"
                    >
                      Request Call
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 3: THE MIRAI 4+1 MODEL */}
      <section id="model-4-1" className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-16">
            <div className="lg:col-span-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">PEDAGOGICAL INNOVATION</span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
                The Mirai 4+1 Learning Model
              </h2>
              <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-[#AA4A44] text-white p-6 rounded-2xl">
                <span className="font-mono text-[10px] uppercase tracking-widest block text-[#FAF7F2] mb-1">Aesthetic Standard</span>
                <span className="text-3xl font-black block">80% Academic</span>
                <span className="text-lg text-[#C99996] font-medium block">20% Real-World Field Action</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg text-[#2B2927]/85 max-w-4xl mb-16">
            <p className="leading-relaxed">
              {SCHOOL_DATA.fourPlusOneModel.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="px-3 py-1 bg-[#AFBFAA]/20 text-[#77966D] text-xs font-semibold rounded-full border border-[#AFBFAA]/40">Harvard FIELD Method</span>
              <span className="px-3 py-1 bg-[#AFBFAA]/20 text-[#77966D] text-xs font-semibold rounded-full border border-[#AFBFAA]/40">Google 20% Innovation Model</span>
              <span className="px-3 py-1 bg-[#AFBFAA]/20 text-[#77966D] text-xs font-semibold rounded-full border border-[#AFBFAA]/40">IB Inquiry Framework</span>
            </div>
          </div>

          {/* LARGE TIMELINE VISUALIZATION */}
          <div className="bg-[#FCFAF7] border border-[#E7E7E7] p-8 rounded-3xl">
            <h3 className="font-serif font-bold text-2xl text-[#AA4A44] mb-8 text-center">Inside the Mirai Week Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {SCHOOL_DATA.fourPlusOneModel.timeline.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 rounded-2xl border transition duration-300 ${
                    item.day.includes("Friday") 
                    ? "bg-[#AA4A44] text-white border-[#AA4A44]" 
                    : "bg-[#FAF7F2] text-[#2B2927] border-[#E7E7E7]"
                  }`}
                >
                  <div className={`font-mono text-xs font-bold uppercase tracking-wider mb-2 ${item.day.includes("Friday") ? "text-[#C99996]" : "text-[#77966D]"}`}>
                    {item.day}
                  </div>
                  <h4 className="font-serif font-bold text-lg mb-3">
                    {item.title}
                  </h4>
                  <p className={`text-xs leading-relaxed mb-4 ${item.day.includes("Friday") ? "text-[#FAF7F2]/90" : "text-[#2B2927]/80"}`}>
                    {item.description}
                  </p>
                  <div className={`pt-3 border-t mt-auto ${item.day.includes("Friday") ? "border-[#C99996]/30 text-[#C99996]" : "border-[#E7E7E7]/70 text-[#77966D]"} text-xs`}>
                    <span className="font-bold block uppercase text-[9px] mb-1">Primary Focus</span>
                    <span className="italic block mb-2">{item.focus}</span>
                    <span className="font-bold block uppercase text-[9px] mb-1">Expected Milestone</span>
                    <span className="block font-medium">{item.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY IB? */}
      <section id="why-ib" className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">CURRICULAR RIGOR</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44]/95 leading-tight">
              International Baccalaureate vs Traditional Schooling
            </h2>
            <div className="w-20 h-1 bg-[#C99996] mt-4" />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E7E7E7]">
            <table className="w-full text-left border-collapse bg-[#FAF7F2]">
              <thead>
                <tr className="bg-[#AA4A44] text-white">
                  <th className="p-6 font-serif font-semibold text-lg max-w-[200px]">Strategic Dimension</th>
                  <th className="p-6 font-serif font-semibold text-lg">Mirai International IB Approach</th>
                  <th className="p-6 font-serif font-semibold text-lg">Traditional National Boards</th>
                  <th className="p-6 font-mono text-xs uppercase tracking-widest text-[#E7E7E7]">Tangible Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E7E7]">
                {SCHOOL_DATA.whyIB.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FCFAF7] transition">
                    <td className="p-6 font-serif font-bold text-[#AA4A44]">{row.dimension}</td>
                    <td className="p-6 text-sm text-[#2B2927]/90 leading-relaxed">{row.ibApproach}</td>
                    <td className="p-6 text-sm text-[#2B2927]/70 leading-relaxed bg-[#FCFAF7]/50">{row.traditionalApproach}</td>
                    <td className="p-6 text-sm font-semibold text-[#77966D] font-sans">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: FUTURE FRIDAYS */}
      <section className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">THE SIGNATURE PROGRAMME</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              Future Fridays: Action Out Of Classroom
            </h2>
            <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
            <p className="mt-6 text-[#2B2927]/85 text-base leading-relaxed">
              {SCHOOL_DATA.futureFridays.description}
            </p>
          </div>

          {/* INTERACTIVE FACILITIES NAV */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              {SCHOOL_DATA.futureFridays.locations.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFridLocation(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition duration-300 flex items-center justify-between ${
                    selectedFridLocation === idx 
                    ? "bg-[#AA4A44] text-white border-[#AA4A44] shadow-md" 
                    : "bg-[#FCFAF7] text-[#2B2927] border-[#E7E7E7] hover:border-[#C99996]"
                  }`}
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest block opacity-75 mb-1">MEMBER PARTNER 0{idx+1}</span>
                    <span className="font-serif font-bold text-base block">{loc.facility}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-4 shrink-0" />
                </button>
              ))}
            </div>

            <div className="lg:col-span-2 bg-[#FCFAF7] border border-[#E7E7E7] p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#77966D] font-bold block mb-2">ACTIVE ENVIRONMENT UNDER INVESTIGATION</span>
                <h3 className="font-serif font-black text-2xl text-[#AA4A44] mb-6">
                  {SCHOOL_DATA.futureFridays.locations[selectedFridLocation].facility}
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-1">Exploratory Task</h5>
                    <p className="text-[#2B2927]/90 leading-relaxed text-sm">
                      {SCHOOL_DATA.futureFridays.locations[selectedFridLocation].activity}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-1">Inherent Curricular Link</h5>
                    <p className="text-[#2B2927]/90 leading-relaxed text-sm italic">
                      {SCHOOL_DATA.futureFridays.locations[selectedFridLocation].benefit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#E7E7E7] bg-[#AA4A44]/5 p-6 rounded-2xl">
                <h5 className="font-mono text-xs uppercase tracking-widest text-[#AA4A44] font-bold block mb-1">📊 STUDENT-DESIGNED OUTCOME</h5>
                <p className="text-sm font-semibold text-[#77966D] tracking-tight">
                  {SCHOOL_DATA.futureFridays.locations[selectedFridLocation].outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: REAL STUDENT PROJECTS & CASE STUDIES */}
      <section className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">INTELLECTUAL OUTCOMES</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              Real Student Project Showcase
            </h2>
            <div className="w-20 h-1 bg-[#C99996] mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              {SCHOOL_DATA.studentProjects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition duration-300 block ${
                    selectedProject === proj.id 
                    ? "bg-[#FAF7F2] border-[#AA4A44] shadow-md shadow-red-950/5" 
                    : "bg-[#FCFAF7] border-[#E7E7E7] hover:border-[#C99996]"
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#77966D] block mb-2">{proj.program}</span>
                  <h4 className="font-serif font-bold text-base text-[#AA4A44] line-clamp-2">{proj.name}</h4>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-[#FAF7F2] border border-[#E7E7E7] rounded-3xl p-8 flex flex-col md:flex-row gap-8">
              {/* Left Column Text Details */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 bg-[#AA4A44]/10 text-[#AA4A44] text-[10px] font-mono font-bold uppercase rounded-full mb-4 inline-block">
                    {SCHOOL_DATA.studentProjects.find(p => p.id === selectedProject)?.program}
                  </span>
                  
                  <h4 className="font-serif font-bold text-2xl text-[#AA4A44] mb-6">
                    {SCHOOL_DATA.studentProjects.find(p => p.id === selectedProject)?.name}
                  </h4>

                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-1">Problem Diagnosed</span>
                      <p className="text-[#2B2927]/85 leading-relaxed">
                        {SCHOOL_DATA.studentProjects.find(p => p.id === selectedProject)?.problem}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-1">Involved Industry Mentor</span>
                      <p className="text-[#2B2927]/90 font-medium">
                        {SCHOOL_DATA.studentProjects.find(p => p.id === selectedProject)?.mentor}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-1">Delivered Solution Outcomes</span>
                      <p className="text-[#2B2927]/90 bg-white/60 p-4 rounded-xl border border-[#E7E7E7]">
                        {SCHOOL_DATA.studentProjects.find(p => p.id === selectedProject)?.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E7E7E7] flex flex-wrap gap-2">
                  {SCHOOL_DATA.studentProjects.find(p => p.id === selectedProject)?.skills.map((skill, idx) => (
                    <span key={idx} className="bg-[#AFBFAA]/10 border border-[#AFBFAA]/30 text-[#77966D] text-xs font-mono font-medium py-1 px-2.5 rounded">
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column Thumbnail representation */}
              <div className="w-full md:w-64 flex-shrink-0 flex items-center justify-center">
                <div className="relative w-full h-48 md:h-full min-h-[220px] rounded-2xl overflow-hidden bg-cover bg-center border border-[#E7E7E7]" style={{ backgroundImage: `url(${SCHOOL_DATA.studentProjects.find(p => p.id === selectedProject)?.image})` }}>
                  <div className="absolute inset-0 bg-[#AA4A44]/10 mix-blend-multiply" />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-sm p-4 rounded-xl border border-[#E7E7E7] text-center">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#77966D] font-bold block">Source Verified</span>
                    <span className="font-serif text-xs font-bold text-[#AA4A44]">Mirai Capstone Archive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PROGRAMMES ACCORDION / TABS */}
      <section id="programs" className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">CURRICULAR MATRIX</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              Academic Program Pathways & Frameworks
            </h2>
            <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
          </div>

          <div className="flex border-b border-[#E7E7E7]/80 justify-around max-w-2xl mx-auto mb-12">
            {SCHOOL_DATA.programmes.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id as any)}
                className={`py-4 px-6 text-sm font-bold tracking-wider uppercase border-b-2 transition duration-300 ${
                  activeTab === p.id 
                  ? "border-[#AA4A44] text-[#AA4A44]" 
                  : "border-transparent text-[#2B2927]/60 hover:text-[#AA4A44]"
                }`}
              >
                {p.id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* TRANSITION TAB PANEL */}
          <div className="bg-[#FCFAF7] border border-[#E7E7E7] rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold block mb-1">ACADEMIC SPHERE</span>
                <h3 className="font-serif font-black text-3xl text-[#AA4A44] mb-3">
                  {SCHOOL_DATA.programmes.find(p => p.id === activeTab)?.title}
                </h3>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#AFBFAA]/20 border border-[#AFBFAA]/40 text-[#5C7554] rounded-full inline-block mb-6">
                  📍 Target age range: {SCHOOL_DATA.programmes.find(p => p.id === activeTab)?.age}
                </span>

                <div className="prose text-sm text-[#2B2927]/90 leading-relaxed mb-8">
                  <h4 className="font-serif text-lg font-bold text-[#AA4A44] mb-2">Framework & Philosophy</h4>
                  <p>{SCHOOL_DATA.programmes.find(p => p.id === activeTab)?.curriculum}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold mb-3">Handled Core Skills</h5>
                    <ul className="space-y-2">
                      {SCHOOL_DATA.programmes.find(p => p.id === activeTab)?.skills.map((skill, idx) => (
                        <li key={idx} className="text-xs text-[#2B2927]/85 flex items-start">
                          <Check className="w-3.5 h-3.5 text-[#AA4A44] mr-2 shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold mb-3">Sensory Activities</h5>
                    <ul className="space-y-2">
                      {SCHOOL_DATA.programmes.find(p => p.id === activeTab)?.activities.map((act, idx) => (
                        <li key={idx} className="text-xs text-[#2B2927]/85 flex items-start">
                          <Sparkle className="w-3 h-3 text-[#77966D] mr-2 shrink-0 mt-1" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#FAF7F2] p-8 rounded-2xl border border-[#E7E7E7] flex flex-col justify-between">
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-widest text-[#AA4A44] font-bold mb-4">🏆 INTELLECTUAL MILESTONE</h5>
                  <p className="text-sm font-serif font-bold text-[#2B2927]/90 leading-relaxed italic">
                    &quot;{SCHOOL_DATA.programmes.find(p => p.id === activeTab)?.outcomes}&quot;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E7E7E7]">
                  <span className="font-mono text-[10px] text-[#77966D] uppercase block mb-2">READY FOR ADMISSION?</span>
                  <button 
                    onClick={() => {
                      scrollToSection("cta-block");
                      const appTab = document.getElementById("tab-apply");
                      if (appTab) appTab.click();
                    }}
                    className="w-full py-3 bg-[#AA4A44] text-white hover:bg-[#AA4A44]/90 transition text-xs font-semibold uppercase tracking-wider rounded-xl block text-center"
                  >
                    Initiate Evaluation Process
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: THE MIRAI JOURNEY */}
      <section className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">GROWTH MILESTONES</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              The Strategic Mirai Journey
            </h2>
            <div className="w-20 h-1 bg-[#C99996] mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {SCHOOL_DATA.miraiJourney.map((stageArr, idx) => (
              <div key={idx} className="bg-[#FAF7F2] p-8 rounded-2xl border border-[#E7E7E7] relative">
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#AA4A44]/10 text-[#AA4A44] flex items-center justify-center font-serif text-sm font-bold">
                  {idx + 1}
                </div>
                <span className="font-mono text-xs text-[#77966D] uppercase tracking-wider block mb-1">STAGE</span>
                <h3 className="font-serif font-black text-2xl text-[#AA4A44] mb-2">{stageArr.stage}</h3>
                <span className="font-mono text-[10px] font-bold bg-[#77966D]/15 text-[#5C7554] py-0.5 px-2 rounded inline-block mb-4">{stageArr.focus}</span>
                <p className="text-xs text-[#2B2927]/80 leading-relaxed mb-6">{stageArr.description}</p>
                
                <div className="pt-4 border-t border-[#E7E7E7] bg-white p-4 rounded-xl">
                  <span className="text-[9px] uppercase tracking-wider text-[#AA4A44] font-bold block mb-1">Key Milestone achieved</span>
                  <p className="text-xs font-semibold text-[#2B2927]">{stageArr.milestone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: WORLD-CLASS FACULTY */}
      <section className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16 items-center">
            <div className="lg:col-span-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">EDUCATIONAL LEADERS</span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
                Our World-Class Advisory Faculty
              </h2>
              <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-[#77966D] text-[#FAF7F2] p-6 rounded-2xl border border-[#AFBFAA]/40">
                <span className="font-mono text-[9px] uppercase tracking-widest block text-[#FAF7F2]/80 mb-1">INDIVIDUAL SUPERVISION</span>
                <p className="text-lg font-bold mb-2">1:8 Scholar Ratio</p>
                <p className="text-xs text-[#FAF7F2]/90 leading-relaxed">
                  {SCHOOL_DATA.faculty.development}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SCHOOL_DATA.faculty.profiles.map((fac) => (
              <div key={fac.id} className="bg-[#FCFAF7] border border-[#E7E7E7] rounded-3xl p-8 flex flex-col justify-between group hover:border-[#AA4A44]/30 transition duration-300">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#C99996]/20 text-[#AA4A44] flex items-center justify-center font-bold font-serif text-lg">
                      {fac.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#AA4A44] group-hover:text-[#AA4A44]/90 transition">{fac.name}</h4>
                      <p className="font-mono text-xs text-[#77966D]">{fac.role}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs leading-relaxed mb-6">
                    <div>
                      <span className="uppercase font-mono text-[9px] text-[#77966D] block font-bold">Academic Background</span>
                      <p className="text-[#2B2927]/90">{fac.qualifications}</p>
                    </div>
                    <div>
                      <span className="uppercase font-mono text-[9px] text-[#77966D] block font-bold">Global Tenure</span>
                      <p className="text-[#2B2927]/90">{fac.experience}</p>
                    </div>
                    <div>
                      <span className="uppercase font-mono text-[9px] text-[#77966D] block font-bold">IB Speciality Certification</span>
                      <p className="text-[#2B2927]/90 font-semibold">{fac.ibCertifications}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E7E7E7] bg-white/60 p-4 rounded-xl">
                  <span className="uppercase font-mono text-[8px] text-[#AA4A44] block font-bold mb-1">Advisory Mantra</span>
                  <p className="text-xs text-[#2B2927]/80 italic">&quot;{fac.philosophy}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: LEARNING ENVIRONMENTS */}
      <section className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">SCIENTIFIC INFRASTRUCTURE</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              Advanced Research & Visual Studios
            </h2>
            <div className="w-20 h-1 bg-[#C99996] mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCHOOL_DATA.learningEnvironments.map((env) => (
                <button
                  key={env.id}
                  onClick={() => setSelectedEnv(env.id)}
                  className={`p-5 rounded-2xl border text-left transition duration-300 ${
                    selectedEnv === env.id 
                    ? "bg-[#AA4A44] text-white border-[#AA4A44] shadow-md shadow-amber-950/5" 
                    : "bg-[#FAF7F2] border-[#E7E7E7] text-[#2B2927] hover:border-[#C99996]"
                  }`}
                >
                  <span className="font-mono text-[10px] block mb-1 uppercase opacity-75">FACILITY</span>
                  <h4 className="font-serif font-bold text-sm tracking-tight">{env.name}</h4>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E7E7E7] p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#77966D] font-bold block mb-2">STUDIO ARCHITECTURE</span>
                <h3 className="font-serif font-black text-2xl text-[#AA4A44] mb-3">
                  {SCHOOL_DATA.learningEnvironments.find(e => e.id === selectedEnv)?.name}
                </h3>
                <p className="text-sm text-[#2B2927]/90 leading-relaxed mb-6">
                  {SCHOOL_DATA.learningEnvironments.find(e => e.id === selectedEnv)?.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E7E7E7]">
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold mb-2">Designed Cognitive Benefit</h5>
                    <p className="text-xs text-[#2B2927]/80 leading-relaxed">
                      {SCHOOL_DATA.learningEnvironments.find(e => e.id === selectedEnv)?.benefits}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold mb-2">Real Outcomes Observed</h5>
                    <p className="text-xs text-[#2B2927]/80 leading-relaxed">
                      {SCHOOL_DATA.learningEnvironments.find(e => e.id === selectedEnv)?.outcomes}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#77966D]/10 border border-[#77966D]/30 rounded-xl text-center">
                <span className="font-mono text-xs font-semibold text-[#5C7554]">
                  ⭐ Air filtered to PM2.5 &lt; 15 continuously via advanced HEPA multi-stage filtration.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: SPORTS & WELLNESS */}
      <section className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">BIO-MECHANICAL FITNESS</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              Athletic Fields & Mind Shala Focus
            </h2>
            <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
            <p className="mt-4 text-[#2B2927]/85 text-base italic">{SCHOOL_DATA.sportsWellness.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-3">
              {SCHOOL_DATA.sportsWellness.activities.map((sport, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSport(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition duration-300 block ${
                    selectedSport === idx 
                    ? "bg-[#AA4A44] text-white border-[#AA4A44]" 
                    : "bg-[#FCFAF7] border-[#E7E7E7] text-[#2B2927] hover:border-[#C99996]"
                  }`}
                >
                  <h4 className="font-serif font-bold text-base">{sport.name}</h4>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-[#FCFAF7] border border-[#E7E7E7] p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#77966D] font-bold block mb-2">ACTIVE ARENA DETAILS</span>
                <h3 className="font-serif font-black text-2xl text-[#AA4A44] mb-3">
                  {SCHOOL_DATA.sportsWellness.activities[selectedSport].name}
                </h3>
                <p className="text-sm text-[#2B2927]/80 leading-relaxed mb-6">
                  {SCHOOL_DATA.sportsWellness.activities[selectedSport].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7E7E7]">
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold mb-1">Physical benefits</h5>
                    <p className="text-xs text-[#2B2927]/85 leading-relaxed">
                      {SCHOOL_DATA.sportsWellness.activities[selectedSport].benefits}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold mb-1">Championship Outlets</h5>
                    <p className="text-xs text-[#2B2927]/85 leading-relaxed font-semibold">
                      {SCHOOL_DATA.sportsWellness.activities[selectedSport].outcome}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E7E7E7] text-xs font-mono text-[#77966D] flex justify-between">
                <span>MIRAI ATHLETIC STANDARD</span>
                <span>🔥 COMPULSORY STRENGTH LOCKS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12 & 13: CREATIVE ARTS & CO-CURRICULARS BENTO GRID */}
      <section className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">CREATIVE EXPLORATION</span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
                Fine Arts & Cinematography
              </h2>
              <div className="w-20 h-1 bg-[#C99996] mt-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {SCHOOL_DATA.artsCreativity.map((art, idx) => (
                  <div key={idx} className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7E7E7]">
                    <h4 className="font-serif font-bold text-base text-[#AA4A44] mb-2">{art.name}</h4>
                    <p className="text-xs text-[#2B2927]/80 leading-relaxed mb-3">{art.description}</p>
                    <span className="text-[10px] font-mono font-semibold text-[#77966D] block">🧠 Benefit: {art.benefits}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">CO-CURRICULAR ASSOCIATIONS</span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
                Student-Initiated Research Guilds
              </h2>
              <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {SCHOOL_DATA.coCurricular.map((cc, idx) => (
                  <div key={idx} className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7E7E7]">
                    <h4 className="font-serif font-bold text-base text-[#AA4A44] mb-2">{cc.name}</h4>
                    <p className="text-xs text-[#2B2927]/80 leading-relaxed mb-3">{cc.description}</p>
                    <span className="text-[10px] font-mono font-semibold text-[#77966D] block">💡 Scope: {cc.benefits}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: RESIDENTIAL BOARDING EXPERIENCE */}
      <section className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">PASTORAL STEWARDSHIP</span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
                Mirai Boarding Life & Community
              </h2>
              <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
              <p className="mt-6 text-[#2B2927]/85 text-base leading-relaxed">
                {SCHOOL_DATA.boarding.description}
              </p>
            </div>
            <div className="lg:col-span-4 bg-[#AA4A44] text-[#FAF7F2] p-6 rounded-2xl border border-[#C99996]/30">
              <span className="font-mono text-[9px] uppercase block mb-1">SUITE SPECIFICATIONS</span>
              <p className="text-sm font-semibold mb-3">{SCHOOL_DATA.boarding.housing}</p>
              <span className="font-mono text-[9px] uppercase block mb-1">DIETARY CODES</span>
              <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">{SCHOOL_DATA.boarding.dining}</p>
            </div>
          </div>

          <h3 className="font-serif font-bold text-2xl text-[#AA4A44] text-center mb-8">Boarder&apos;s Precise Daily Routine</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {SCHOOL_DATA.boarding.routine.map((sch, idx) => (
              <div key={idx} className="bg-[#FCFAF7] border border-[#E7E7E7] p-5 rounded-2xl flex flex-col justify-between">
                <span className="font-mono text-xs font-bold text-[#AA4A44] block mb-2">{sch.time}</span>
                <p className="text-xs text-[#2B2927]/90 leading-relaxed font-semibold">{sch.task}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: CAMPUS EXPERIENCE & MAP HOTSPOTS */}
      <section id="campus-life" className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">VIRTUAL EXPLORATION</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              Interactive Campus Architecture Map
            </h2>
            <div className="w-20 h-1 bg-[#C99996] mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Hotspots representation */}
            <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E7E7E7] rounded-3xl p-6 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-grid-red-500 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
              
              <div>
                <span className="font-mono text-[10px] text-[#77966D] font-bold uppercase block mb-1">CAMPUS BLUEPRINT SELECTOR</span>
                <h4 className="font-serif font-bold text-lg text-[#2B2927] mb-6">Click standard areas below to review detailed spatial specifications:</h4>

                <div className="grid grid-cols-2 gap-3 max-w-md relative z-10">
                  <button 
                    onClick={() => setCampusMapSpot("assembly")}
                    className={`py-3 px-4 rounded-xl border text-xs font-mono font-medium text-left transition ${
                      campusMapSpot === "assembly" ? "bg-[#AA4A44] text-white border-[#AA4A44]" : "bg-white border-[#E7E7E7] hover:border-[#C99996]"
                    }`}
                  >
                    📍 Central Quad & Assembly
                  </button>
                  <button 
                    onClick={() => setCampusMapSpot("aquatic")}
                    className={`py-3 px-4 rounded-xl border text-xs font-mono font-medium text-left transition ${
                      campusMapSpot === "aquatic" ? "bg-[#AA4A44] text-white border-[#AA4A44]" : "bg-white border-[#E7E7E7] hover:border-[#C99996]"
                    }`}
                  >
                    📍 Ozone Aquatic Arena
                  </button>
                  <button 
                    onClick={() => setCampusMapSpot("makerspace")}
                    className={`py-3 px-4 rounded-xl border text-xs font-mono font-medium text-left transition ${
                      campusMapSpot === "makerspace" ? "bg-[#AA4A44] text-white border-[#AA4A44]" : "bg-white border-[#E7E7E7] hover:border-[#C99996]"
                    }`}
                  >
                    📍 Copernicus Science Hub
                  </button>
                  <button 
                    onClick={() => setCampusMapSpot("hepa")}
                    className={`py-3 px-4 rounded-xl border text-xs font-mono font-medium text-left transition ${
                      campusMapSpot === "hepa" ? "bg-[#AA4A44] text-white border-[#AA4A44]" : "bg-white border-[#E7E7E7] hover:border-[#C99996]"
                    }`}
                  >
                    📍 Air Safety Isolation Plant
                  </button>
                </div>
              </div>

              {/* Decorative Vector Floor Layout Map simulation */}
              <div className="border border-[#E7E7E7] bg-white p-4 rounded-2xl mt-8">
                <span className="font-mono text-[9px] uppercase text-[#77966D] block mb-2">Dynamic Vector Blueprint Representation</span>
                <div className="h-24 bg-[#E7E7E7]/30 rounded-xl relative overflow-hidden flex items-center justify-center border-dashed border-2 border-[#C99996]/50">
                  <span className="text-[10px] font-mono text-[#77966D] uppercase">Spatial Coordinates NCR BLOCK-C</span>
                  <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-[#AA4A44]/60 animate-ping" />
                  <div className="absolute bottom-4 right-10 w-2.5 h-2.5 rounded-full bg-[#77966D]" />
                </div>
              </div>
            </div>

            {/* Hotspot details panel */}
            <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#E7E7E7] p-8 rounded-3xl h-full flex flex-col justify-between">
              {campusMapSpot === "assembly" && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] block mb-2">CAMPUS ZONE A</span>
                  <h3 className="font-serif font-black text-2xl text-[#AA4A44] mb-4">Central Amphitheater & Assembly</h3>
                  <p className="text-sm text-[#2B2927]/85 leading-relaxed">
                    Designed as an open-air Greek-style stone circle facing our historical water step-well restoration project. Accommodates all 600 scholars for daily philosophical assemblies, student project pitches, and Shakespearean theatrical showcases.
                  </p>
                  <ul className="mt-6 space-y-2 text-xs text-[#2B2927]/90 font-medium">
                    <li>• Structural Acoustics matched for clear non-amplified human speech.</li>
                    <li>• Natural shading provided by custom mature broad-leaf neem trees.</li>
                  </ul>
                </div>
              )}

              {campusMapSpot === "aquatic" && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] block mb-2">CAMPUS ZONE B</span>
                  <h3 className="font-serif font-black text-2xl text-[#AA4A44] mb-4">Ozone Heated Aquatic Center</h3>
                  <p className="text-sm text-[#2B2927]/85 leading-relaxed">
                    A gorgeous indoor six-lane heated athletic swimming pool that completely avoids standard harsh chlorine chemicals, utilizing an advanced multi-stage automated gas ozone sanitization circuit. Safe for pediatric asthmatics and allergy-prone scholars.
                  </p>
                  <ul className="mt-6 space-y-2 text-xs text-[#2B2927]/90 font-medium">
                    <li>• Uniform temperature locked continuously to 28°C.</li>
                    <li>• Continuous safety supervision with biometric motion-monitoring under-water telemetry.</li>
                  </ul>
                </div>
              )}

              {campusMapSpot === "makerspace" && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] block mb-2">CAMPUS ZONE C</span>
                  <h3 className="font-serif font-black text-2xl text-[#AA4A44] mb-4">Copernicus Science & IoT Hub</h3>
                  <p className="text-sm text-[#2B2927]/85 leading-relaxed">
                    The focal point of our Friday exploration projects. Features dual-axis plastic extruders, high-speed circuit pick-and-place nodes, high-accuracy microscopes, and professional mechanical testing weights where students break materials to test calculations.
                  </p>
                  <ul className="mt-6 space-y-2 text-xs text-[#2B2927]/90 font-medium">
                    <li>• Direct licensing connections with IIT haptic and civil research divisions.</li>
                    <li>• 12 double-screen high-compute CAD design bays available to middle schoolers.</li>
                  </ul>
                </div>
              )}

              {campusMapSpot === "hepa" && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#77966D] block mb-2">CAMPUS ENVIRONMENT</span>
                  <h3 className="font-serif font-black text-2xl text-[#AA4A44] mb-4">Centrilized HVAC & HEPA-13 Plant</h3>
                  <p className="text-sm text-[#2B2927]/85 leading-relaxed">
                    Protecting children from seasonal Northern India atmospheric pollution. The entire campus interior structure is double-insulated with heavy neoprene seals. Air is run through dedicated, large-scale commercial multi-stage filters that lock out 99.97% of fine particulates.
                  </p>
                  <ul className="mt-6 space-y-2 text-xs text-[#2B2927]/90 font-medium">
                    <li>• PM2.5 metrics consistently locked below 15 inside the school.</li>
                    <li>• Live PM2.5 monitoring dashboard in every science room.</li>
                  </ul>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-[#E7E7E7] text-xs font-mono text-[#77966D]">
                <span>MIRAI NCR CAMPUS ARCHITECTS • WALDORF INSPIRED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 16: UNIVERSITY PATHWAYS */}
      <section className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">GLOBAL SUCCESS</span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
                Global University Placement Pathways
              </h2>
              <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
              <p className="mt-6 text-[#2B2927]/85 text-base leading-relaxed">
                {SCHOOL_DATA.universityPathways.overview}
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {SCHOOL_DATA.universityPathways.metrics.map((met, idx) => (
                <div key={idx} className="bg-[#FCFAF7] border border-[#E7E7E7] p-5 rounded-2xl text-center">
                  <span className="font-serif font-black text-xl sm:text-2xl text-[#AA4A44] block mb-1">{met.value}</span>
                  <span className="font-mono text-[9px] text-[#77966D] uppercase block">{met.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {SCHOOL_DATA.universityPathways.pillars.map((pil, idx) => (
              <div key={idx} className="bg-[#FCFAF7] border border-[#E7E7E7] p-8 rounded-3xl">
                <span className="font-mono text-xs text-[#77966D] font-bold block mb-2">PILLAR 0{idx+1}</span>
                <h4 className="font-serif font-bold text-lg text-[#AA4A44] mb-3">{pil.title}</h4>
                <p className="text-xs text-[#2B2927]/80 leading-relaxed">{pil.description}</p>
              </div>
            ))}
          </div>

          {/* PLACED UNIVERSITIES LOGO BAR */}
          <div className="bg-[#FCFAF7] border border-[#E7E7E7] p-8 rounded-3xl">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#77966D] font-bold text-center mb-6">Historical Admissions Success Placements</h5>
            <div className="flex flex-wrap gap-4 justify-center">
              {SCHOOL_DATA.universityPathways.universities.map((uni, idx) => (
                <span key={idx} className="bg-[#FAF7F2] border border-[#E7E7E7] py-2 px-4 rounded-xl text-xs font-mono font-semibold text-[#AA4A44]">
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17: PARENT QUESTIONS (25+ FAQS) WITH AI SEARCH & CHAT */}
      <section id="faq" className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side, static Categories & AI admissions helper entry */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">TRUST & TRANSPARENCY</span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#AA4A44] leading-tight mb-4">
                Comprehensive Parent Evaluation FAQ
              </h2>
              <p className="text-sm text-[#2B2927]/80 leading-relaxed mb-8">
                Answering every potential concern. Filter by category, search keywords, or interact with our active Admissions AI.
              </p>

              {/* SEARCH BOX */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Query key terms (e.g. fee, HEPA, board)..."
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 rounded-xl border border-[#E7E7E7] bg-white text-xs focus:ring-1 focus:ring-[#AA4A44] focus:outline-none"
                  id="faq-search-input"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>

              {/* CATEGORIES BUTTONS */}
              <div className="space-y-2 mb-8">
                {faqCategories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedFaqCategory(cat);
                      setOpenFaqId(null);
                    }}
                    className={`w-full text-left py-2 px-4 rounded-lg text-xs font-mono transition font-medium ${
                      selectedFaqCategory === cat 
                      ? "bg-[#AA4A44]/15 border border-[#AA4A44]/30 text-[#AA4A44]" 
                      : "bg-[#FAF7F2] border border-[#E7E7E7] text-[#2B2927]/70 hover:border-[#C99996]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* AI CHAT INVITATION PANEL */}
              <div className="bg-[#77966D]/10 border border-[#77966D]/30 p-6 rounded-2xl">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#77966D] font-bold block mb-1">STILL HAVE UNRESOLVED QUESTIONS?</span>
                <h4 className="font-serif font-bold text-base text-[#2B2927] mb-3">Ask Mirai Admissions AI Assistant</h4>
                <p className="text-xs text-[#2B2927]/80 leading-relaxed mb-4">
                  Our advanced neural model has learned the complete prospectus, boarding rules, child development paths and fee waivers.
                </p>
                <button
                  onClick={() => setIsAiChatOpen(true)}
                  className="w-full py-2.5 bg-[#77966D] text-white hover:bg-[#77966D]/90 transition text-xs font-semibold uppercase tracking-wider rounded-xl block text-center"
                  id="faq-initiate-ai-btn"
                >
                  Initiate AI Inquiry Chat
                </button>
              </div>
            </div>

            {/* Right side, the dynamic filtered accordion */}
            <div className="lg:col-span-8 space-y-4">
              <span className="font-mono text-xs uppercase text-[#77966D] font-bold tracking-wider block mb-2">
                FILTERED FAQS ({filteredFaqs.length})
              </span>
              
              {filteredFaqs.length === 0 ? (
                <div className="bg-[#FAF7F2] border border-[#E7E7E7] rounded-2xl p-12 text-center">
                  <p className="text-sm font-semibold text-gray-500 mb-4">No direct FAQ matches your query string.</p>
                  <button
                    onClick={() => {
                      setFaqSearchQuery("");
                      setSelectedFaqCategory("All");
                    }}
                    className="text-xs font-mono underline text-[#AA4A44] font-bold"
                  >
                    Reset Active Filters
                  </button>
                </div>
              ) : (
                filteredFaqs.map((item) => (
                  <div key={item.id} className="bg-[#FAF7F2] border border-[#E7E7E7] rounded-2xl overflow-hidden transition">
                    <button
                      onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                      className="w-full text-left p-6 flex justify-between items-center transition hover:bg-[#FCFAF7]"
                    >
                      <div>
                        <span className="font-mono text-[8px] tracking-widest text-[#77966D] uppercase block mb-1">{item.category}</span>
                        <h4 className="font-serif font-bold text-base text-[#AA4A44]">{item.question}</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#AA4A44] shrink-0 transition-transform ${openFaqId === item.id ? "rotate-180" : ""}`} />
                    </button>
                    
                    {openFaqId === item.id && (
                      <div className="px-6 pb-6 border-t border-[#E7E7E7]/60 pt-4 text-sm text-[#2B2927]/90 leading-relaxed bg-[#FCFAF7]/40">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 18: SAFETY & SECURITY METRICS */}
      <section className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">ZERO RISK ASSURANCE</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              Safety, Security & Health Facilities
            </h2>
            <div className="w-20 h-1 bg-[#AA4A44] mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SCHOOL_DATA.safety.map((saf, idx) => (
              <div key={idx} className="bg-[#FCFAF7] border border-[#E7E7E7] p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <Shield className="w-8 h-8 text-[#77966D] mb-4" />
                  <h4 className="font-serif font-bold text-lg text-[#AA4A44] mb-3">{saf.title}</h4>
                  <p className="text-xs text-[#2B2927]/80 leading-relaxed mb-4">{saf.text}</p>
                </div>
                <div className="pt-3 border-t border-[#E7E7E7] text-[10px] font-mono text-[#77966D] flex justify-between">
                  <span>AUDITED DAILY</span>
                  <span>✓ PASSED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 19: ADMISSIONS PROCESS STEP-RIBBON */}
      <section id="admissions" className="py-24 bg-[#FCFAF7] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">START YOUR PATHWAY</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#AA4A44] leading-tight">
              Step-by-Step Admissions Procedure
            </h2>
            <div className="w-20 h-1 bg-[#C99996] mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
            {SCHOOL_DATA.admissions.map((step) => (
              <div key={step.step} className="bg-[#FAF7F2] border border-[#E7E7E7] p-8 rounded-2xl flex flex-col justify-between relative group hover:border-[#AA4A44]/30 transition duration-300">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#AA4A44] text-white flex items-center justify-center font-mono text-base font-bold mb-6">
                    {step.step}
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#AA4A44] mb-3">{step.title}</h4>
                  <p className="text-xs text-[#2B2927]/80 leading-relaxed mb-4">{step.description}</p>
                </div>
                
                <div className="pt-4 border-t border-[#E7E7E7] text-[9px] font-mono text-[#77966D]">
                  <span>EXPECTED ELIGIBILITY</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 20: FINAL CTA BLOCK (INTERACTIVE INPUT FORMS) */}
      <section id="cta-block" className="py-24 bg-[#FAF7F2] border-t border-[#E7E7E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* CTA Left Column Copy & Trust Panel */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#77966D] font-bold block mb-2">SECURE YOUR PLACEMENT</span>
                <h2 className="font-serif font-black text-4xl sm:text-5xl text-[#AA4A44] leading-tight mb-6">
                  The Future Starts Here
                </h2>
                <div className="w-20 h-1 bg-[#AA4A44] mb-8" />
                <p className="text-sm text-[#2B2927]/90 leading-relaxed">
                  Join a high-resource hub built on independent scientific research, Waldorf design principles, and elite IB frameworks. Initiate an inquiry to discuss waivers, residency, and Future Friday integrations.
                </p>
              </div>

              <div className="bg-[#FCFAF7] border border-[#E7E7E7] p-6 rounded-2xl mt-8">
                <span className="font-mono text-[9px] text-[#77966D] font-bold uppercase block mb-2">OFFICIAL CONCIERGE HOTLINE</span>
                <div className="flex items-center space-x-3 text-[#AA4A44] mb-2 font-serif font-bold text-lg">
                  <Phone className="w-5 h-5" />
                  <span>+91 98110 543XX</span>
                </div>
                <div className="flex items-center space-x-3 text-[#77966D] font-mono text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>Sohna Road, Gurugram NCR</span>
                </div>
              </div>
            </div>

            {/* CTA Right Column - Standard Admissions Action Form Cards */}
            <div className="lg:col-span-8 bg-[#FCFAF7] border border-[#E7E7E7] rounded-3xl p-8 flex flex-col justify-between">
              
              {/* INTERACTIVE FORM SELECTION TAB */}
              <div className="flex bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E7E7E7] justify-around mb-8" id="form-selection-bar">
                <button
                  onClick={() => {
                    setTourFormSubmitted(false);
                    setProspectusSubmitted(false);
                    setCallbackSubmitted(false);
                    setApplySubmitted(false);
                  }}
                  id="tab-tour"
                  className="py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider text-[#AA4A44] focus:outline-none"
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
                  className="py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider text-[#77966D] focus:outline-none"
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
                  className="py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider text-[#AA4A44] focus:outline-none"
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
                  className="py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider text-[#77966D] focus:outline-none"
                >
                  📝 Apply Now
                </button>
              </div>

              {/* DYNAMIC FORMS CONSOLE */}
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E7E7E7]">
                
                {/* 1. BOOK TOUR FORM */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTourFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  {tourFormSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#77966D]/15 text-[#77966D] flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6 animate-bounce" />
                      </div>
                      <h4 className="font-serif font-bold text-xl text-[#AA4A44]">Campus Review Slot Requested</h4>
                      <p className="text-xs text-[#2B2927]/85 max-w-sm mx-auto leading-relaxed">
                        Thank you, <strong>{tourData.name || "Scholar Parent"}</strong>. We have allocated a temporary slot on <strong>{tourData.date || "your selected date"}</strong> for a deep engineering lab and pool inspection. A notification voucher has been sent to <strong>{tourData.email}</strong>.
                      </p>
                      <button 
                        type="button" 
                        onClick={() => {
                          setTourFormSubmitted(false);
                          setTourData({ name: "", email: "", phone: "", grade: "Grade 6 to 10", date: "" });
                        }}
                        className="text-xs font-mono font-bold underline text-[#AA4A44] block mx-auto"
                      >
                        Book another tour
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-lg text-[#AA4A44] mb-2">Book Exclusive Admissions Tour</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1">Parent Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your full name"
                            value={tourData.name}
                            onChange={(e) => setTourData({...tourData, name: e.target.value})}
                            className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs focus:ring-1 focus:ring-[#AA4A44] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={tourData.phone}
                            onChange={(e) => setTourData({...tourData, phone: e.target.value})}
                            className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs focus:ring-1 focus:ring-[#AA4A44] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="parent@domain.com"
                            value={tourData.email}
                            onChange={(e) => setTourData({...tourData, email: e.target.value})}
                            className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs focus:ring-1 focus:ring-[#AA4A44] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1">Applying Grade Spectrum</label>
                          <select
                            value={tourData.grade}
                            onChange={(e) => setTourData({...tourData, grade: e.target.value})}
                            className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs focus:ring-1 focus:ring-[#AA4A44] outline-none"
                          >
                            <option>Early Years (Age 3-5)</option>
                            <option>Grade 1 to 5 (PYP)</option>
                            <option>Grade 6 to 10 (MYP)</option>
                            <option>Grade 11 to 12 (DP)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#77966D] mb-1">Target Saturday Tour Date</label>
                        <input
                          type="date"
                          required
                          value={tourData.date}
                          onChange={(e) => setTourData({...tourData, date: e.target.value})}
                          className="w-full p-2.5 rounded border border-[#E7E7E7] bg-white text-xs focus:ring-1 focus:ring-[#AA4A44] outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#AA4A44] text-white hover:bg-[#AA4A44]/90 transition text-xs font-semibold uppercase tracking-wider rounded-xl block text-center"
                        id="form-submit-tour-btn"
                      >
                        Confirm Target Tour Selection
                      </button>
                    </div>
                  )}
                </form>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2B2927] text-[#FAF7F2] py-16 border-t border-[#E7E7E7]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#AA4A44] flex items-center justify-center text-white font-bold text-lg tracking-wider">
                M
              </div>
              <div>
                <span className="font-heading font-bold text-xl uppercase tracking-widest text-[#C99996] block">MIRAI</span>
                <span className="text-[10px] uppercase font-mono tracking-widest block text-[#AFBFAA] -mt-1">Experiential School</span>
              </div>
            </div>
            <p className="text-xs text-[#FAF7F2]/60 leading-relaxed mb-6">
              NCR&apos;s benchmark IB school mapping academic inquiry directly against hands-on robotic capstones, heated ozone aquatic systems, and elite university portfolio channels.
            </p>
            <div className="mb-3 text-xs font-mono uppercase tracking-wider text-[#AA4A44] font-bold">
              Follow Us
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.instagram.com/miraiexp/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[#AA4A44]" />
              </a>
              <a 
                href="https://www.youtube.com/@mirai_exp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5 text-[#AA4A44]" />
              </a>
              <a 
                href="https://www.linkedin.com/company/mirai-experiential-school" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Linkedin"
              >
                <Linkedin className="w-5 h-5 text-[#AA4A44]" />
              </a>
              <a 
                href="https://wa.me/919220522282" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Whatsapp"
              >
                <MessageCircle className="w-5 h-5 text-[#AA4A44]" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-serif font-semibold text-lg text-[#C99996] mb-4">Curriculum Links</h5>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/75">
              <li>• Early Years Programme (EYP)</li>
              <li>• Primary Years Programme (PYP)</li>
              <li>• Middle Years Programme (MYP)</li>
              <li>• Diploma Programme (DP)</li>
              <li>• Theory of Knowledge (TOK)</li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif font-semibold text-lg text-[#C99996] mb-4">Unique Frameworks</h5>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/75 font-mono">
              <li>• Mirai 4+1 Model</li>
              <li>• Future Fridays Fieldwork</li>
              <li>• Haptic assist hardware capstones</li>
              <li>• Carbon-negative aggregate concrete</li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif font-semibold text-lg text-[#C99996] mb-4">Regulatory Statements</h5>
            <p className="text-xs text-[#FAF7F2]/60 leading-relaxed mb-4">
              Mirai Experiential School is an officially registered candidate school for the International Baccalaureate (IB) primary, middle, and diploma years pathways.
            </p>
            <span className="text-[10px] font-mono text-[#AFBFAA]">© 2026 Mirai Experiential School. Pure Waldorf Inspired Architecture.</span>
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
            className="fixed inset-0 bg-[#2B2927]/60 backdrop-blur-sm z-50 flex justify-end"
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
                    <h3 className="font-serif font-bold text-lg select-none">Admissions Concierge AI</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E7E7E7] block">Mirai School Ambassador</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAiChatOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition"
                  id="close-ai-drawer-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat messages layout */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.role === "user" 
                      ? "bg-[#AA4A44] text-white rounded-br-none" 
                      : "bg-[#FCFAF7] border border-[#E7E7E7] text-[#2B2927] rounded-bl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#FCFAF7] border border-[#E7E7E7] rounded-2xl rounded-bl-none p-4 text-xs text-gray-500 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AA4A44] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AA4A44] animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AA4A44] animate-bounce" style={{ animationDelay: "0.4s" }} />
                      <span className="font-mono text-[10px]">Processing admissions context...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions / Prompt starters standard in concierge */}
              <div className="p-4 bg-[#FCFAF7] border-t border-[#E7E7E7] grid grid-cols-2 gap-2 text-[10px] font-mono text-[#AA4A44]">
                <button 
                  onClick={() => setChatInput("Tell me about the 4+1 model and Friday field trips.")}
                  className="p-2 border border-[#C99996]/40 rounded-lg text-left bg-[#FAF7F2] hover:bg-[#C99996]/10 transition"
                >
                  💡 The 4+1 Model & Fridays
                </button>
                <button 
                  onClick={() => setChatInput("What are the IB fees and are there scholarships?")}
                  className="p-2 border border-[#C99996]/40 rounded-lg text-left bg-[#FAF7F2] hover:bg-[#C99996]/10 transition"
                >
                  💸 Fees & Scholarship options
                </button>
                <button 
                  onClick={() => setChatInput("Describe a residential boarder's meal structure.")}
                  className="p-2 border border-[#C99996]/40 rounded-lg text-left bg-[#FAF7F2] hover:bg-[#C99996]/10 transition"
                >
                  🥗 Nutrition & Dining plan
                </button>
                <button 
                  onClick={() => setChatInput("What are some real student engineering projects?")}
                  className="p-2 border border-[#C99996]/40 rounded-lg text-left bg-[#FAF7F2] hover:bg-[#C99996]/10 transition"
                >
                  🚀 Real Engineering projects
                </button>
              </div>

              {/* Chat Form Footer */}
              <form onSubmit={handleSendAiMessage} className="p-4 bg-white border-t border-[#E7E7E7] flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask about boarding, HEPA filters, ratio, TOK..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow p-3 border border-[#E7E7E7] rounded-xl text-xs focus:ring-1 focus:ring-[#AA4A44] outline-none"
                  id="chat-drawer-input"
                />
                <button 
                  type="submit"
                  className="p-3 bg-[#AA4A44] text-white hover:bg-[#AA4A44]/90 rounded-xl transition"
                  id="chat-drawer-submit-btn"
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
