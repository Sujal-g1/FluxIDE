
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Code2,
  FileMinus,
  FilePen,
  FilePlus2,
  FolderPlus,
  Loader2,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";

const TOOL_META = {
  folder_created: {
    icon: FolderPlus,
    color: "text-zinc-300",
    label: "Created folder",
  },
  file_created: {
    icon: FilePlus2,
    color: "text-emerald-400",
    label: "Created file",
  },
  file_updated: {
    icon: FilePen,
    color: "text-blue-400",
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
    color: "text-blue-400",
    label: "Running",
  },
  tool_result: {
    icon: Code2,
    color: "text-emerald-400",
    label: "Tool completed",
  },
};

const ToolBadge = ({ toolType, detail }) => {
  const meta = TOOL_META[toolType];

  if (!meta) return null;

  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 py-1"
    >
      <div className="flex min-w-0 items-center gap-2 rounded-md border border-white/[0.07] bg-[#111113] px-2.5 py-1.5">
        <Icon
          size={13}
          className={`${meta.color} shrink-0 ${
            toolType === "tool_start" ? "animate-spin" : ""
          }`}
        />

        <span className="shrink-0 text-[11px] font-medium text-zinc-400">
          {meta.label}
        </span>

        {detail && (
          <>
            <span className="text-zinc-700">·</span>
            <span className="max-w-[150px] truncate text-[11px] text-zinc-500">
              {detail}
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
};

const AIChat = ({
  projectId,
  history = [],
  reloadTree,
  width = 320,
  onResizeStart,
}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!message.trim() || loading) return;

    setLoading(true);

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
          }
        }

        setMessage("");

        if (buffer.trim()) {
          console.log("Remaining stream data:", buffer);
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error("AI chat request failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0, x: 16 }}
      animate={{ width, opacity: 1, x: 0 }}
      exit={{ width: 0, opacity: 0, x: 12 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative flex h-full min-w-0 shrink-0 flex-col overflow-hidden border-l border-white/[0.07] bg-[#09090B]"
    >
      {/* Header */}
      <div className="flex h-11 w-full shrink-0 items-center justify-between border-b border-white/[0.07] px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.08] bg-[#18181B]">
            <Sparkles size={13} className="text-blue-400" />
          </div>

          <span className="text-[12px] font-semibold text-zinc-200">
            Motion-AI
          </span>
        </div>

        <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] font-medium text-zinc-500">
          Assistant
        </span>
      </div>

      {/* Messages */}
      <div
        className="flex-1 space-y-4 overflow-y-auto p-3.5
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/[0.08]
          hover:[&::-webkit-scrollbar-thumb]:bg-white/[0.16]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}
      >
        {/* Empty state */}
        {messages.length === 0 && (
          <div className="mt-14 flex flex-col items-center px-4 text-center">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111113]">
              <Sparkles size={19} className="text-blue-400" />
            </div>

            <h3 className="text-[13px] font-medium text-zinc-200">
              What do you want to build?
            </h3>

            <p className="mt-2 max-w-[230px] text-[11px] leading-5 text-zinc-500">
              Ask Motion-AI to create, modify, or manage files in your
              workspace.
            </p>

            <div className="mt-6 w-full space-y-2 text-left">
              {[
                "Create a new component",
                "Explain this project",
                "Fix a bug in my code",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setMessage(suggestion)}
                  className="w-full rounded-md border border-white/[0.07] bg-[#111113] px-3 py-2.5 text-left text-[11px] text-zinc-400 transition-colors hover:border-white/[0.14] hover:bg-[#18181B] hover:text-zinc-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => {
            if (msg.role === "tool") {
              return (
                <ToolBadge
                  key={`${idx}-${msg.toolType}`}
                  toolType={msg.toolType}
                  detail={msg.detail}
                />
              );
            }

            const isUser = msg.role === "user";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex items-start gap-2.5 ${
                  isUser ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                    isUser
                      ? "border-white/[0.08] bg-[#18181B] text-zinc-400"
                      : "border-blue-500/20 bg-blue-500/[0.08] text-blue-400"
                  }`}
                >
                  {isUser ? (
                    <User size={12} />
                  ) : (
                    <Bot size={13} />
                  )}
                </div>

                <div
                  className={`max-w-[85%] rounded-lg border px-3 py-2.5 text-[12px] ${
                    isUser
                      ? "border-blue-500/20 bg-blue-500/[0.10] text-zinc-200"
                      : msg.error
                      ? "border-red-500/20 bg-red-500/[0.06] text-red-300"
                      : "border-white/[0.07] bg-[#111113] text-zinc-300"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words leading-[1.7]">
                    {msg.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Loading indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 pl-8"
          >
            <Loader2 size={13} className="animate-spin text-blue-400" />
            <span className="text-[11px] text-zinc-500">
              Working...
            </span>
          </motion.div>
        )}
      </div>

      {/* Composer */}
      <div className="w-full shrink-0 border-t border-white/[0.07] bg-[#09090B] p-3">
        <div className="overflow-hidden rounded-lg border border-white/[0.09] bg-[#111113] transition-colors focus-within:border-blue-500/50">
          <textarea
            placeholder="Ask Motion-AI..."
            rows={2}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChat();
              }
            }}
            className="block max-h-40 min-h-[64px] w-full resize-none bg-transparent px-3.5 pt-3 text-[12px] leading-5 text-zinc-200 outline-none placeholder:text-zinc-600"
          />

          <div className="flex items-center justify-between border-t border-white/[0.05] px-2.5 py-2">
            <span className="text-[10px] text-zinc-600">
              Enter to send · Shift + Enter for new line
            </span>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.15 }}
              disabled={loading || !message.trim()}
              onClick={handleChat}
              aria-label="Send message"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0057FF] text-white transition-colors hover:bg-[#174FE0] disabled:cursor-not-allowed disabled:bg-[#202024] disabled:text-zinc-600"
            >
              {loading ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Send size={13} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Resize handle */}
      <div
        onPointerDown={onResizeStart}
        className="group absolute left-0 top-0 z-40 flex h-full w-1 cursor-col-resize touch-none items-center justify-center"
      >
        <div className="h-full w-[2px] bg-[#0057FF] opacity-0 transition-opacity duration-150 group-hover:opacity-70" />
      </div>
    </motion.div>
  );
};

export default AIChat;
