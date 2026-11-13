import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Code2,
  LogOut,
  Menu,
  Moon,
  Sun,
  Search,
} from "lucide-react";
import { logout } from "../features/logout";
import { setUserData } from "../redux/userSlice";

const Navbar = ({ onMenuClick }) => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const name = userData?.name || "Guest";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const theme = window.localStorage.getItem("theme");
    const dark = theme ? theme === "dark" : true;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleLogout = async () => {
    await logout();
    dispatch(setUserData(null));
  };

  const openDropdown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 10,
      right: window.innerWidth - rect.right,
    });
    setIsMenuOpen((p) => !p);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const close = () => setIsMenuOpen(false);
    const onEsc = (e) => e.key === "Escape" && close();
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("keydown", onEsc);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-40 flex h-16 w-full shrink-0 items-center justify-between gap-3 border-b border-white/[0.06] bg-[#0a0b10]/80 px-3 backdrop-blur-xl sm:gap-4 sm:px-6">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/[0.06] hover:text-white md:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Brand */}
      <button
        type="button"
        className="flex shrink-0 items-center gap-2"
        aria-label="Flux IDE home"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/25 to-fuchsia-500/20 ring-1 ring-blue-400/20">
          <Code2 size={17} className="text-blue-300" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-white">
          flux<span className="text-blue-400">.ide</span>
        </span>
      </button>

      {/* Search (desktop) */}
      {/* <div className="ml-2 hidden max-w-md flex-1 md:block lg:max-w-lg">
        <label className="group flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-zinc-500 transition focus-within:border-blue-400/40 focus-within:bg-white/[0.05]">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search projects…"
            className="w-full bg-transparent text-[12.5px] text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
          />
          <kbd className="hidden rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-500 lg:inline">
            ⌘K
          </kbd>
        </label>
      </div> */}

      <div className="flex-1 md:hidden" />
      <div className="hidden flex-1 md:block lg:hidden" />

      {/* Right cluster */}
      <div className="flex shrink-0 items-center gap-1.5">
        {/* theme */}
        {/* <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </button> */}

        <div className="relative">
          <button
            type="button"
            onClick={openDropdown}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-1 pl-1 pr-2.5 text-zinc-200 transition hover:border-white/[0.14] hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 sm:pr-3"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-fuchsia-500 text-[11px] font-bold text-white ring-1 ring-white/10">
              {initials}
            </div>
            <span className="hidden max-w-[110px] truncate text-[12px] font-semibold sm:inline-block">
              {name}
            </span>
            <ChevronDown
              size={14}
              className={`text-zinc-500 transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Dropdown via portal */}
      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[9998]"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                key="menu"
                role="menu"
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "fixed",
                  top: dropdownPosition.top,
                  right: dropdownPosition.right,
                  transformOrigin: "top right",
                }}
                className="z-[9999] w-64 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101118]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-fuchsia-500 text-[12px] font-bold text-white ring-1 ring-white/10">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-white">
                      {name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                      {userData?.email || "No email"}
                    </p>
                  </div>
                </div>

                <div className="my-1.5 h-px bg-white/[0.06]" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await handleLogout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12.5px] font-medium text-rose-400 transition hover:bg-rose-500/10"
                >
                  <LogOut size={15} />
                  Log out
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};

export default Navbar;