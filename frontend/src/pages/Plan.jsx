import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Crown,
  Sparkles,
  Zap,
  Users,
  ShieldCheck,
  Infinity,
  Gauge,
  Layers3,
} from "lucide-react";

import { createPayment, verifyPayment } from "../features/payment";
import logo from "../assets/images/fluxLogo.webp";
import { EASE } from "../lib/motion";

const plans = [
  {
    key: "free",
    name: "Free",
    description: "Explore your ideas and start building.",
    price: "₹0",
    period: "/month",
    credits: "100",
    creditLabel: "AI credits / month",
    icon: Zap,
    features: [
      "100 AI credits per month",
      "AI code generation",
      "Project editor",
      "HTML / CSS / JS preview",
      "React preview",
      "Basic project management",
    ],
    button: "Current Plan",
    current: true,
  },
  {
    key: "pro",
    name: "Pro",
    description: "For developers who build regularly.",
    price: "₹299",
    period: "/month",
    credits: "500",
    creditLabel: "AI credits / month",
    icon: Crown,
    features: [
      "500 AI credits per month",
      "Everything in Free",
      "Priority AI generation",
      "Larger projects",
      "Unlimited projects",
      "Advanced AI coding",
      "Priority support",
    ],
    button: "Upgrade to Pro",
    popular: true,
  },
  {
    key: "team",
    name: "Team",
    description: "For teams building products together.",
    price: "₹799",
    period: "/month",
    credits: "2,000",
    creditLabel: "AI credits / month",
    icon: Sparkles,
    features: [
      "2,000 AI credits per month",
      "Everything in Pro",
      "Team collaboration",
      "Shared projects",
      "Higher AI limits",
      "Priority processing",
      "Team support",
    ],
    button: "Upgrade to Team",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const featureHighlights = [
  {
    icon: Sparkles,
    title: "AI-powered coding",
    description: "Generate and improve code with AI assistance.",
  },
  {
    icon: Gauge,
    title: "Faster workflow",
    description: "Spend less time on repetitive coding tasks.",
  },
  {
    icon: Layers3,
    title: "Project workspace",
    description: "Manage and build your projects in one place.",
  },
  {
    icon: Users,
    title: "Team-ready",
    description: "Collaborate with your team on shared projects.",
  },
];

const Plan = () => {
  const navigate = useNavigate();
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false);

  const handlePayment = async (plan) => {
    try {
      if (plan.key === "free" || plan.current) return;

      const data = await createPayment(plan.key);

      if (!data?.key_id || !data?.order?.id) {
        throw new Error("Invalid payment order response");
      }

      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency || "INR",
        name: "flux.ide",
        description: `Plan ${plan.name}`,
        order_id: data.order.id,

        handler: async (res) => {
          try {
            const {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            } = res;

            const verification = await verifyPayment({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            });

            console.log("Payment verification:", verification);
          } catch (error) {
            console.error("Payment verification failed:", error);
          }
        },

        theme: {
          color: "#0057FF",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
    }
  };

  return (
    <div
    className="relative isolate min-h-screen overflow-hidden bg-[#09090B] px-5 py-6 text-[#FAFAFA] selection:bg-[#0057FF]/30 sm:px-8"
    onMouseEnter={() => setIsBackgroundHovered(true)}
    onMouseLeave={() => setIsBackgroundHovered(false)}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
  
      e.currentTarget.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );
  
      e.currentTarget.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    }}
  >
    {/* Default dotted background */}
    <div aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255, 255, 255, 0) 1px, transparent 1.2px)",
        backgroundSize: "15px 15px",
      }}
    />
  
    {/* Blue dots following cursor */}
    <div aria-hidden="true"
  className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-200 ${
    isBackgroundHovered ? "opacity-40" : "opacity-0"
  }`}
  style={{
    backgroundImage:
      "radial-gradient(circle, rgba(59, 131, 246, 0.73) 1px, transparent 1.5px)",
    backgroundSize: "15px 15px",
    maskImage:
  "radial-gradient(140px circle at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)",
WebkitMaskImage:
  "radial-gradient(140px circle at var(--mouse-x, 50%) var(--mouse-y, 30%), black 0%, transparent 100%)",
    
  }}
/>
  
    {/* Main page content */}
    <div className="relative z-10 mx-auto max-w-7xl">

        {/* Navbar */}
        <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="navbar-beam relative z-20 mb-12 flex h-[70px] w-full items-center justify-between rounded-md px-3"
      >
        <motion.button
          type="button"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
        className="group inline-flex items-center gap-2 rounded-md bg-[#111113] px-3.5 py-2.5 text-xs font-medium text-[#A1A1AA] transition-colors"
        >
          <ArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to workspace
        </motion.button>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Flux IDE home"
          onClick={() => navigate("/")}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3B82F6]">
            <img src={logo} alt="Flux" className="h-7 w-7 object-contain" />
          </div>

          <span className="text-[15px] font-medium tracking-tight text-[#FAFAFA]">
            flux<span className="text-blue-500">.ide</span>
          </span>
        </button>
      </motion.header>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-2xl text-center">
 
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#111113] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#A1A1AA]">
            <Sparkles size={12} className="text-[#3B82F6]" />
            Pricing plans
          </div>

          <h1 className="text-4xl font-semibold leading-[1.12] tracking-[-1.8px] text-[#FAFAFA] sm:text-5xl sm:tracking-[-2.2px]">
            Build more.
            <span className="text-[#0057FF]"> Pay less.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#A1A1AA]">
            Choose a plan that fits your workflow. Get the AI credits and
            developer tools you need to keep building.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] text-[#A1A1AA]">
            <span className="flex items-center gap-2">
              <Check size={13} className="text-[#3B82F6]" />
              Start for free
            </span>

            <span className="flex items-center gap-2">
              <Check size={13} className="text-[#3B82F6]" />
              Upgrade anytime
            </span>

            <span className="flex items-center gap-2">
              <Check size={13} className="text-[#3B82F6]" />
              Developer-focused tools
            </span>
          </div>
        </motion.section>

        {/* Pricing Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.key}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`pricing-card group relative flex flex-col rounded-xl p-6 sm:p-7 ${
                  plan.popular ? "pricing-card-popular" : ""
                }`}
                // className={`relative flex flex-col rounded-xl border p-6 transition-colors duration-200 sm:p-7 ${
                //   plan.popular
                //     ? "border-[#0057FF]/60 bg-[#111113]"
                //     : "border-[#27272A] bg-[#111113] hover:border-[#3F3F46]"
                // }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#0057FF]/40 bg-[#111113] px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#60A5FA]">
                      <Sparkles size={11} />
                      Most popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-7 flex items-start justify-between">
                  <div>
                    <div
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 group-hover:border-[#0057FF]/40 group-hover:bg-[#0057FF]/10 group-hover:text-[#60A5FA] ${
                        plan.popular 
                          ? "border-[#0057FF]/30 bg-[#0057FF]/10 text-[#60A5FA]"
                          : "border-[#27272A] bg-[#18181B] text-[#A1A1AA]"
                      }`}
                    >
                      <Icon size={19} strokeWidth={1.8}
                      className="relative z-10 transition-transform duration-300 group-hover:rotate-360" />
                    </div>

                    <h2 className="text-lg font-semibold tracking-tight text-[#FAFAFA]">
                      {plan.name}
                    </h2>

                    <p className="mt-1.5 text-xs leading-relaxed text-[#A1A1AA]">
                      {plan.description}
                    </p>
                  </div>

                  {plan.current && (
                    <span className="rounded-full border border-[#27272A] bg-[#18181B] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-[#A1A1AA]">
                      Active
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-[-1.8px] text-[#FAFAFA]">
                      {plan.price}
                    </span>

                    <span className="text-xs text-[#71717A]">
                      {plan.period}
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] text-[#71717A]">
                    {plan.key === "free"
                      ? "No payment required"
                      : "Billed monthly"}
                  </p>
                </div>

                {/* AI Credits */}
                <div
                  className={`mb-6 rounded-lg border p-4 ${
                    plan.popular
                      ? "border-[#0057FF]/30 bg-[#0057FF]/[0.06]"
                      : "border-[#27272A] bg-[#18181B]/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#D4D4D8]">
                      <Zap
                        size={14}
                        className={
                          plan.popular ? "text-[#60A5FA]" : "text-[#A1A1AA]"
                        }
                      />
                      Monthly AI allowance
                    </div>

                    <span className="text-[10px] text-[#71717A]">
                      Included
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold tracking-tight text-[#FAFAFA]">
                      {plan.credits}
                    </span>

                    <span className="text-[11px] text-[#A1A1AA]">
                      {plan.creditLabel}
                    </span>
                  </div>

                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#27272A]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          plan.key === "free"
                            ? "15%"
                            : plan.key === "pro"
                              ? "45%"
                              : "100%",
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                      className={`h-full rounded-full ${
                        plan.popular ? "bg-[#0057FF]" : "bg-[#71717A]"
                      }`}
                    />
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  type="button"
                  onClick={() => handlePayment(plan)}
                  whileTap={{ scale: 0.98 }}
                  disabled={plan.current}
                  className={`mb-7 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-medium transition-all duration-200 ${
                    plan.current
                      ? "cursor-not-allowed border border-[#27272A] bg-[#18181B] text-[#71717A]"
                      : plan.popular
                        ? "bg-[#0057FF] text-white hover:bg-[#1768FF]"
                        : "border border-[#3F3F46] bg-[#18181B] text-[#FAFAFA] hover:border-[#0057FF]/60 hover:bg-[#0057FF]/[0.06]"
                  }`}
                >
                  {plan.current ? (
                    <>
                      <Check size={14} />
                      {plan.button}
                    </>
                  ) : (
                    <>
                      {plan.button}
                      <ArrowRight size={14} />
                    </>
                  )}
                </motion.button>

                {/* Features */}
                <div className="flex-1">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#71717A]">
                    What's included
                  </p>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: 0.2 + index * 0.035,
                        }}
                        className="flex items-start gap-3 text-[11.5px] leading-relaxed text-[#D4D4D8]"
                      >
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            plan.popular
                              ? "bg-[#0057FF]/15 text-[#60A5FA]"
                              : "bg-[#27272A] text-[#A1A1AA]"
                          }`}
                        >
                          <Check size={10} strokeWidth={2.5} />
                        </span>

                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Label */}
                <div className="mt-7 border-t border-[#27272A] pt-4">
                  <p className="flex items-center gap-2 text-[10px] text-[#71717A]">
                    <ShieldCheck size={13} className="text-[#A1A1AA]" />

                    {plan.key === "free"
                      ? "A great place to start"
                      : plan.key === "pro"
                        ? "For serious individual builders"
                        : "Built for collaborative teams"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        <p className="mt-7 text-center text-[11px] text-[#71717A]">
          Credits reset every month. Unused credits do not roll over.
        </p>

        {/* Feature Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="mb-9 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
              Made for your workflow
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#FAFAFA] sm:text-3xl">
              More than just an editor.
            </h2>

            <p className="mt-3 text-xs text-[#A1A1AA] sm:text-sm">
              Everything you need to turn ideas into working software.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featureHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg border border-[#27272A] bg-[#111113] p-5 transition-colors hover:border-[#3F3F46]"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B] text-[#60A5FA]">
                    <Icon size={17} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-xs font-semibold text-[#FAFAFA]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-relaxed text-[#A1A1AA]">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-10 mt-16 max-w-5xl rounded-xl border border-[#27272A] bg-[#111113] px-6 py-10 text-center sm:px-12"
        >
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B] text-[#60A5FA]">
            <Code2 size={19} />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#FAFAFA] sm:text-3xl">
            Your next big idea starts here.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-[#A1A1AA] sm:text-sm">
            Start building with flux.ide and choose the plan that grows
            with your development journey.
          </p>

          <motion.button
            onClick={() => navigate(-1)}
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: EASE }}
            className="new-project-btn group relative isolate mt-4 inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#3B82F6] px-4 py-2.5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-transparent sm:w-auto"
          >
            Back to building
            <ArrowRight 
            size={14}
            strokeWidth={2}
            className="relative z-10 transition-transform duration-300 group-hover:rotate-360" />
          </motion.button>

        </motion.section>

        {/* Footer */}
        <footer className="flex z-20 bg-[#09090B] flex-col items-center justify-between gap-3 border-t border-[#27272A] py-6 text-[10px] text-[#71717A] sm:flex-row">
          <p>
            © {new Date().getFullYear()} flux.ide | Built for developers.
          </p>

          <div className="flex items-center gap-2">
            <Infinity size={13} />
            <span>Keep building. Keep shipping.</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Plan;
