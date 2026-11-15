
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Code2,
  PanelsTopLeft,
  UserRound,
  LayoutDashboard,
  AppWindow,
  Braces,
  Sparkles,
  UploadCloud,
} from "lucide-react";

const categories = [
  {
    id: "portfolio",
    number: "01",
    title: "Portfolio & Resume",
    description:
      "Build your personal identity with professional portfolios, resumes and developer profiles.",
    icon: UserRound,
    count: "Personal websites",
    tags: ["Portfolio", "Resume", "CV"],
    accent: "blue",
    preview: "portfolio",
  },
  {
    id: "landing-pages",
    number: "02",
    title: "Landing Pages",
    description:
      "Launch products and ideas with conversion-focused landing pages and modern website designs.",
    icon: PanelsTopLeft,
    count: "Website templates",
    tags: ["SaaS", "Startup", "Product"],
    accent: "violet",
    preview: "landing",
  },
  {
    id: "components",
    number: "03",
    title: "UI Components",
    description:
      "Discover reusable sections and interface elements ready to integrate into your projects.",
    icon: AppWindow,
    count: "Reusable elements",
    tags: ["Hero", "Navbar", "Pricing"],
    accent: "cyan",
    preview: "components",
  },
  {
    id: "dashboards",
    number: "04",
    title: "Dashboards",
    description:
      "Get started with analytics panels, admin interfaces and data-driven application layouts.",
    icon: LayoutDashboard,
    count: "Dashboard kits",
    tags: ["Admin", "Analytics", "CRM"],
    accent: "emerald",
    preview: "dashboard",
  },
  {
    id: "applications",
    number: "05",
    title: "Application Starters",
    description:
      "Start building functional applications with ready-made structures and essential features.",
    icon: Code2,
    count: "Project starters",
    tags: ["Auth", "Chat", "E-commerce"],
    accent: "orange",
    preview: "application",
  },
  {
    id: "snippets",
    number: "06",
    title: "Code Snippets",
    description:
      "Speed up development with reusable utilities, hooks, animations and practical code examples.",
    icon: Braces,
    count: "Code collection",
    tags: ["React", "Hooks", "Utilities"],
    accent: "pink",
    preview: "snippets",
  },
];

const accentStyles = {
  blue: {
    text: "text-blue-400",
    border: "group-hover:border-blue-500/40",
    icon: "group-hover:bg-blue-500/10 group-hover:border-blue-500/30",
    glow: "from-blue-500/15",
  },
  violet: {
    text: "text-violet-400",
    border: "group-hover:border-violet-500/40",
    icon: "group-hover:bg-violet-500/10 group-hover:border-violet-500/30",
    glow: "from-violet-500/15",
  },
  cyan: {
    text: "text-cyan-400",
    border: "group-hover:border-cyan-500/40",
    icon: "group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30",
    glow: "from-cyan-500/15",
  },
  emerald: {
    text: "text-emerald-400",
    border: "group-hover:border-emerald-500/40",
    icon: "group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30",
    glow: "from-emerald-500/15",
  },
  orange: {
    text: "text-orange-400",
    border: "group-hover:border-orange-500/40",
    icon: "group-hover:bg-orange-500/10 group-hover:border-orange-500/30",
    glow: "from-orange-500/15",
  },
  pink: {
    text: "text-pink-400",
    border: "group-hover:border-pink-500/40",
    icon: "group-hover:bg-pink-500/10 group-hover:border-pink-500/30",
    glow: "from-pink-500/15",
  },
};

function CategoryPreview({ type, accent }) {
  return (
    <div className="relative h-[145px] overflow-hidden rounded-lg border border-[#292929] bg-[#0B0B0B] p-3 transition-all duration-500 group-hover:border-[#444]">
      {type === "portfolio" && (
        <div className="flex h-full items-center justify-center gap-4">
          <div className="space-y-2">
            <div className="h-2 w-16 rounded bg-blue-400/70" />
            <div className="h-2 w-24 rounded bg-[#555]" />
            <div className="h-2 w-20 rounded bg-[#333]" />
            <div className="mt-4 h-5 w-16 rounded bg-blue-500/20" />
          </div>
          <div className="h-20 w-16 rounded-lg border border-[#333] bg-gradient-to-br from-blue-500/30 to-[#171717]" />
        </div>
      )}

      {type === "landing" && (
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <div className="h-2 w-12 rounded bg-violet-400/60" />
          <div className="h-3 w-36 rounded bg-[#aaa]" />
          <div className="h-2 w-24 rounded bg-[#444]" />
          <div className="h-6 w-20 rounded-md bg-violet-500/30" />
          <div className="flex gap-2">
            <div className="h-8 w-16 rounded bg-[#222]" />
            <div className="h-8 w-16 rounded bg-[#222]" />
          </div>
        </div>
      )}

      {type === "components" && (
        <div className="grid h-full grid-cols-3 gap-2">
          <div className="col-span-3 flex h-6 items-center gap-2 rounded border border-[#292929] px-2">
            <div className="h-2 w-12 rounded bg-cyan-400/60" />
            <div className="ml-auto h-2 w-8 rounded bg-[#444]" />
          </div>
          <div className="rounded border border-[#292929] bg-[#151515]" />
          <div className="rounded border border-cyan-500/20 bg-cyan-500/10" />
          <div className="rounded border border-[#292929] bg-[#151515]" />
          <div className="col-span-3 h-5 rounded bg-[#171717]" />
        </div>
      )}

      {type === "dashboard" && (
        <div className="flex h-full gap-2">
          <div className="w-9 rounded bg-[#171717] p-2">
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-2 rounded bg-emerald-400/30" />
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 rounded bg-[#222]" />
              ))}
            </div>
            <div className="flex h-16 items-end gap-2 rounded bg-[#171717] p-2">
              {[35, 65, 45, 85, 55, 95, 70].map((height, i) => (
                <div
                  key={i}
                  style={{ height: `${height}%` }}
                  className="flex-1 rounded-t bg-emerald-400/50"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {type === "application" && (
        <div className="flex h-full items-center justify-center gap-3">
          <div className="space-y-2">
            <div className="h-16 w-24 rounded border border-[#333] bg-[#171717] p-2">
              <div className="h-2 w-12 rounded bg-orange-400/60" />
              <div className="mt-3 h-2 w-16 rounded bg-[#444]" />
              <div className="mt-2 h-2 w-10 rounded bg-[#333]" />
            </div>
            <div className="h-3 w-24 rounded bg-[#222]" />
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
            <AppWindow size={26} className="text-orange-400" />
          </div>
        </div>
      )}

      {type === "snippets" && (
        <div className="flex h-full flex-col justify-center gap-2 rounded bg-[#111] p-3 font-mono text-[10px]">
          <p className="text-pink-400">const <span className="text-[#aaa]">build</span> = () =&gt; {"{"}</p>
          <p className="pl-4 text-[#777]">return <span className="text-emerald-400">"Create"</span>;</p>
          <p className="text-pink-400">{"}"}</p>
          <div className="mt-1 h-px bg-[#292929]" />
          <p className="text-[#555]">// Ready to reuse</p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

const TemplateCategories = () => {
  const navigate = useNavigate();

  const exploreCategory = (id) => {
    navigate(`/templates?category=${id}`);
  };

  return (
    <section className="border-b border-[#202020] bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-blue-500" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">
              EXPLORE THE LIBRARY
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            A starting point for
            <span className="text-blue-400"> every idea.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#888] sm:text-base">
            From complete websites to individual code components,
            find the building blocks you need and make them your own.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;
            const style = accentStyles[item.accent];

            return (
              <div
                key={item.id}
                onClick={() => exploreCategory(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    exploreCategory(item.id);
                  }
                }}
                role="link"
                tabIndex={0}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border border-[#292929] bg-[#111] p-5 transition-all duration-400 hover:-translate-y-1 hover:bg-[#141414] sm:p-6 ${style.border}`}
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${style.glow} to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[#303030] bg-[#171717] text-[#888] transition-all duration-300 ${style.icon} ${style.text}`}
                    >
                      <Icon size={19} />
                    </div>

                    <span className="font-mono text-[10px] text-[#555]">
                      {item.number}
                    </span>
                  </div>

                  <CategoryPreview
                    type={item.preview}
                    accent={item.accent}
                  />

                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-medium text-white transition-colors group-hover:text-blue-400">
                        {item.title}
                      </h3>
                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-[#555] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400"
                      />
                    </div>

                    <p className="mt-3 min-h-[66px] text-sm leading-6 text-[#888]">
                      {item.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[#292929] bg-[#171717] px-2.5 py-1.5 text-[10px] text-[#888] transition-colors group-hover:border-[#383838]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#292929] pt-4">
                      <span className="font-mono text-[10px] text-[#666]">
                        {item.count}
                      </span>
                      <span className={`text-xs font-medium ${style.text}`}>
                        Explore category
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#292929] bg-[#101010] p-6 sm:flex-row sm:p-8">
          <div>
            <h3 className="text-base font-medium text-white">
              Have an idea in mind?
            </h3>
            <p className="mt-1 text-sm text-[#777]">
              Find a starting point and turn it into something yours.
            </p>
          </div>

          <button
            onClick={() => navigate("/templates")}
            className="group flex shrink-0 items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400"
          >
            Browse all templates
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>

            {/* Contribution Button */}
            <button
            onClick={() => navigate("/library/contribute")}
            className="flex w-fit items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-400 transition hover:border-blue-400 hover:bg-blue-500 hover:text-white"
          >
            <UploadCloud size={17} />
            Contribute a Template
            <ArrowUpRight size={16} />
          </button>

        </div>
      </div>
    </section>
  );
}

export default TemplateCategories