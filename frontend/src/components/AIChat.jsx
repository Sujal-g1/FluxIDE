
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Code2, FileMinus, FilePen, FilePlus2, FolderPlus, Loader2, Send, Sparkles, User, } from "lucide-react";
import { useState } from "react";

const TOOL_META = {
  folder_created: {
    icon: FolderPlus,
    color: "text-sky-400",
    label: "Created folder",
  },
  file_created: {
    icon: FilePlus2,
    color: "text-emerald-400",
    label: "Created file",
  },
  file_updated: {
    icon: FilePen,
    color: "text-amber-400",
    label: "Updated file",
  },
  file_deleted: {
    icon: FileMinus,
    color: "text-red-400",
    label: "Deleted file",
  },
  folder_deleted: {
    icon: FileMinus,
    color: "text-red-400",
    label: "Deleted folder",
  },
  tool_start: {
    icon: Loader2,
    color: "text-sky-400",
    label: "Running",
  },
  tool_result: {
    icon: Code2,
    color: "text-emerald-400",
    label: "Tool completed",
  },
};

const ToolBadge = ({toolType, detail})=>{
  const meta = TOOL_META[toolType]
  if(!meta) return null;
  const Icon = meta.icon
  return(
    <motion.div
    initial={{ opacity:0, y:-4 }}
    animate={{opacity:1, y:0}}
    className="flex items-center justify-center"
    > 
      <div
      className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11.5px] text-zinc-400">
        <Icon size={14} className={`${meta.color}`} /> 
        <span>{meta.label}</span>
        {detail && 
        <span className="text-zinc-600"> 
          &middot; {detail}
        </span>
        }
      </div>

    </motion.div>
  ) 
}

const AIChat = ({ projectId, history=[], reloadTree, width = 320, onResizeStart, }) => {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

  const onEvent = async ({ toolType, data }) => {
    const normalizedType = toolType.replaceAll("-", "_");
  
    switch (normalizedType) {
      case "file_created":
       await reloadTree?.();
        setMessages((prev) => [
          ...prev,
          {
            role: "tool",
            toolType: "file_created",
            detail: data?.file?.name,
          },
        ]);
        break;
  
      case "folder_created":
        reloadTree?.();
        setMessages((prev) => [
          ...prev,
          {
            role: "tool",
            toolType: "folder_created",
            detail: data?.folder?.name,
          },
        ]);
        break;
  
      case "file_updated":
        reloadTree?.();
        setMessages((prev) => [
          ...prev,
          {
            role: "tool",
            toolType: "file_updated",
            detail: data?.file?.name,
          },
        ]);
        break;
  
      case "file_deleted":
        reloadTree?.();
        setMessages((prev) => [
          ...prev,
          {
            role: "tool",
            toolType: "file_deleted",
            detail: data?.file?.name,
          },
        ]);
        break;
  
      case "folder_deleted":
        reloadTree?.();
        setMessages((prev) => [
          ...prev,
          {
            role: "tool",
            toolType: "folder_deleted",
            detail: data?.folderId,
          },
        ]);
        break;
  
      case "tool_start":
        setMessages((prev) => [
          ...prev,
          {
            role: "tool",
            toolType: "tool_start",
            detail: data?.tool,
          },
        ]);
        break;
  
      case "tool_result":
        setMessages((prev) => [
          ...prev,
          {
            role: "tool",
            toolType: "tool_result",
            detail: "Execution finished",
          },
        ]);
        break;
  
      case "message": {
        const content = data?.content;
        if (!content) break;
  
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
  
          if (last?.role === "assistant") {
            copy[copy.length - 1] = {
              ...last,
              content,
            };
          } else {
            copy.push({
              role: "assistant",
              content,
            });
          }
  
          return copy;
        });
        break;
      }
  
      case "error":
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            error: true,
            content: data?.message || "Something went wrong",
          },
        ]);
        break;
  
      default:
        console.log("Unhandled AI event:", toolType, data);
    }
  };

  
  const handleChat = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/ai/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          credentials: "include",
          body: JSON.stringify({ projectId, message, history }),
        }
      );

      if (!response.ok) {
        let msg = "AI request failed";

        try {
          const data = await response.json();
          msg = data?.message || msg;
        } catch (error) {}

        throw new Error(msg);
      }

      if (!response.body) {
        throw new Error("AI streaming not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try { 
        while (true) {
          const { value, done } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          for (const eventText of events) {
            if (!eventText.trim()) continue;

            let eventType = "message";
            let dataText = "";

            for (const line of eventText.split("\n")) {
              if (line.startsWith("event:")) {
                eventType = line.slice(6).trim();
              }

              if (line.startsWith("data:")) {
                dataText += line.slice(5).trim();
              }
            }

            if (!dataText) continue;

            let data;

            try {
              data = JSON.parse(dataText);
            } catch {
              data = { content: dataText };
            }

            await onEvent({ toolType: eventType, data });

            // console.log("AI Event:", eventType, data);
            // console.log("EventType", eventType);
            // console.log("data", data);
          }
          
        }

        setMessage("");

        // Process any remaining buffered event
        if (buffer.trim())  console.log("Remaining stream data:", buffer);

      } finally {
        reader.releaseLock();
        setLoading(false)
      }
    } catch (error) {
      console.error("AI chat request failed:", error.message);
    }
  };

  return (
    <motion.div
    initial={{ width: 0, opacity: 0, x: 16 }}
    animate={{ width, opacity: 1, x: 0 }}
    exit={{ width: 0, opacity: 0, x: 12 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="relative isolate flex h-full min-w-0 shrink-0 flex-col items-center gap-2 overflow-hidden rounded-l-4xl border-l border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.035),transparent_55%),linear-gradient(160deg,#111113_0%,#09090b_50%,#050506_100%)] backdrop-blur-xl"
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

    <div className="flex h-10 w-full shrink-0 items-center justify-end border-b border-white/[0.06] px-3">
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

    <AnimatePresence initial={false}>
    {messages.map((msg, idx)=>{
      if(msg.role=="tool"){
        return(
          <ToolBadge
          key={`${idx}-${msg.toolType}`}
          toolType={msg.toolType} 
          detail={msg.detail} />
        )
      }
      const isUser = msg.role=="user"
      return (
        <motion.div
        key={idx}
        initial={{opacity:0, y:6}}
        animate={{ opacity:1, y:0}}
        transition={{ duration:0.15}}
        className={`flex items-start gap-2 ${isUser ? "flex-row-reverse": ""}`}
        >
        <div
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isUser
          ? "bg-white/10 text-zinc-300"
          : "bg-gradient-to-br from-sky-400 to-violet-400 text-white"
        }`}
        >
        { isUser ? <User size={12}/> : <Bot size={12}/>}
          </div>

        <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] ${
        isUser
        ? "bg-gradient-to-br from-sky-500 to-sky-600 te xt-white"
        : msg.error
        ? "border border-red-500/20 bg-red-500/10 text-red-300"
        : "border border-white/[0.06] bg-white/[0.03] text-zinc-300"
        }`} >
        <p className="whitespace-pre-wrap leading-relaxed">
        {msg.content}</p>
        </div>

        </motion.div>
      )

    })}

    </AnimatePresence>

    {loading && (
      <div className="flex items-center gap-2 pl-8 text-xs text-zinc-500">
          <Loader2 size={13} className="animate-spin" />
          <span>"motion-AI working..."</span>
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
        onChange={(e)=> setMessage(e.target.value)}
        value={message}
        className="block max-h-40 min-h-[60px] w-full resize-none bg-transparent px-3.5 pt-3 text-[13px] leading-5 text-zinc-100 outline-none placeholder:text-zinc-500"
      />

      <div className="flex items-center justify-between gap-3 px-2.5 pb-2.5">

        <motion.button
          type="button"
          whileHover={{ scale: 1.06, y: -1 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="group/send relative flex h-7 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-gradient-to-b from-[#f5f5f5] to-[#c9c9c9] text-black shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 hover:from-white hover:to-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-40"
          disabled={loading}
          onClick={handleChat}
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 to-transparent opacity-0 transition-opacity group-hover/send:opacity-100" />

          { loading ? <Loader2 size={13} className="animate-spin" /> :
          <Send size={13}
          className="relative transition-transform duration-200 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" />
          }
        </motion.button>
      </div>
    </div>
  </div>
</div>


    {/* Horizontal resize handle */}
    <div
      onPointerDown={onResizeStart}
      className="group absolute left-0 top-0 z-40 flex h-full w-1 cursor-col-resize touch-none items-center justify-center"
    >
      <motion.div
        className="h-full w-[2px] bg-gradient-to-b from-sky-400 via-violet-500 to-fuchsia-400 opacity-0 shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-opacity duration-200 group-hover:opacity-80"
      />
    </div>



    
    </motion.div>
  );
};

export default AIChat;
