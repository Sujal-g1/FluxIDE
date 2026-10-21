import { useEffect, useState } from "react";
import { LuMoon } from "react-icons/lu";
import { FiSun } from "react-icons/fi"; 
import { useDispatch, useSelector } from "react-redux"
import { ChevronDown, LogOut } from "lucide-react"
import { logout } from "../features/logout";
import { setUserData } from "../redux/userSlice";
 
const Navbar = () => {

const [isDark, setIsDark] = useState(true)
const [isMenuOpen, setIsMenuOpen] = useState(false)
const { userData } = useSelector(state=> state.user)
const dispatch = useDispatch()

    const name = userData.name || "Guest"
    const initials = name
    .split(" ")
    .map((w)=>w[0])
    .join("")
    .slice(0,2)
    .toUpperCase()

    useEffect(()=>{
        if( typeof window == undefined) return
        const theme = window.localStorage.getItem("theme")

        const dark =theme?theme=="dark":true
        document.documentElement.classList.toggle("dark",dark)
        setIsDark(dark)
    },[])

    const toggleTheme=()=>{ 
        const next=!isDark
        setIsDark(next)
        document.documentElement.classList.toggle("dark",next)
        window.localStorage.setItem("theme", next?"dark":"light")
    }

    const handleLogout= async()=>{
    await logout()
    dispatch(setUserData(null))
    }

  return (
    <div className='w-full h-16 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border-b border-slate-200/70 dark:border-white/[0.07] flex items-center px-6 gap-6 font-sans transition-colors duration -300'>
        {/* left */}
    <div className='flex items-center gap-2.5 shrink-0'>
        <span className='text-slate-900 dark:text-white font-bold text-[17px] tracking-tight'>
        FluxIDE
        </span>
    </div>

    {/* right */}
    <div className="flex-1"/>
    <div className='flex items-center gap-2 shrink-0'>
        <button
        onClick={toggleTheme} 
        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500   dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150">
        { isDark ? <LuMoon /> : <FiSun /> }
        </button>

        {/* profile data  */}
        <div className="relative ml-1">
            {/* menu off */}
       
            <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-150 shadow-sm"
            >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {initials}
            </div>

            <span className="text-xs font-semibold hidden sm:inline-block max-w-[110px] truncate">
                {name}
            </span>

            <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
                }`}
            />
            </button>

            {isMenuOpen && (
  <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-[#12121c]/95 backdrop-blur-xl border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-xl py-2 z-50 animate-[fadeIn_0.15s_ease-out]">
    
    {/* User Info Header */}
    <div className="flex items-center gap-3 px-3.5 py-2.5 mx-1.5 bg-slate-50/80 dark:bg-white/[0.03] rounded-xl border border-slate-100 dark:border-white/[0.04]">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
        {initials}
      </div>

      <div className="min-w-0 flex-1"> 
        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">
          {name}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
          {userData?.email}
        </p>
      </div>
    </div>

    {/* Divider */}
    <div className="h-px bg-slate-100 dark:bg-white/[0.06] my-1.5 mx-2" />

    {/* Logout Button */}
    <div className="px-1.5">
      <button
        type="button"
        onClick={() => {
            handleLogout();
            setIsMenuOpen(false);  
        }}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors duration-150"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        <span>Log Out</span>
      </button> 
    </div>

  </div>
)}  
        </div>

    </div>
    </div>
  )
}

export default Navbar