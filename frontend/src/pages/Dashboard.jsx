
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { login } from "../features/login";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Icon = ({ name, className = "" }) => {
  const shapes = {
    arrow: (
      <>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
    code: (
      <>
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 4-4 16" />
      </>
    ),
    terminal: (
      <>
        <path d="m5 7 5 5-5 5" />
        <path d="M13 17h6" />
      </>
    ),
    loader: <path d="M20 12a8 8 0 1 1-5.7-7.7" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {shapes[name] || shapes.code}
    </svg>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [activeSession, setActiveSession] = useState("projects")
  const dispatch = useDispatch()
  const  {userData} = useSelector((state) => state.user)

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const data = await login(token);
      dispatch(setUserData(data))

      if (!data) {
        throw new Error("Unable to start your Flux session.");
      }
      console.log("FluxIDE login successful:", data);

      // window.location.assign("/workspace");
    } catch (err) {
      console.error("FluxIDE authentication error:", err);

      if (err.code === "auth/popup-blocked") {
        setError("Allow popups and try again.");
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in cancelled.");
      } else if (err.code === "auth/cancelled-popup-request") {
        setError("Sign-in is already in progress.");
      } else {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  if(!userData){
     return (
    <main className="flux-page relative flex min-h-screen flex-col overflow-hidden bg-[#08090a] text-white selection:bg-amber-300/30">
      

      {/* Ambient light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.025),transparent_55%)]" />

      <div className="flux-grid pointer-events-none absolute inset-0 opacity-70" />

      <div className="flux-glow pointer-events-none absolute -left-48 top-[36%] h-[460px] w-[460px] rounded-full bg-orange-700/15 blur-[150px]" />

      <div className="pointer-events-none absolute -bottom-64 right-[10%] h-[520px] w-[520px] rounded-full bg-amber-700/[0.12] blur-[160px]" />

      {/* Header */}
      <header className="relative z-20 flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.07] px-5 sm:px-9 lg:px-12">
        <a href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] shadow-[0_0_25px_rgba(255,255,255,0.025)] transition-all duration-300 group-hover:border-amber-300/30 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.1)]">
            <Icon name="code" className="h-[18px] w-[18px] text-zinc-200" />
          </div>
          <span className="text-[15px] font-medium tracking-[-0.045em]">
            flux<span className="text-zinc-500">.ide</span>
          </span>
        </a>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-xs text-zinc-200 shadow-[0_4px_25px_rgba(0,0,0,.15)] backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.09] disabled:opacity-60"
        >
          {loading ? (
            <Icon name="loader" className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,.8)]" />
          )}
          {loading ? "Opening..." : "Enter workspace"}
          <Icon
            name="arrow"
            className="h-3.5 w-3.5 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-16 text-center sm:pb-20 sm:pt-20">
        {/* Animated IDE motif */}
        <div className="flux-reveal relative mb-9 flex h-14 w-14 items-center justify-center sm:mb-12">
          <div className="flux-orbit absolute inset-0 rounded-2xl border border-white/[0.12] bg-white/[0.025] shadow-[0_0_50px_rgba(255,255,255,.035)] backdrop-blur-xl" />

          <div className="absolute inset-[7px] rounded-xl border border-amber-200/[0.12] bg-gradient-to-br from-amber-200/[0.08] to-transparent" />

          <Icon name="code" className="relative h-6 w-6 text-amber-200" />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,.8)]" />
        </div>

       
        <h1 className="flux-reveal flux-delay-1 max-w-[1200px] font-mono font-normal leading-[0.91] tracking-[0.005em] uppercase">
        <span className="flux-dot-line text-[clamp(2rem,9vw,8.2rem)]">
            {"Code.in".split("").map((char, index) => (
            <span
                key={`line1-${index}`}
                className={`flux-dot-letter ${
                char === " " ? "flux-space" : ""
                }`}
                style={{ "--letter-index": index }}
            >
                {char === " " ? "\u00A0" : char}
            </span>
            ))}
        </span>

        <br />

        <span className="flux-dot-line text-[clamp(3.2rem,10.2vw,9.5rem)]">
            {"motion".split("").map((char, index) => (
            <span
                key={`line2-${index}`}
                className="flux-dot-letter"
                style={{ "--letter-index": index + 7 }}
            >
                {char}
            </span>
            ))}
        </span>
        </h1>


        <p className="flux-reveal flux-delay-2 mt-7 max-w-[330px] text-[2px] leading-6 text-zinc-400 sm:mt-9 sm:max-w-md sm:text-base sm:leading-7">
          Your ideas, accelerated by AI.
        </p>

        {/* Main CTA */}
        <div className="flux-reveal flux-delay-3 mt-8 flex flex-col items-center gap-4 sm:mt-10">
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="group relative isolate flex min-h-[52px] min-w-[208px] items-center justify-between gap-8 overflow-hidden rounded-full border border-white/20 bg-[#e9e9e6] px-5 text-sm font-medium text-[#111111] shadow-[0_0_0_1px_rgba(255,255,255,.025),0_8px_35px_rgba(0,0,0,.3),0_0_60px_rgba(245,158,11,.055)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white hover:shadow-[0_10px_45px_rgba(0,0,0,.4),0_0_55px_rgba(245,158,11,.13)] active:translate-y-0 disabled:cursor-wait disabled:opacity-60"
          >
            <span className="absolute inset-0 -z-10 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

            <span className="flex items-center gap-2.5">
              {loading && (
                <Icon name="loader" className="h-4 w-4 animate-spin" />
              )}
              {loading ? "Connecting to Flux" : "Open workspace"}
            </span>

            {!loading && (
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            )}
          </button>

          {error && (
            <p
              role="alert"
              className="max-w-sm rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs text-red-300"
            >
              {error}
            </p>
          )}
        </div>

        {/* Floating code window */}
        <div className="flux-reveal flux-delay-3 relative mt-16 w-full max-w-[420px] text-left sm:mt-20 lg:absolute lg:bottom-[8%] lg:right-[7%] lg:mt-0 lg:max-w-[340px]">
          <div className="flux-orbit relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[#111112]/70 shadow-[0_25px_100px_rgba(0,0,0,.45),0_0_45px_rgba(245,158,11,.035)] backdrop-blur-2xl">
            <div className="flex h-10 items-center justify-between border-b border-white/[0.07] px-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </div>
              <span className="text-[9px] tracking-[0.12em] text-zinc-600">
                UNTITLED.JS
              </span>
              <Icon name="terminal" className="h-3.5 w-3.5 text-zinc-600" />
            </div>

            <div className="relative overflow-hidden px-4 py-4 font-mono text-[10px] leading-[2.2] sm:text-[11px]">
              <div className="flux-scan-line pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-amber-200/[0.06] to-transparent" />

              <p className="text-zinc-600">
                <span className="mr-4">01</span>
                <span className="text-zinc-600">// the next idea</span>
              </p>
              <p>
                <span className="mr-4 text-zinc-700">02</span>
                <span className="text-violet-300">const</span>{" "}
                <span className="text-zinc-200">possibility</span>{" "}
                <span className="text-zinc-500">=</span>{" "}
                <span className="text-amber-200">Infinity</span>
                <span className="text-zinc-500">;</span>
              </p>
              <p>
                <span className="mr-4 text-zinc-700">03</span>
                <span className="text-violet-300">await</span>{" "}
                <span className="text-sky-300">flux</span>
                <span className="text-zinc-500">.</span>
                <span className="text-emerald-300">build</span>
                <span className="text-zinc-400">()</span>
                <span className="flux-cursor ml-1 inline-block h-3 w-px translate-y-[2px] bg-amber-300" />
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.6)]" />
                <span className="text-[9px] tracking-wide text-zinc-500">
                  READY TO CREATE
                </span>
              </div>
              <span className="text-[9px] text-zinc-600">FLUX ENGINE</span>
            </div>
          </div>
        </div>

      </section>

    </main>
  );
  }

  return(
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#07070c]">

    <div className="pointer-events-none absolute -top-40 left-1/3 hidden h-[700px] w-[700px] rounded-full bg-white/[0.05] blur-[140px] dark:block "/>
    <div className="pointer-events-none absolute top-1/3 right-0 hidden h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[130px] dark:block "/>

    <div className="relative flex min-h-0 flex-1 flex-col">
    <Navbar />
    <div className="flex min-h-0 flex-1">
        <Sidebar activeSession={activeSession} setActiveSession={setActiveSession}/>
    </div>

    </div>
      
    </div>
  )


 
};

export default Dashboard;
