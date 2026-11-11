
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LuMoon } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, Code2, LogOut } from "lucide-react";
import { logout } from "../features/logout";
import { setUserData } from "../redux/userSlice";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

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

    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeDropdown = () => setIsMenuOpen(false);

    const handleEscape = (event) => {
      if (event.key === "Escape") closeDropdown();
    };

    window.addEventListener("resize", closeDropdown);
    window.addEventListener("scroll", closeDropdown, true);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", closeDropdown);
      window.removeEventListener("scroll", closeDropdown, true);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative z-50 flex h-16 w-full shrink-0 items-center gap-6 border-b border-slate-200/70 bg-white/70 px-6 font-sans backdrop-blur-xl transition-colors duration-300 dark:border-white/[0.07] dark:bg-white/[0.03]">

      {/* Left - Brand */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15">
          <Code2 size={17} className="text-indigo-400" />
        </div>

        <span className="text-base font-semibold tracking-tight text-black dark:text-white">
          flux<span className="text-indigo-400">.ide</span>
        </span>
      </div>

      {/* Right */}
      <div className="flex-1" />

      <div className="flex shrink-0 items-center gap-2">

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
        >
          {isDark ? <LuMoon size={17} /> : <FiSun size={17} />}
        </button>

        {/* Profile */}
        <div className="ml-1">
          <button
            type="button"
            onClick={openDropdown}
            aria-expanded={isMenuOpen}
            className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1 pl-1.5 pr-3 text-slate-700 shadow-sm transition-all duration-150 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-sm">
              {initials}
            </div>

            <span className="hidden max-w-[110px] truncate text-xs font-semibold sm:inline-block">
              {name}
            </span>

            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Portal Dropdown */}
      {isMenuOpen &&
        createPortal(
          <>
            {/* Outside click overlay */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsMenuOpen(false)}
            />

            <div
              style={{
                position: "fixed",
                top: dropdownPosition.top,
                right: dropdownPosition.right,
              }}
              className="z-[9999] w-56 rounded-2xl border border-slate-200 bg-white/95 py-2 shadow-2xl shadow-slate-900/15 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#12121c]/95 dark:shadow-black/40"
            >
              {/* User Info */}
              <div className="mx-1.5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 dark:border-white/[0.04] dark:bg-black/50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-sm">
                  {initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                    {name}
                  </p>

                  <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {userData?.email}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-2 my-1.5 h-px bg-slate-100 dark:bg-white/[0.06]" />

              {/* Logout */}
              <div className="px-1.5">
                <button
                  type="button"
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await handleLogout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium text-rose-600 transition-colors duration-150 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
};

export default Navbar;
 