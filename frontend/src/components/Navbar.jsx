import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Code2, LogOut, Menu } from "lucide-react";
import { logout } from "../features/logout";
import { setUserData } from "../redux/userSlice";

const Navbar = ({ onMenuClick }) => {
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

  const handleLogout = async () => {
    await logout();
    dispatch(setUserData(null));
  };

  const openDropdown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 8,
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
    <header className="relative z-40 flex h-16 w-full shrink-0 items-center justify-between gap-3 border-b border-[#262626] bg-[#0A0A0A] px-3 sm:gap-4 sm:px-6">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#8B8B8B] transition-colors hover:bg-[#1C1C1C] hover:text-[#FAFAFA] md:hidden"
      >
        <Menu size={18} strokeWidth={1.75} />
      </button>

      {/* Brand */}
      <button
        type="button"
        className="flex shrink-0 items-center gap-2.5"
        aria-label="Flux IDE home"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3B82F6]">
          <Code2 size={17} strokeWidth={1.75} className="text-white" />
        </div>
        <span className="text-[15px] font-medium tracking-tight text-[#FAFAFA]">
          flux<span className="text-[#3B82F6]">.ide</span>
        </span>
      </button>

      <div className="flex-1 md:hidden" />
      <div className="hidden flex-1 md:block lg:hidden" />

      {/* Right cluster */}
      <div className="flex shrink-0 items-center gap-1.5">
        <div className="relative">
          <button
            type="button"
            onClick={openDropdown}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] py-1 pl-1 pr-2.5 text-[#FAFAFA] transition-colors hover:border-[#333333] hover:bg-[#1C1C1C] sm:pr-3"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-[11px] font-semibold text-white">
              {initials}
            </div>
            <span className="hidden max-w-[110px] truncate text-[12px] font-medium sm:inline-block">
              {name}
            </span>
            <ChevronDown
              size={14}
              strokeWidth={1.75}
              className={`text-[#8B8B8B] transition-transform duration-200 ${
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
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "fixed",
                  top: dropdownPosition.top,
                  right: dropdownPosition.right,
                  transformOrigin: "top right",
                }}
                className="z-[9999] w-64 overflow-hidden rounded-lg border border-[#262626] bg-[#141414] p-1.5 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center gap-3 rounded-md bg-[#0A0A0A] px-3 py-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-[12px] font-semibold text-white">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-[#FAFAFA]">
                      {name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-[#8B8B8B]">
                      {userData?.email || "No email"}
                    </p>
                  </div>
                </div>

                <div className="my-1.5 h-px bg-[#262626]" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await handleLogout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-[12.5px] font-medium text-[#F87171] transition-colors hover:bg-[#F87171]/10"
                >
                  <LogOut size={15} strokeWidth={1.75} />
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