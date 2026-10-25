import { useMemo } from "react";

const Preview = ({ tree = [], activeTab ,  filesLoading = false }) => {
  
  const srcDoc = useMemo(() => {
    let html = "";
    let css = "";
    let js = "";

    const walk = (items = []) => {
      if (!Array.isArray(items)) return;

      for (const item of items) {
        if (item.type === "file") {
          const name = (item.name || "").toLowerCase();
          const content = item.content || "";

          if (
            activeTab?.name?.toLowerCase().endsWith(".html") &&
            String(item._id) === String(activeTab._id)
          ) {
            html = activeTab.content || "";
          } else if (name.endsWith(".css")) {
            css += `\n${content}`;
          } else if (
            name.endsWith(".js") ||
            name.endsWith(".mjs")
          ) {
            js += `\n${content}`;
          }
        }

        if (Array.isArray(item.children) && item.children.length) {
          walk(item.children);
        }
      }
    };

    walk(tree);

    if (!html.trim()) {
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>FluxIDE Preview</title>
    
          <style>
            * {
              box-sizing: border-box;
            }
    
            body {
              margin: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
              overflow: hidden;
              background:
                radial-gradient(
                  ellipse at 20% 10%,
                  rgba(99, 102, 241, 0.14),
                  transparent 45%
                ),
                radial-gradient(
                  ellipse at 85% 90%,
                  rgba(56, 189, 248, 0.09),
                  transparent 40%
                ),
                #09090d;
              color: #e4e4e7;
              font-family: Inter, -apple-system, BlinkMacSystemFont,
                "Segoe UI", sans-serif;
            }
    
            .container {
              width: 100%;
              max-width: 420px;
              text-align: center;
              animation: appear 0.5s ease both;
            }
    
            .icon {
              width: 68px;
              height: 68px;
              display: grid;
              place-items: center;
              margin: 0 auto 24px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 20px;
              background: linear-gradient(
                145deg,
                rgba(129, 140, 248, 0.15),
                rgba(56, 189, 248, 0.05)
              );
              box-shadow: 0 12px 50px rgba(0, 0, 0, 0.25);
            }
    
            .icon svg {
              width: 30px;
              height: 30px;
              color: #a5b4fc;
            }
    
            .eyebrow {
              margin-bottom: 12px;
              color: #818cf8;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 2px;
              text-transform: uppercase;
            }
    
            h1 {
              margin: 0;
              color: #fafafa;
              font-size: clamp(22px, 4vw, 28px);
              font-weight: 650;
              letter-spacing: -0.8px;
            }
    
            .description {
              max-width: 340px;
              margin: 12px auto 28px;
              color: #8b8b98;
              font-size: 14px;
              line-height: 1.8;
            }
    
            .hint {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              padding: 16px;
              border: 1px solid rgba(255, 255, 255, 0.07);
              border-radius: 14px;
              background: rgba(255, 255, 255, 0.025);
              text-align: left;
            }
    
            .hint-icon {
              flex-shrink: 0;
              color: #a5b4fc;
              font-size: 17px;
            }
    
            .hint-title {
              margin: 0 0 5px;
              color: #d4d4d8;
              font-size: 12px;
              font-weight: 600;
            }
    
            .hint-text {
              margin: 0;
              color: #777783;
              font-size: 12px;
              line-height: 1.7;
            }
    
            code {
              padding: 2px 5px;
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 5px;
              background: rgba(255, 255, 255, 0.05);
              color: #c4b5fd;
              font-size: 11px;
            }
    
            .status {
              display: inline-flex;
              align-items: center;
              gap: 7px;
              margin-top: 24px;
              color: #626270;
              font-size: 11px;
            }
    
            .status-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #818cf8;
              box-shadow: 0 0 10px rgba(129, 140, 248, 0.5);
            }
    
            @keyframes appear {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
    
            @media (prefers-reduced-motion: reduce) {
              .container {
                animation: none;
              }
            }
          </style>
        </head>
    
        <body>
          <main class="container">
            <div class="icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <path d="m9 10-2 2 2 2" />
                <path d="m15 10 2 2-2 2" />
                <path d="m13 9-2 6" />
              </svg>
            </div>
    
            <div class="eyebrow">FluxIDE · Live Preview</div>
    
            <h1>Your preview starts here.</h1>
    
            <p class="description">
              Your workspace is ready. Open an HTML file with some content
              to see your creation come to life.
            </p>
    
            <div class="hint">
              <div class="hint-icon">✦</div>
              <div>
                <p class="hint-title">Ready to build something?</p>
                <p class="hint-text">
                  Write your markup in an HTML file, then switch to Preview.
                  Your project will appear here when its content is available.
                </p>
              </div>
            </div>
    
            <div class="status">
              <span class="status-dot"></span>
              Waiting for project content
            </div>
          </main>
        </body>
        </html>
      `;
    } 

    // Inject CSS before </head>.
    if (css) {
      const style = `<style>\n${css}\n</style>`;

      html = html.toLowerCase().includes("</head>")
        ? html.replace(/<\/head>/i, `${style}</head>`)
        : `${style}${html}`;
    }

    // Inject JavaScript before </body>.
    if (js) {
      const script = `<script>\n${js}\n<\/script>`;

      html = html.toLowerCase().includes("</body>")
        ? html.replace(/<\/body>/i, `${script}</body>`)
        : `${html}${script}`;
    }

    return html;
  }, [tree, activeTab?._id, activeTab?.name, activeTab?.content]);


  if (filesLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#0a0a0c] text-sm text-zinc-400">
        Preparing preview...
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#111113] px-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-zinc-300">Preview</span>
        </div>
      </div>

      <div className="min-h-0 flex-1 bg-white">
        <iframe
          title="Project Preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-forms allow-modals"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
};

export default Preview;