
import { motion } from "framer-motion";
import { Code2, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const AIChat = ({ id }) => {

    const [messages, setMessages] = useState([])

  return (
    <motion.div
      initial={{ width: 0, opacity: 0, x: 16 }}
      animate={{ width: 288, opacity: 1, x: 0 }}
      exit={{ width: 0, opacity: 0, x: 12 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative isolate flex h-full w-80 shrink-0 flex-col items-center gap-2 overflow-hidden rounded-l-4xl border-l border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.035),transparent_55%),linear-gradient(160deg,#111113_0%,#09090b_50%,#050506_100%)] backdrop-blur-xl"
    >

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15">
            <Code2 size={17} className="text-indigo-400" />
          </div>

          <span className="text-base font-semibold tracking-tight text-white">
            flux<span className="text-indigo-400">.ide</span>
          </span>
       </div> */}

    <div className="flex h-10 w-72 shrink-0 items-center justify-end border-b border-white/[0.06] px-3">
        <span className="text-[11px] font-semibold tracking-wider text-zinc-500">
        Motion-AI
        </span>
    </div>

   {/* chats */}
   <div className="flex-1 space-y-3 overflow-y-auto p-3">
   { messages.length==0 && (
    <div className="mt-10 text-center">

    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
     <Sparkles size={22} className="text-zinc-600" />
    </div>

    <p className="text-sm font-medium text-zinc-400">
        What do you want to build?
    </p>

    <p className="mt-1.5 text-xs text-zinc-600">
        Ask Motion-AI to create or modify files.
    </p>

     </div>
    )}
   </div>

    {/* input */}
   
<div className="border-t w-full min-w-0 border-white/[0.07] bg-gradient-to-b from-[#111111]/40 to-[#080808]/80 p-3">
  <div className="group relative rounded-xl bg-gradient-to-br from-white/[0.10] via-white/[0.04] to-white/[0.02] p-px transition-all duration-300 focus-within:from-white/20 focus-within:via-white/10 focus-within:to-white/[0.04]">
    <div className="rounded-xl bg-[#111112]/95 backdrop-blur-2xl">
      <textarea
        placeholder="Ask Motion-AI ..."
        rows={2}
        className="block max-h-40 min-h-[60px] w-full resize-none bg-transparent px-3.5 pt-3 text-[13px] leading-5 text-zinc-100 outline-none placeholder:text-zinc-500"
      />

      <div className="flex items-center justify-between gap-3 px-2.5 pb-2.5">

        <motion.button
          type="button"
          whileHover={{ scale: 1.06, y: -1 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="group/send relative flex h-7 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-gradient-to-b from-[#f5f5f5] to-[#c9c9c9] text-black shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 hover:from-white hover:to-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 to-transparent opacity-0 transition-opacity group-hover/send:opacity-100" />

          <Send size={13}
           className="relative transition-transform duration-200 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" />
        </motion.button>
      </div>
    </div>
  </div>
</div>



    
    </motion.div>
  );
};

export default AIChat;
