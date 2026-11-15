
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import logo from "../assets/images/fluxLogo.webp"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bug,
  Check,
  ChevronRight,
  Code2,
  Command,
  ExternalLink,
  FileCode2,
  Files,
  FolderOpen,
  Lightbulb,
  Menu,
  MessageSquare,
  Monitor,
  MousePointer2,
  PanelLeft,
  Rocket,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "workspace", label: "The workspace" },
  { id: "getting-started", label: "Getting started" },
  { id: "capabilities", label: "Capabilities" },
  { id: "roadmap", label: "What's coming" },
  { id: "limitations", label: "Limitations" },
  { id: "tutorials", label: "Tutorials" },
  { id: "feedback", label: "Feedback" },
];

const capabilities = [
  {
    icon: FolderOpen,
    title: "Project workspace",
    description:
      "Open and work with your development projects in a dedicated workspace.",
    status: "Available",
  },
  {
    icon: Files,
    title: "File explorer",
    description:
      "Navigate through folders and files to access your project structure.",
    status: "Available",
  },
  {
    icon: Code2,
    title: "Code editor",
    description:
      "Write, explore and modify source code within the development environment.",
    status: "Available",
  },
  {
    icon: Terminal,
    title: "Integrated terminal",
    description:
      "Run development commands and interact with your project environment.",
    status: "Available",
  },
  {
    icon: Sparkles,
    title: "AI workspace",
    description:
      "Explore the AI-assisted development capabilities available in Flux.",
    status: "In development",
  },
];

const roadmap = [
  {
    number: "01",
    title: "Editor experience",
    description:
      "A more refined editing experience with improved navigation, controls and productivity features.",
    category: "Core experience",
  },
  {
    number: "02",
    title: "AI development workflows",
    description:
      "More capable AI-assisted workflows to help developers work through coding tasks.",
    category: "AI",
  },
  {
    number: "03",
    title: "Project intelligence",
    description:
      "Deeper understanding of project structure, files and relationships across a codebase.",
    category: "Intelligence",
  },
  {
    number: "04",
    title: "Developer tools",
    description:
      "More integrated utilities to support everyday development workflows.",
    category: "Productivity",
  },
  {
    number: "05",
    title: "Workspace personalization",
    description:
      "More flexibility to configure the development environment around individual preferences.",
    category: "Experience",
  },
];

const tutorials = [
  {
    icon: FolderOpen,
    title: "Creating and opening projects",
    description: "Learn how to get a project into Flux.",
  },
  {
    icon: Files,
    title: "Navigating the Explorer",
    description: "Understand your project structure and files.",
  },
  {
    icon: Code2,
    title: "Working with the editor",
    description: "Learn the basics of editing your code.",
  },
  {
    icon: Terminal,
    title: "Using the terminal",
    description: "Execute commands inside your workspace.",
  },
  {
    icon: Sparkles,
    title: "Getting started with AI",
    description: "Explore the available AI-assisted workflow.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay }}
      className={className}
      style={reducedMotion ? { opacity: 1, transform: "none" } : undefined}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-xs text-blue-400">{number}</span>
      <span className="h-px w-7 bg-[#333]" />
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#777]">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-[#FAFAFA] sm:text-4xl lg:text-[42px]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#929292] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function Navbar() {
    const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#222] bg-[#0A0A0A]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">

      <button
        type="button"
        className="flex shrink-0 items-center gap-2.5"
        aria-label="Flux IDE home"
        onClick={()=>navigate("/")}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3B82F6]">
        <img
        src={logo}
        alt="Flux"
        className="h-7 w-7 object-contain"
        />
        </div>
        <span className="text-[15px] font-medium tracking-tight text-[#FAFAFA]">
          flux<span className="text-blue-500">.ide</span>
        </span>
      </button>

      <motion.button
        type="button"
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(-1)}
         className="group inline-flex items-center gap-2 rounded-md bg-[#111113] px-3.5 py-2.5 text-xs font-medium text-[#A1A1AA] transition-colors"
        aria-label="Flux IDE home"
      >
       <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to workspace
      </motion.button>

      </div>

     
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-[#202020]">
      <div className="pointer-events-none absolute right-[-180px] top-[-230px] h-[500px] w-[500px] rounded-full bg-blue-500/[0.06] blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-36">
        <Reveal className="relative z-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-blue-500" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#888]">
              FLUX / GUIDE / 001
            </span>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-blue-400">
              Early access
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
            A workspace for the way you{" "}
            <span className="text-blue-400">build.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#929292] sm:text-lg">
            A new development environment built around code, creativity and
            AI-assisted workflows. Here's everything you need to know to get
            started with Flux.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#introduction"
              className="group flex items-center gap-3 rounded-lg bg-blue-500 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-blue-400"
            >
              Explore the guide
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>
            <a
              href="#workspace"
              className="flex items-center gap-2 px-3 py-3 text-sm text-[#AAA] transition hover:text-white"
            >
              Meet the workspace <ArrowRight size={15} />
            </a>
          </div>

          <div className="mt-14 flex items-center gap-6 border-t border-[#252525] pt-6">
            <div>
              <p className="font-mono text-xs text-[#666]">01</p>
              <p className="mt-1 text-xs text-[#999]">Understand</p>
            </div>
            <div className="h-7 w-px bg-[#292929]" />
            <div>
              <p className="font-mono text-xs text-[#666]">02</p>
              <p className="mt-1 text-xs text-[#999]">Explore</p>
            </div>
            <div className="h-7 w-px bg-[#292929]" />
            <div>
              <p className="font-mono text-xs text-[#666]">03</p>
              <p className="mt-1 text-xs text-[#999]">Build</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-[570px]">
            <div className="absolute -inset-4 rounded-2xl border border-[#252525]" />

            <div className="relative overflow-hidden rounded-xl border border-[#303030] bg-[#111] shadow-2xl shadow-black/50">
              <div className="flex h-11 items-center justify-between border-b border-[#292929] bg-[#171717] px-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#EAB308]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
                </div>
                <span className="font-mono text-[10px] text-[#777]">
                  flux — workspace
                </span>
                <Command size={14} className="text-[#666]" />
              </div>

              <div className="grid min-h-[300px] grid-cols-[112px_1fr] sm:grid-cols-[145px_1fr]">
                <div className="border-r border-[#292929] bg-[#141414] p-3">
                  <div className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-[#777]">
                    <PanelLeft size={12} /> Explorer
                  </div>

                  {[
                    ["folder", "src"],
                    ["file", "App.jsx"],
                    ["file", "main.jsx"],
                    ["folder", "components"],
                    ["file", "Navbar.jsx"],
                    ["file", "Hero.jsx"],
                    ["folder", "public"],
                    ["file", "index.html"],
                  ].map(([type, name], i) => (
                    <div
                      key={i}
                      className={`mb-2 flex items-center gap-2 rounded px-1.5 py-1 text-[10px] ${
                        name === "App.jsx"
                          ? "bg-blue-500/10 text-blue-400"
                          : "text-[#858585]"
                      }`}
                    >
                      {type === "folder" ? (
                        <FolderOpen size={12} />
                      ) : (
                        <FileCode2 size={12} />
                      )}
                      <span>{name}</span>
                    </div>
                  ))}
                </div>

                <div className="min-w-0">
                  <div className="flex h-9 items-center gap-3 border-b border-[#292929] bg-[#161616] px-3">
                    <span className="flex h-full items-center gap-2 border-b border-blue-400 px-2 text-[10px] text-[#DDD]">
                      <FileCode2 size={12} /> App.jsx
                    </span>
                  </div>

                  <div className="space-y-2 overflow-hidden p-4 font-mono text-[10px] leading-5 sm:text-xs">
                    <div className="text-[#666]">{"// Welcome to Flux"}</div>
                    <div>
                      <span className="text-[#C084FC]">import</span>{" "}
                      <span className="text-[#E5E5E5]">React</span>{" "}
                      <span className="text-[#C084FC]">from</span>{" "}
                      <span className="text-[#86EFAC]">'react'</span>;
                    </div>
                    <div className="pt-2">
                      <span className="text-[#C084FC]">function</span>{" "}
                      <span className="text-[#60A5FA]">App</span>() {"{"}
                    </div>
                    <div className="pl-4 text-[#C084FC]">
                      return <span className="text-[#E5E5E5]">(</span>
                    </div>
                    <div className="pl-8 text-[#E5E5E5]">
                      <span className="text-[#60A5FA]">{"<main"}</span>
                    </div>
                    <div className="pl-12 text-[#FBBF24]">
                      className=
                      <span className="text-[#86EFAC]">"workspace"</span>
                    </div>
                    <div className="pl-8 text-[#60A5FA]">{">"}</div>
                    <div className="pl-12 text-[#E5E5E5]">
                      Build something{" "}
                      <span className="text-[#60A5FA]">great.</span>
                    </div>
                    <div className="pl-8 text-[#60A5FA]">
                      {"</main>"}
                    </div>
                    <div className="pl-4 text-[#E5E5E5]">);</div>
                    <div className="text-[#E5E5E5]">{"}"}</div>
                    <div className="pt-2 text-[#C084FC]">
                      export default App;
                    </div>
                    <div className="mt-3 h-4 w-1 animate-pulse bg-blue-400" />
                  </div>
                </div>
              </div>

              <div className="flex h-9 items-center justify-between border-t border-[#292929] bg-[#151515] px-4">
                <div className="flex items-center gap-2 text-[9px] text-[#777]">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Ready
                </div>
                <span className="font-mono text-[9px] text-[#666]">
                  JavaScript · UTF-8
                </span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-lg border border-[#303030] bg-[#171717] p-3 shadow-xl sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-white">Code in motion.</p>
                <p className="mt-1 text-[10px] text-[#777]">
                  A new way to build
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section id="introduction" className="scroll-mt-24 border-b border-[#202020]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <SectionLabel number="01">The idea</SectionLabel>
          <SectionHeading
            title="Not just another place to write code."
            description="Flux is an AI-powered development environment that brings your coding workspace and AI-assisted development into one place."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-sm leading-8 text-[#929292] sm:text-base">
              The idea is simple: give developers a focused environment where
              they can work on projects, interact with their code and use AI as
              part of their development process.
            </p>
            <p className="mt-5 text-sm leading-8 text-[#929292] sm:text-base">
              Flux is still evolving. It doesn't aim to offer every capability
              of established development environments today. Instead, it is
              being built step by step, with a focus on creating a useful and
              intuitive development experience.
            </p>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              {
                icon: Code2,
                title: "Write",
                text: "Work with your code.",
              },
              {
                icon: Terminal,
                title: "Build",
                text: "Run your projects.",
              },
              {
                icon: Sparkles,
                title: "Explore",
                text: "Use AI assistance.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-xl border border-[#292929] bg-[#111] p-4 sm:p-5"
              >
                <item.icon size={21} className="mb-8 text-blue-400" />
                <h3 className="text-sm font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#777]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Workspace() {
  const workspaceItems = [
    {
      number: "01",
      title: "Project Explorer",
      description:
        "Navigate your project structure, browse folders and access the files you are working on.",
      icon: FolderOpen,
      image: "/images/guide/explorer.png",
      alt: "Flux project explorer",
    },
    {
      number: "02",
      title: "Code Editor",
      description:
        "Your primary coding area. Open files, write code and work on your project.",
      icon: Code2,
      image: "/images/guide/editor.png",
      alt: "Flux code editor",
    },
    {
      number: "03",
      title: "Integrated Terminal",
      description:
        "Execute development commands, install dependencies and interact with your project environment.",
      icon: Terminal,
      image: "/images/guide/terminal.png",
      alt: "Flux integrated terminal",
    },
    {
      number: "04",
      title: "AI Assistant",
      description:
        "Interact with the AI capabilities available in Flux to assist with your development tasks.",
      icon: Sparkles,
      image: "/images/guide/assistant.png",
      alt: "Flux AI assistant",
    },
  ];

  return (
    <section id="workspace" className="scroll-mt-24 border-b border-[#202020]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <SectionLabel number="02">The workspace</SectionLabel>
          <SectionHeading
            title="Everything starts here."
            description="Get familiar with the different parts of your development environment before starting your first project."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {workspaceItems.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.04}>
              <div className="group h-full overflow-hidden rounded-xl border border-[#292929] bg-[#111] transition duration-300 hover:border-[#444]">
                <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-[#292929] bg-[#151515]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#555]">
                    <item.icon size={30} strokeWidth={1.2} />
                    <span className="text-xs">Add Flux screenshot</span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-xs text-blue-400">
                      {item.number}
                    </span>
                    <item.icon
                      size={17}
                      className="text-[#777] transition group-hover:text-blue-400"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#888]">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GettingStarted() {
  const steps = [
    {
      title: "Open Flux",
      description:
        "Enter your development workspace and familiarize yourself with the available tools.",
      icon: Monitor,
    },
    {
      title: "Create or open a project",
      description:
        "Start a new project or access an existing project in your workspace.",
      icon: FolderOpen,
    },
    {
      title: "Explore your files",
      description:
        "Use the Explorer to navigate your folders and locate the files you want to work on.",
      icon: Files,
    },
    {
      title: "Start coding",
      description:
        "Open a file in the editor and begin writing or modifying your code.",
      icon: Code2,
    },
    {
      title: "Use the terminal",
      description:
        "Execute commands and run your development workflow.",
      icon: Terminal,
    },
    {
      title: "Explore AI assistance",
      description:
        "Try the available AI tools as part of your coding process.",
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="getting-started"
      className="scroll-mt-24 border-b border-[#202020]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <SectionLabel number="03">Your first project</SectionLabel>
          <SectionHeading
            title="From an empty workspace to your first project."
            description="Getting started should be simple. Follow these steps to begin working in Flux."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal className="flex flex-col justify-between">
            <div className="rounded-xl border border-[#292929] bg-[#111] p-6 sm:p-8">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Rocket size={23} />
              </div>
              <h3 className="text-xl font-medium text-white">
                Ready to get started?
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#888]">
                Start with a project, explore the tools and get comfortable
                with your workspace.
              </p>
              <a
                href="/"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                Open Flux <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative space-y-0"
          >
            <div className="absolute bottom-9 left-[17px] top-9 w-px bg-[#303030]" />

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex gap-5 pb-9 last:pb-0"
              >
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#333] bg-[#111] text-blue-400">
                  <step.icon size={16} />
                </div>
                <div className="pt-0.5">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-base font-medium text-white">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#555]">
                      STEP {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="max-w-lg text-sm leading-7 text-[#858585]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-24 border-b border-[#202020]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <SectionLabel number="04">Current capabilities</SectionLabel>
          <SectionHeading
            title="Start with what's here."
            description="Flux is under active development, but there is already a foundation to explore. Here's an overview of the capabilities available in the current version."
          />
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-xl border border-[#292929]">
          {capabilities.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <div
                className={`flex flex-col gap-4 bg-[#101010] p-5 transition hover:bg-[#141414] sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
                  index !== capabilities.length - 1
                    ? "border-b border-[#292929]"
                    : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#303030] bg-[#181818] text-blue-400">
                    <item.icon size={19} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#858585]">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`ml-14 w-fit shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-medium sm:ml-0 ${
                    item.status === "Available"
                      ? "border-[#315D43] bg-[#16301F] text-[#86C99A]"
                      : "border-[#5B4824] bg-[#302719] text-[#E8BD70]"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-5 text-xs leading-6 text-[#666]">
          Capability labels should be updated to reflect the actual state of
          the current Flux release.
        </p>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-24 border-b border-[#202020]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <SectionLabel number="05">The road ahead</SectionLabel>
          <SectionHeading
            title="We're just getting started."
            description="There are many ideas, improvements and capabilities we want to explore. Here's the direction we're working towards."
          />
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.05}>
              <div className="group h-full rounded-xl border border-[#292929] bg-[#111] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#444]">
                <div className="mb-9 flex items-center justify-between">
                  <span className="font-mono text-xs text-blue-400">
                    {item.number}
                  </span>
                  <span className="rounded-full border border-[#303030] px-2.5 py-1 text-[10px] text-[#777]">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#858585]">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-xs text-[#666]">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Future direction
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs leading-6 text-[#666]">
          This roadmap represents development direction, not guaranteed
          features or release dates.
        </p>
      </div>
    </section>
  );
}

function Limitations() {
  const limitations = [
    "Some familiar IDE capabilities may not be available yet.",
    "Certain workflows may have limitations.",
    "AI capabilities may still be experimental.",
    "Features and interface elements may change between updates.",
  ];

  return (
    <section
      id="limitations"
      className="scroll-mt-24 border-b border-[#202020]"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-32">
        <Reveal>
          <SectionLabel number="06">Transparency</SectionLabel>
          <SectionHeading
            title="Still evolving. And that's okay."
            description="Flux is in an early stage of development. Not every workflow is complete, and some capabilities may change as the product evolves."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-[#292929] bg-[#111] p-6 sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#493B25] bg-[#302719] text-[#E8BD70]">
                <Lightbulb size={19} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  What to expect
                </h3>
                <p className="mt-1 text-xs text-[#777]">
                  A transparent look at the current product
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {limitations.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#292929]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#999]" />
                  </span>
                  <p className="text-sm leading-6 text-[#999]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#292929] pt-6">
              <p className="text-sm leading-7 text-[#777]">
                Our goal is to improve the product through development,
                testing and real user feedback.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Tutorials() {
  return (
    <section id="tutorials" className="scroll-mt-24 border-b border-[#202020]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <SectionLabel number="07">Learn by doing</SectionLabel>
          <SectionHeading
            title="Need a little guidance?"
            description="Explore practical guides to understand the workspace and make the most of Flux."
          />
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {tutorials.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <div className="group flex items-center gap-4 rounded-xl border border-[#292929] bg-[#111] p-5 transition hover:border-[#444] hover:bg-[#151515]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#303030] bg-[#191919] text-blue-400">
                  <item.icon size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#777]">
                    {item.description}
                  </p>
                </div>
                <ChevronRight
                  size={17}
                  className="shrink-0 text-[#666] transition group-hover:translate-x-1 group-hover:text-blue-400"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-5 text-xs text-[#666]">
          Detailed tutorials can be added as the corresponding workflows are
          documented.
        </p>
      </div>
    </section>
  );
}

function Feedback() {
  const [feedbackType, setFeedbackType] = useState("Suggestion");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Flux ${feedbackType}`);
    const body = encodeURIComponent(
      `Type: ${feedbackType}\n\n${message}\n\nContact: ${email || "Not provided"}`
    );

    window.location.href = `mailto:feedback@flux.dev?subject=${subject}&body=${body}`;
  };

  return (
    <section id="feedback" className="scroll-mt-24 border-b border-[#202020]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionLabel number="08">The community</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Help us make Flux better.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-8 text-[#929292]">
              Every early user brings a different perspective. Your feedback
              helps identify what works, what needs improvement and what
              deserves attention next.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: Bug,
                  title: "Report bugs",
                  text: "Tell us when something doesn't work as expected.",
                },
                {
                  icon: Lightbulb,
                  title: "Suggest features",
                  text: "Share ideas that could improve the experience.",
                },
                {
                  icon: MessageSquare,
                  title: "Share your experience",
                  text: "Let us know what works and what doesn't.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#303030] bg-[#151515] text-blue-400">
                    <item.icon size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-[#777]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-[#292929] bg-[#111] p-6 sm:p-8"
            >
              <h3 className="text-lg font-medium text-white">
                Send us your feedback
              </h3>
              <p className="mt-2 text-sm text-[#777]">
                Every bit of feedback helps us improve.
              </p>

              <label className="mt-8 block text-xs font-medium text-[#AAA]">
                Feedback type
              </label>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["Suggestion", "Bug report", "Other"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFeedbackType(type)}
                    className={`rounded-lg border px-2 py-3 text-xs transition ${
                      feedbackType === type
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                        : "border-[#303030] bg-[#151515] text-[#888] hover:border-[#555]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <label
                htmlFor="feedback-message"
                className="mt-7 block text-xs font-medium text-[#AAA]"
              >
                Your message
              </label>
              <textarea
                id="feedback-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={5}
                className="mt-3 w-full resize-none rounded-lg border border-[#303030] bg-[#0C0C0C] p-4 text-sm text-white outline-none transition placeholder:text-[#555] focus:border-blue-500/60"
              />

              <label
                htmlFor="feedback-email"
                className="mt-6 block text-xs font-medium text-[#AAA]"
              >
                Email address <span className="text-[#666]">(optional)</span>
              </label>
              <input
                id="feedback-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-3 w-full rounded-lg border border-[#303030] bg-[#0C0C0C] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#555] focus:border-blue-500/60"
              />

              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-blue-400"
              >
                Send feedback <ArrowUpRight size={16} />
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-[#666]">
                This opens your email application. Configure the feedback
                address before publishing.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0D0D0D]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-24 text-center sm:px-8 lg:px-12 lg:py-32">
          <Reveal>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">
              FLUX / END OF GUIDE
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Enough exploring.
              <br />
              <span className="text-blue-400">Time to build.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-[#888] sm:text-base">
              You've seen what Flux is, how the workspace works and where it's
              headed. Now make something of your own.
            </p>

            <a
              href="/"
              className="mt-10 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[#DDD]"
            >
              Open Flux <ArrowUpRight size={16} />
            </a>

            <p className="mt-12 font-mono text-xs tracking-[0.2em] text-[#555]">
              CODE IN MOTION.
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-[#222] bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 px-5 py-7 sm:flex-row sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-2">
            <Zap size={17} className="text-blue-400" />
            <span className="text-sm font-semibold text-white">flux.</span>
          </a>

          <p className="text-xs text-[#666]">
            Built with curiosity. Designed for developers.
          </p>

          <div className="flex items-center gap-5 text-xs text-[#777]">
            <a href="/" className="transition hover:text-white">
              Home
            </a>
            <a href="/behind-flux" className="transition hover:text-white">
              Behind Flux
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function TableOfContents() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMobileOpen(false);
  };

  return (
    <>
      <aside className="sticky top-[68px] hidden h-[calc(100vh-68px)] w-[230px] shrink-0 border-r border-[#222] bg-[#0A0A0A] lg:block">
        <div className="px-5 py-9">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#666]">
            ON THIS PAGE
          </p>

          <div className="space-y-1">
            {sections.map((section, index) => {
              const active = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => navigate(section.id)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs transition ${
                    active
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-[#777] hover:bg-[#151515] hover:text-[#DDD]"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10 border-t border-[#252525] pt-6">
            <p className="text-[10px] leading-5 text-[#666]">
              FLUX DOCUMENTATION
              <br />
              PRODUCT GUIDE · V1.0
            </p>
          </div>
        </div>
      </aside>

      <div className="fixed bottom-5 right-5 z-40 lg:hidden">
        {mobileOpen && (
          <div className="mb-3 w-64 rounded-xl border border-[#333] bg-[#141414] p-3 shadow-2xl">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => navigate(section.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-xs ${
                  activeSection === section.id
                    ? "text-blue-400"
                    : "text-[#999]"
                }`}
              >
                <span className="font-mono text-[10px] text-[#555]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.label}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 rounded-lg border border-[#383838] bg-[#171717] px-4 py-3 text-xs font-medium text-white shadow-xl"
        >
          <BookOpen size={15} />
          Page navigation
          {mobileOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>
    </>
  );
}

export default function FluxGuide() {
  useEffect(() => {
    document.title = "Flux Guide — Code in Motion";
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-[#FAFAFA] selection:bg-blue-500/30 selection:text-white">
      <Navbar />

      <Hero />

      <div className="mx-auto flex max-w-[1440px] items-start">
        <TableOfContents />

        <main className="min-w-0 flex-1">
          <Introduction />
          <Workspace />
          <GettingStarted />
          <Capabilities />
          <Roadmap />
          <Limitations />
          <Tutorials />
          <Feedback />
        </main>
      </div>

      <Footer />
    </div>
  );
}
