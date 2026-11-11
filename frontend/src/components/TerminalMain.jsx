
import { Terminal  as XTerminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import { useRef, useEffect, useState } from "react"
import { Eraser } from "lucide-react"
import "@xterm/xterm/css/xterm.css"
import {io} from "socket.io-client"
 

const TerminalMain = ({projectId, projectName, userId}) => {

    const containerRef = useRef()
    const terminalRef = useRef()
    const [connected, setConnected] = useState(false)

    useEffect(() => {
    
    if(!projectId || !userId ) return
      
   
const terminal = new XTerminal({
    cursorBlink: true,
    cursorStyle: "bar", 
    cursorWidth: 2,
  
    fontSize: 13,
    fontFamily:
      '"JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, monospace',
    fontWeight: "400",
    fontWeightBold: "600",
  
    lineHeight: 1.35,
    letterSpacing: 0.2,
  
    scrollback: 10000,
    smoothScrollDuration: 100,
    fastScrollSensitivity: 5,
    scrollSensitivity: 1,
  
    allowTransparency: false,
    drawBoldTextInBrightColors: true,
  
    rightClickSelectsWord: true,
    copyOnSelect: false,
    cursorInactiveStyle: "outline",
  
    theme: {
      background: "#0B0D10",
      foreground: "#D6D9E0",
  
      cursor: "#A78BFA",
      cursorAccent: "#0B0D10",
  
      selectionBackground: "#34304F",
      selectionForeground: "#FFFFFF",
  
      black: "#17191F",
      red: "#FF6B78",
      green: "#A3D977",
      yellow: "#EBCB8B",
      blue: "#82AAFF",
      magenta: "#C792EA",
      cyan: "#89DDFF",
      white: "#D6D9E0",
  
      brightBlack: "#626875",
      brightRed: "#FF8490",
      brightGreen: "#B8E994",
      brightYellow: "#F3D9A4",
      brightBlue: "#9AB9FF",
      brightMagenta: "#D8A8F5",
      brightCyan: "#A5E8F5",
      brightWhite: "#FFFFFF",
    },
  });
  
     
    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    terminal.open(containerRef.current)
    terminalRef.current = terminal
    const fitTerminal = ()=>{
        try {
            fitAddon.fit()
        } catch (error) {
            console.log(error);   
        }
    }
    fitTerminal()
    
    const terminal_url = import.meta.env.VITE_TERMINAL_SERVICE_URL
    if(!terminal_url){
        terminal.write("\r\n\x1b[31mVITE_TERMINAL_URL missing\x1b[0m\r\n")
        return ()=> terminal.dispose()
    }
    const socket = io(terminal_url,{
        transports: ["websocket"],
        withCredentials: true
    })

    socket.on("connect", ()=>{
    // console.log("socket connected");
    setConnected(true)
    fitTerminal()
    socket.emit("terminal:init", {projectId, projectName, userId, rows:terminal.rows, cols:terminal.cols})
        
    })
    socket.on("terminal:data", (data)=>{
        terminal.write(String(data || "") )
    })

    socket.on("terminal:ready", ()=>{
        fitTerminal()
    socket.emit("terminal:resize", {rows:terminal.rows, cols:terminal.cols})
    })
    terminal.focus()

    const input = terminal.onData((data)=>{
        if(!socket.connected) return
        socket.emit("terminal:write", data)
    })

    const resizeTerminal = ()=>{
     fitTerminal()
     if(!socket.connected) return
     socket.emit("terminal:resize", {rows:terminal.rows, cols:terminal.cols})
    }

    window.addEventListener("resize", resizeTerminal)
    const resizeObserver = new ResizeObserver(resizeTerminal)
    resizeObserver.observe(containerRef.current)
 
    const focusTerminal=()=>{ terminal.focus() } 

    containerRef.current.addEventListener("click", focusTerminal)
    socket.on("connect_error",(error)=>{
        setConnected(false)
        terminal.write("\r\n\x1b[31m${error.message}\x1b[0m\r\n")
    })

    socket.on("disconnect",()=>{
        setConnected(false)
    })

    return ()=>{
        window?.removeEventListener("resize", resizeTerminal)
        resizeObserver.disconnect()
        containerRef?.current?.removeEventListener("click", focusTerminal)
        input.dispose()
        socket.disconnect()
        terminal.dispose()
    }
    
    }, [projectId, userId])
    
    const clearTerminal=()=>{
     const terminal = terminalRef.current
     if(!terminal) return

     terminal.clear()
     terminal.write("\x1b[2J\x1b[H")
     terminal.focus()
    }
   
  return (

    <div className="flex h-full flex-col bg-[#0d0d0f]">
    <div className="flex h-7 shrink-0 items-center justify-between border-b border-white/[0.05] px-3">

    <div className="flex items-center gap-2">
    <span  className={`h-1.5 w-1.5 rounded-full ${
        connected
        ? "bg-emerald-400"
        : "bg-zinc-600"
    }`}/>

    <span className="text-[11px] text-zinc-500">
    { connected 
        ? "terminal-connected"
        : "terminal-disconnected"
    }
    </span>
    </div>

    <button
    onClick={clearTerminal}
    title="Clear Terminal"
    className="rounded p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white">
    <Eraser size={13} />
    </button>
    </div>

    <div ref={containerRef}
    className="min-h-0 flex-1 cursor-text overflow-hidden"/>

    </div>
  )
}

export default TerminalMain