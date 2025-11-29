import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Minus, 
  Plus, 
  ArrowUpRight,
  Terminal,
  BarChart3,
  Cpu,
  Globe,
  X,
  Menu,
  ChevronRight,
  Database,
  Lock,
  Network,
  Sun,
  Moon,
  Calculator,
  Zap,
  Quote,
  CheckCircle2,
  Star,
  Gem,
  Code2
} from 'lucide-react';

// --- SUB-COMPONENTS FOR HIGH-END UX ---

// 1. Text Decryption Effect
const DecryptText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

// 2. Mouse-Tracking Spotlight Card
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={`relative overflow-hidden rounded-lg border theme-border bg-white dark:bg-white/5 transition-colors duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(249, 115, 22, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 3. Brand Logo Simulator (The "Monogram" System)
// This simulates the visual weight of logos using typography until you add SVGs
const BrandLogo = ({ name, type = 'serif', tech }) => (
  <div className="group relative w-full aspect-video flex flex-col items-center justify-center p-6 border theme-border hover:border-[var(--accent)] bg-white dark:bg-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/10 overflow-hidden cursor-crosshair">
    
    {/* Tech Reveal Background */}
    <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 flex items-center justify-center">
       <div className="text-white font-mono text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 text-center px-4">
          <Code2 className="w-6 h-6 mx-auto mb-2 opacity-80" />
          {tech}
       </div>
    </div>

    {/* The "Logo" */}
    <div className={`relative z-10 text-center transition-all duration-500 group-hover:scale-110 group-hover:text-white`}>
       {type === 'serif' ? (
          <span className="font-serif text-3xl md:text-4xl font-bold tracking-tight theme-text-primary group-hover:text-white">{name}</span>
       ) : (
          <span className="font-sans text-2xl md:text-3xl font-black uppercase tracking-widest theme-text-primary group-hover:text-white">{name}</span>
       )}
    </div>
    
    {/* Corner Accents */}
    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l theme-border group-hover:border-white transition-colors duration-300"></div>
    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r theme-border group-hover:border-white transition-colors duration-300"></div>
  </div>
);

// 4. Testimonial Card Component
const TestimonialCard = ({ quote, author, role, company }) => (
  <div className="w-[400px] flex-shrink-0 p-8 theme-bg-card border theme-border rounded-lg mx-4 relative group hover:border-[var(--accent)] transition-colors duration-300">
    <Quote className="w-8 h-8 text-[var(--accent)]/20 mb-4 absolute top-6 right-6" />
    <p className="theme-text-secondary leading-relaxed mb-6 font-light italic">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center font-bold text-xs theme-text-primary">
        {author.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <div className="text-sm font-bold theme-text-primary">{author}</div>
        <div className="text-[10px] theme-text-tertiary uppercase tracking-wider">{role} @ {company}</div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const DeyaAldeen = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visiblePartners, setVisiblePartners] = useState(false);
  const partnerSectionRef = useRef(null);

  // ROI Calculator State
  const [hoursWasted, setHoursWasted] = useState(10);
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(50);
  const annualSavings = hoursWasted * teamSize * hourlyRate * 52;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Partner Grid Lazy Entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisiblePartners(true);
      },
      { threshold: 0.1 }
    );
    if (partnerSectionRef.current) observer.observe(partnerSectionRef.current);
    return () => { if (partnerSectionRef.current) observer.unobserve(partnerSectionRef.current); };
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const menuItems = [
    { label: "01. Impact", href: "#impact" },
    { label: "02. Network", href: "#partners" },
    { label: "03. Reviews", href: "#testimonials" },
    { label: "04. Logic", href: "#logic" },
    { label: "05. Contact", href: "#contact" }
  ];

  // Enhanced Partner Data with "Tech Reveal"
  const jointVentures = [
    { name: "Louis Vuitton", type: 'serif', tech: "Oracle ERP Automation" },
    { name: "Dior", type: 'serif', tech: "Reconciliation Engine" },
    { name: "Sephora", type: 'sans', tech: "POS Data Integration" },
    { name: "Fendi", type: 'serif', tech: "Payment Gateway API" },
    { name: "Celine", type: 'serif', tech: "Inventory Sync Bot" },
    { name: "Givenchy", type: 'serif', tech: "Payroll Automation" },
    { name: "Louboutin", type: 'serif', tech: "Sales Reporting RPA" },
    { name: "Puig", type: 'sans', tech: "Supply Chain Analytics" },
  ];

  const franchises = [
    "Saks Fifth Avenue", "Loewe", "Carolina Herrera", 
    "Swarovski", "Lacoste", "Michael Kors", "L'Oréal Luxury",
    "Maison Margiela", "Jil Sander", "Marni"
  ];

  // MOCK TESTIMONIALS DATA
  const testimonialsRow1 = [
    { quote: "The automation solutions delivered have fundamentally changed how our finance team operates. What used to take days now happens automatically.", author: "Sarah Jenkins", role: "Finance Ops", company: "Chalhoub Group" },
    { quote: "Deya didn't just automate a process; he architected a completely new way for our data to flow. The ROI was visible in week one.", author: "Ahmed Al-Sayed", role: "Regional Controller", company: "Real FZE" },
    { quote: "We were drowning in Excel sheets. Now, our reporting is instantaneous. The accuracy is 100%, something we never thought possible.", author: "Michael Ross", role: "CFO", company: "Logistics Co" },
  ];

  const testimonialsRow2 = [
    { quote: "The cleanest implementation of Oracle ERP automation I have seen. Our IT team was skeptical, but Deya delivered flawless integration.", author: "James Chen", role: "CTO", company: "Tech Flow" },
    { quote: "It's rare to find a consultant who speaks both 'Finance' and 'Python' fluently. He bridged the gap between our departments.", author: "Layla Mahmoud", role: "Head of Audit", company: "Regional Bank" },
    { quote: "Saved us 160 hours a month. That is the equivalent of a full-time employee, achieved in just a 6-week project engagement.", author: "Tom Baker", role: "Ops Manager", company: "Fulfillment Hub" },
  ];

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ease-in-out ${isDarkMode ? 'dark bg-[#0F172A]' : 'bg-[#FDFBF7]'}`}>
      
      {/* CSS Variables & Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;600&display=swap');
        
        :root {
          --bg-main: #FDFBF7;
          --bg-card: #FFFFFF;
          --text-primary: #0F172A;
          --text-secondary: #475569;
          --text-tertiary: #94A3B8;
          --accent: #F97316;
          --border-subtle: rgba(15, 23, 42, 0.1);
          --section-dark-bg: #0F172A;
          --tech-grid-color: rgba(15, 23, 42, 0.05);
        }

        .dark {
          --bg-main: #0F172A;
          --bg-card: #1E293B;
          --text-primary: #F1F5F9;
          --text-secondary: #CBD5E1;
          --text-tertiary: #64748B;
          --accent: #FB923C;
          --border-subtle: rgba(255, 255, 255, 0.1);
          --section-dark-bg: #020617;
          --tech-grid-color: rgba(255, 255, 255, 0.05);
        }

        /* Utilities */
        .theme-text-primary { color: var(--text-primary); }
        .theme-text-secondary { color: var(--text-secondary); }
        .theme-text-tertiary { color: var(--text-tertiary); }
        .theme-border { border-color: var(--border-subtle); }
        .theme-section-dark { background-color: var(--section-dark-bg); color: #fff; }
        .theme-bg-card { background-color: var(--bg-card); }

        .font-serif { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* Custom Range Slider Styling */
        input[type=range] {
          -webkit-appearance: none; 
          background: transparent; 
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          margin-top: -8px; 
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: var(--border-subtle);
          border-radius: 2px;
        }

        @keyframes drawLine {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-draw { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: drawLine 2s ease-out forwards; }
        .animate-fade-up { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        .animate-marquee { animation: marquee 60s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 60s linear infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }

        .bg-tech-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, var(--tech-grid-color) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--tech-grid-color) 1px, transparent 1px);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 theme-border border-b ${scrolled ? 'bg-[var(--bg-main)]/95 backdrop-blur-md h-16 shadow-sm' : 'bg-transparent h-24'}`}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 theme-section-dark rounded-lg flex items-center justify-center text-white group-hover:bg-[var(--accent)] transition-colors duration-300 shadow-lg">
               <svg width="24" height="24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 60 C 50 60, 120 60, 120 100 C 120 140, 50 140, 50 140" stroke="currentColor" strokeWidth="24" strokeLinecap="round"/>
                  <path d="M80 60 C 80 60, 150 60, 150 100 C 150 140, 80 140, 80 140" stroke="currentColor" strokeWidth="24" strokeLinecap="round"/>
                  <circle cx="80" cy="140" r="30" fill="white"/>
               </svg>
            </div>
            <div className="flex flex-col">
              <DecryptText text="DEYA ALDEEN" className="font-bold theme-text-primary tracking-tight leading-none uppercase" />
              <span className="font-mono text-[10px] theme-text-tertiary uppercase tracking-widest leading-none mt-1">Process Architect</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {menuItems.map((item) => (
              <a key={item.label} href={item.href} className="font-mono text-xs font-medium uppercase tracking-widest theme-text-secondary hover:text-[var(--accent)] transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 theme-text-primary transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a href="#contact" className="theme-section-dark px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 rounded-sm">
              Book Audit
            </a>
          </div>

          <div className="flex items-center gap-4 md:hidden">
             <button onClick={toggleTheme} className="theme-text-primary p-2">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="theme-text-primary">
               {isMenuOpen ? <X /> : <Menu />}
             </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 lg:pt-56 pb-20 px-6 lg:px-12 max-w-[1920px] mx-auto overflow-hidden bg-tech-grid theme-border border-b bg-[var(--bg-main)] transition-colors duration-500">
        
        {/* Kinetic Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-5 pointer-events-none -mr-40 -mt-20">
             <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[var(--text-primary)]">
                <path className="animate-draw" d="M0 40 C 50 40, 150 40, 150 100 C 150 160, 50 160, 50 200" strokeWidth="2" strokeLinecap="round"/>
                <path className="animate-draw delay-100" d="M20 40 C 70 40, 170 40, 170 100 C 170 160, 70 160, 70 200" strokeWidth="2" strokeLinecap="round"/>
                <path className="animate-draw delay-200" d="M40 40 C 90 40, 190 40, 190 100 C 190 160, 90 160, 90 200" strokeWidth="2" strokeLinecap="round"/>
             </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100/10 border border-[var(--accent)]/30 rounded-full mb-8 animate-fade-up">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-[var(--accent)] uppercase tracking-widest">System Status: Online</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl lg:leading-[1.1] font-serif tracking-tight mb-8 theme-text-primary animate-fade-up delay-100">
              We eliminate the <br/>
              <span className="relative inline-block">
                <span className="relative z-10 italic text-[var(--accent)]">manual work</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--accent)]/20 -z-0 transform -rotate-1"></span>
              </span> <br/>
              your finance team hates.
            </h1>
            
            <p className="text-xl theme-text-secondary max-w-2xl leading-relaxed mb-10 animate-fade-up delay-200 font-light">
              Process automation for enterprise finance operations. I don't just advise; I architect, code, and deploy solutions for MENA's largest portfolios.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
               <a href="#impact" className="group flex items-center gap-4 theme-section-dark px-8 py-4 rounded-sm font-mono text-sm uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-xl hover:shadow-[var(--accent)]/20">
                  See The Logic
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </a>
               <a href="#contact" className="flex items-center gap-4 px-8 py-4 border theme-border theme-text-primary hover:border-[var(--accent)] rounded-sm font-mono text-sm uppercase tracking-widest transition-all duration-300">
                  Talk to Deya
               </a>
            </div>
          </div>

          {/* Interactive ROI Calculator */}
          <div className="lg:col-span-5 animate-fade-up delay-300">
            <SpotlightCard className="p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[var(--accent)]" />
                  <span className="font-mono text-xs theme-text-tertiary uppercase tracking-widest">ROI Estimator</span>
                </div>
                <div className="text-[10px] theme-text-tertiary bg-gray-100 dark:bg-white/10 px-2 py-1 rounded">
                  Live Calculation
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-mono theme-text-secondary">
                    <label>Hours Wasted / Week</label>
                    <span className="theme-text-primary font-bold">{hoursWasted} hrs</span>
                  </div>
                  <input type="range" min="1" max="40" value={hoursWasted} onChange={(e) => setHoursWasted(parseInt(e.target.value))} className="w-full"/>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-mono theme-text-secondary">
                    <label>Team Size</label>
                    <span className="theme-text-primary font-bold">{teamSize} people</span>
                  </div>
                  <input type="range" min="1" max="50" value={teamSize} onChange={(e) => setTeamSize(parseInt(e.target.value))} className="w-full"/>
                </div>
                <div className="pt-6 border-t theme-border">
                  <div className="text-center">
                    <div className="text-sm theme-text-tertiary font-mono uppercase mb-1">Potential Annual Savings</div>
                    <div className="text-5xl font-serif font-bold theme-text-primary">${annualSavings.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </header>

      {/* STRATEGIC PARTNERS - "THE TROPHY ROOM" REDESIGN */}
      <section id="partners" ref={partnerSectionRef} className="theme-section-dark border-b theme-border transition-colors duration-500 py-32 overflow-hidden relative">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
             <div className="max-w-2xl">
               <div className="flex items-center gap-2 mb-6 text-[var(--accent)] animate-pulse">
                  <Gem className="w-5 h-5" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">The Competitive Advantage</span>
               </div>
               <h2 className="text-5xl lg:text-7xl font-serif leading-[0.9] mb-8">
                  Unrivaled Access. <br/>
                  <span className="italic text-gray-500">Proven Expertise.</span>
               </h2>
               <p className="text-xl text-gray-400 font-light leading-relaxed border-l-2 border-[var(--accent)] pl-8">
                  Our advantage lies in our deep integration with the world's most prestigious portfolios. We don't just know the theory; we've automated the actual systems that power these brands.
               </p>
             </div>
             
             <div className="flex flex-col items-end text-right">
                <div className="text-6xl font-serif font-bold text-[var(--accent)] mb-2">24+</div>
                <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">Luxury Entities Optimized</div>
             </div>
          </div>

          {/* JOINT VENTURES - THE LOGO VAULT */}
          <div className="mb-24">
             <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Strategic Joint Ventures</span>
                <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest">Hover to Decrypt Tech</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                {jointVentures.map((brand, i) => (
                   <BrandLogo key={i} {...brand} />
                ))}
             </div>
          </div>

          {/* FRANCHISES - THE INFINITE TICKER */}
          <div className="relative">
             <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-grow"></div>
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Global Franchises & Portfolios</span>
                <div className="h-px bg-white/10 flex-grow"></div>
             </div>
             
             <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-24 group-hover:[animation-play-state:paused]">
                   {[...franchises, ...franchises, ...franchises].map((brand, i) => (
                      <span key={i} className="text-4xl lg:text-6xl font-serif text-white/10 uppercase tracking-tighter hover:text-[var(--accent)] transition-colors cursor-default duration-300">
                         {brand}
                      </span>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* Grid Layout Problem Section */}
      <section className="bg-[var(--bg-main)] border-b theme-border transition-colors duration-500">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 lg:p-24 border-b lg:border-b-0 lg:border-r theme-border">
            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mb-8">
               <Database className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif theme-text-primary mb-8 leading-tight">
              Data is messy. <br/>Manual work is slow.
            </h2>
            <p className="text-lg theme-text-secondary leading-relaxed font-light">
              Your highly-paid finance professionals are wasting hours downloading reports from 10 different portals, chasing reconciliation errors, and copy-pasting into Excel.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
             {[
               { val: "160+", label: "Hours Saved", unit: "Per Month", icon: <Terminal className="w-5 h-5"/> },
               { val: "$25k", label: "Cost Reduced", unit: "Annually", icon: <ArrowUpRight className="w-5 h-5"/> },
               { val: "46", label: "Reports Automated", unit: "Across 24 Entities", icon: <BarChart3 className="w-5 h-5"/> },
               { val: "0", label: "Human Errors", unit: "Guaranteed", icon: <Lock className="w-5 h-5"/> }
             ].map((stat, i) => (
               <SpotlightCard key={i} className="p-12 border-0 border-b border-r theme-border rounded-none">
                  <div className="flex justify-between items-start mb-4 theme-text-tertiary">
                     {stat.icon}
                     <span className="font-mono text-xs">0{i+1}</span>
                  </div>
                  <div className="text-4xl font-serif font-bold theme-text-primary mb-2">{stat.val}</div>
                  <div className="font-bold text-xs uppercase tracking-widest theme-text-primary mb-1">{stat.label}</div>
                  <div className="font-mono text-[10px] theme-text-tertiary">{stat.unit}</div>
               </SpotlightCard>
             ))}
          </div>
        </div>
      </section>

      {/* Logic Section */}
      <section id="logic" className="theme-section-dark py-24 relative overflow-hidden transition-colors duration-500">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
               <circle cx="500" cy="500" r="400" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10 10" className="animate-[spin_60s_linear_infinite]" />
               <circle cx="500" cy="500" r="300" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />
            </svg>
         </div>

        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
             <div className="w-16 h-1 bg-[var(--accent)] mb-8"></div>
             <h2 className="text-4xl font-serif mb-6">The Methodology.</h2>
             <p className="opacity-80 font-light leading-relaxed mb-8">
                We employ a rigorous framework to ensure rapid deployment. No black boxes. No indefinite timelines. We are technology agnostic—using Python, RPA, or Power Platform based on the problem, not the license fee.
             </p>
             <div className="flex gap-4 opacity-50">
                <Globe className="w-6 h-6"/>
                <Cpu className="w-6 h-6"/>
                <Terminal className="w-6 h-6"/>
             </div>
          </div>

          <div className="lg:col-span-8">
            {[
              { step: "01", title: "Discover", content: "We audit your processes to identify the highest-impact automation opportunities. Deliverable: Validated ROI Assessment." },
              { step: "02", title: "Design", content: "We architect a solution tailored to your existing ERP and data ecosystem. You approve the blueprint before a single line of code is written." },
              { step: "03", title: "Deploy", content: "We build, test, and launch. Includes rigorous UAT, error-handling protocols, and comprehensive team training." },
              { step: "04", title: "Deliver", content: "Post-launch monitoring to measure actual hours saved against initial projections." }
            ].map((item, idx) => (
              <div key={idx} className="border-b theme-border">
                <button 
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-8 flex items-center justify-between text-left group hover:bg-white/5 px-4 transition-colors rounded-sm"
                >
                  <div className="flex items-center gap-6 md:gap-8">
                    <span className="font-mono text-[var(--accent)] text-sm font-bold">0{idx + 1}</span>
                    <span className="text-xl md:text-2xl font-serif group-hover:translate-x-2 transition-transform duration-300">{item.title}</span>
                  </div>
                  {activeAccordion === idx ? <Minus className="text-[var(--accent)]" /> : <Plus className="opacity-50 group-hover:opacity-100" />}
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAccordion === idx ? 'max-h-40 opacity-100 pb-8 px-4' : 'max-h-0 opacity-0'}`}>
                  <p className="opacity-70 pl-12 md:pl-16 max-w-2xl font-light text-sm md:text-base leading-relaxed border-l border-[var(--accent)] ml-2 pl-6">
                     {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="testimonials" className="py-24 theme-bg-main border-b theme-border overflow-hidden transition-colors duration-500">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 mb-16">
          <div className="flex items-center gap-2 mb-4">
             <Star className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]" />
             <span className="font-mono text-xs theme-text-tertiary uppercase tracking-widest">Client Feedback</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif theme-text-primary">Executive Endorsements</h2>
        </div>

        {/* Row 1: Scrolling Left */}
        <div className="relative mb-12 group">
           <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
             {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
               <TestimonialCard key={`r1-${i}`} {...t} />
             ))}
           </div>
           <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Row 2: Scrolling Right (Reverse) */}
        <div className="relative group">
           <div className="flex animate-marquee-reverse hover:[animation-play-state:paused] w-max">
             {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
               <TestimonialCard key={`r2-${i}`} {...t} />
             ))}
           </div>
           <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] border-t theme-border">
         <div className="theme-bg-main p-12 lg:p-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r theme-border transition-colors duration-500">
            <div>
               <h2 className="text-4xl lg:text-5xl font-serif theme-text-primary mb-8">Let's calculate your savings.</h2>
               <p className="theme-text-secondary mb-12 max-w-md font-light">
                  30 minutes. No pitch. Just a preliminary audit of your automation potential with a Principal Consultant.
               </p>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-10 h-10 rounded-full border theme-border flex items-center justify-center group-hover:theme-section-dark group-hover:text-white transition-all theme-text-primary">
                        <Globe className="w-4 h-4"/>
                     </div>
                     <span className="font-mono text-sm theme-text-primary">Amman, Jordan (MENA)</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-10 h-10 rounded-full border theme-border flex items-center justify-center group-hover:theme-section-dark group-hover:text-white transition-all theme-text-primary">
                        <ArrowUpRight className="w-4 h-4"/>
                     </div>
                     <a href="mailto:contact@deyaaldeen.com" className="font-mono text-sm theme-text-primary hover:underline">contact@deyaaldeen.com</a>
                  </div>
               </div>
            </div>

            <div className="mt-12 flex items-center gap-4">
               <div className="w-12 h-12 theme-section-dark text-white flex items-center justify-center font-serif font-bold text-xl">DA</div>
               <div>
                  <div className="font-bold theme-text-primary">DeyaAldeen AlSoub</div>
                  <div className="text-xs font-mono theme-text-tertiary uppercase tracking-widest">Founder</div>
               </div>
            </div>
         </div>

         <div className="theme-bg-card p-12 lg:p-24 flex flex-col justify-center transition-colors duration-500">
            <form className="space-y-8">
               <div className="relative group">
                  <input type="text" placeholder=" " className="peer w-full border-b theme-border py-3 focus:outline-none focus:border-[var(--accent)] bg-transparent transition-colors font-serif text-lg theme-text-primary" />
                  <label className="absolute left-0 top-3 theme-text-tertiary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-placeholder-shown:top-3 pointer-events-none uppercase font-mono tracking-widest">Full Name</label>
               </div>
               <div className="relative group">
                  <input type="email" placeholder=" " className="peer w-full border-b theme-border py-3 focus:outline-none focus:border-[var(--accent)] bg-transparent transition-colors font-serif text-lg theme-text-primary" />
                  <label className="absolute left-0 top-3 theme-text-tertiary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-placeholder-shown:top-3 pointer-events-none uppercase font-mono tracking-widest">Business Email</label>
               </div>
               <div className="relative group">
                  <textarea rows="3" placeholder=" " className="peer w-full border-b theme-border py-3 focus:outline-none focus:border-[var(--accent)] bg-transparent transition-colors font-serif text-lg theme-text-primary resize-none"></textarea>
                  <label className="absolute left-0 top-3 theme-text-tertiary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--accent)] peer-placeholder-shown:top-3 pointer-events-none uppercase font-mono tracking-widest">Operational Challenge</label>
               </div>
               
               <button className="w-full theme-section-dark text-white py-5 font-mono text-sm uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white transition-colors duration-300 shadow-xl flex items-center justify-between px-8 group">
                  <span>Transmit Request</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </form>
         </div>
      </section>

      {/* Footer */}
      <footer className="theme-section-dark py-12 px-6 lg:px-12 border-t theme-border transition-colors duration-500">
         <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest opacity-60">
            <div>© 2025 DeyaAldeen. All Systems Operational.</div>
            <div className="flex gap-8 mt-4 md:mt-0">
               <a href="#" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Protocol</a>
            </div>
         </div>
      </footer>

    </div>
  );
};

export default DeyaAldeen;