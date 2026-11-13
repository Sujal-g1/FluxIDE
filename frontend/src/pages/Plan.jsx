
import { useNavigate } from "react-router-dom";
import { keyframes, motion } from "framer-motion";
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
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};


const Plan = () => {
  const navigate = useNavigate();

  const handlePayment = async(plan)=>{
    try {
    if(plan.key =="free" || plan.current) return 
    const data = await createPayment(plan.key)

    if (!data?.key_id || !data?.order?.id) {
      throw new Error("Invalid payment order response");
    }

    console.log(data);
    const options = {
      key: data.key_id,
      amount: data.order.amount,
      currency: data.order.currency || "INR",
      name: "flux.ide",
      description: `Plan ${plan.name}`,
      order_id: data.order.id,

      handler: async(res)=>{
      // console.log(res);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = res 
      const data = await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
      console.log(data);
      },
      theme:{
        color: "#4f46e5"
      }
    }
    const razorpay = new window.Razorpay(options)
    razorpay.open()
      
    } catch (error) {
      console.log(error);
      
    }
   }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090d] px-5 py-6 text-white selection:bg-blue-500/30 sm:px-8">

      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.12] blur-[150px]" />
        <div className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-blue-600/[0.10] blur-[160px]" />
        <div className="absolute bottom-0 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/[0.06] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Navbar */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center justify-between"
        >
          <motion.button
            type="button"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-2.5 text-xs font-medium text-slate-400 backdrop-blur-xl transition-all hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-white"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to workspace
          </motion.button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 shadow-lg shadow-blue-500/10">
              <Code2 size={19} className="text-blue-300" />
            </div>

            <span className="text-base font-bold tracking-tight">
              flux<span className="text-blue-400">.ide</span>
            </span>
          </div>
        </motion.header>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2 text-[11px] font-semibold tracking-wide text-blue-300 shadow-lg shadow-blue-500/[0.04]">
            <Sparkles size={13} />
            PRICING BUILT FOR DEVELOPERS
            <span className="h-1 w-1 rounded-full bg-blue-400" />
          </div>

          <h1 className="text-4xl font-bold leading-[1.12] tracking-[-1.8px] sm:text-6xl sm:tracking-[-2.8px]">
            Build without limits.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Choose your power.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            From your first experiment to production-ready applications,
            get the AI credits and tools you need to keep building.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-[11px] text-slate-500">
            <span className="flex items-center gap-2">
              <Check size={13} className="text-emerald-400" />
              Start for free
            </span>
            <span className="flex items-center gap-2">
              <Check size={13} className="text-emerald-400" />
              Upgrade anytime
            </span>
            <span className="flex items-center gap-2">
              <Check size={13} className="text-emerald-400" />
              Developer-focused tools
            </span>
          </div>
        </motion.section>

        {/* Pricing cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
        {plans.map((plan) => {
          const Icon = plan.icon;

          return (
          <motion.div
            key={plan.key}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: { duration: 0.2 },
                }}
                className={`group relative flex flex-col rounded-2xl p-px ${
                  plan.popular
                    ? "bg-gradient-to-b from-blue-400/80 via-indigo-500/40 to-blue-500/10 shadow-[0_0_60px_rgba(139,92,246,0.12)]"
                    : "border border-white/[0.09] bg-white/[0.025]"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-blue-300/30 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30">
                      <Sparkles size={11} />
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[15px] p-6 sm:p-7 ${
                    plan.popular
                      ? "bg-[#11111a]"
                      : "bg-[#0d0e14] transition-colors group-hover:bg-[#11121a]"
                  }`}
                >
                  {/* Card glow */}
                  {plan.popular && (
                    <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-500/[0.12] blur-[85px]" />
                  )}

                  {/* Plan header */}
                  <div className="relative mb-7 flex items-start justify-between">
                    <div>
                      <div
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${
                          plan.popular
                            ? "border-blue-400/20 bg-blue-500/15 text-blue-300"
                            : plan.current
                              ? "border-blue-400/15 bg-blue-500/10 text-blue-300"
                              : "border-white/[0.08] bg-white/[0.04] text-slate-300"
                        }`}
                      >
                        <Icon size={20} />
                      </div>

                      <h2 className="text-lg font-bold tracking-tight text-white">
                        {plan.name}
                      </h2>

                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        {plan.description}
                      </p>
                    </div>

                    {plan.current && (
                      <span className="rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-blue-300">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="relative mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-[-1.8px] text-white">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-500">
                        {plan.period}
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] text-slate-500">
                      {plan.key === "free"
                        ? "No payment required"
                        : "Billed monthly"}
                    </p>
                  </div>

                  {/* AI Credits */}
                  <div
                    className={`relative mb-7 rounded-xl border p-4 ${
                      plan.popular
                        ? "border-blue-400/20 bg-blue-500/[0.08]"
                        : "border-white/[0.07] bg-white/[0.025]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <Zap
                          size={14}
                          className={
                            plan.popular
                              ? "text-blue-300"
                              : "text-amber-400"
                          }
                        />
                        Monthly AI allowance
                      </div>

                      <span className="text-[10px] text-slate-500">
                        Included
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-bold tracking-tight text-white">
                        {plan.credits}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {plan.creditLabel}
                      </span>
                    </div>

                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.07]">
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
                          duration: 1,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-blue-500 to-indigo-400"
                            : "bg-gradient-to-r from-slate-500 to-slate-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    type="button"
                    onClick={()=> handlePayment(plan)}
                    whileTap={{ scale: 0.97 }}
                    disabled={plan.current}
                    className={`relative mb-7 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-200 ${
                      plan.current
                        ? "cursor-not-allowed border border-white/[0.08] bg-white/[0.04] text-slate-500"
                        : plan.popular 
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/30"
                          : "border border-white/[0.12] bg-white/[0.06] text-white hover:border-white/20 hover:bg-white/[0.11]"
                    }`}
                  >
                    {plan.current ? (
                      <>
                        <Check size={15} />
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
                  <div className="relative flex-1">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      What's included
                    </p>

                    <ul className="space-y-3.5">
                      {plan.features.map((feature, index) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.35 + index * 0.045,
                          }}
                          className="flex items-start gap-3 text-[11.5px] leading-relaxed text-slate-300"
                        >
                          <span
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                              plan.popular
                                ? "bg-blue-400/15 text-blue-300"
                                : "bg-emerald-400/10 text-emerald-400"
                            }`}
                          >
                            <Check size={10} strokeWidth={3} />
                          </span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom label */}
                  <div className="relative mt-7 border-t border-white/[0.07] pt-4">
                    <p className="flex items-center gap-2 text-[10px] text-slate-500">
                      <ShieldCheck size={13} className="text-emerald-400" />
                      {plan.key === "free"
                        ? "A great place to start"
                        : plan.key === "pro"
                          ? "For serious individual builders"
                          : "Built for collaborative teams"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        <div className="mt-10 text-center text-[11px] text-slate-400 dark:text-slate-600">
          Credits reset every month. Unused credits do not roll over
        </div>

        {/* Feature highlights */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="mb-9 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
              Made for your workflow
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              More than just an editor.
            </h2>

            <p className="mt-3 text-xs text-slate-500 sm:text-sm">
              Everything you need to turn ideas into working software.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors hover:border-blue-400/20 hover:bg-white/[0.045]"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/[0.08] text-blue-300">
                    <Icon size={17} />
                  </div>

                  <h3 className="text-xs font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-10 mt-16 max-w-5xl overflow-hidden rounded-2xl border border-blue-400/15 bg-gradient-to-r from-blue-600/[0.12] via-indigo-500/[0.08] to-blue-500/[0.08] px-6 py-10 text-center sm:px-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-32 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />

          <div className="relative">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
              <Code2 size={20} />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Your next big idea starts here.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-slate-400 sm:text-sm">
              Start building with flux.ide and choose the plan that grows
              with your development journey.
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-blue-100"
            >
              Back to building
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] py-6 text-[10px] text-slate-600 sm:flex-row">
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
