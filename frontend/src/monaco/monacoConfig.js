
const getFileExtension = (name = "") => {
    const key = name.trim().replace(/\\/g, "/").split("/").pop().toLowerCase();
    const dotIndex = key.lastIndexOf(".");
    return dotIndex > 0 ? key.slice(dotIndex + 1) : "";
  };
  

export const getEditorLanguage = (name = "") => {

    const ext = getFileExtension(name);
  
    const languages = {
      js: "javascript",
      jsx: "javascript",
      mjs: "javascript",
      cjs: "javascript",
      ts: "typescript",
      tsx: "typescript",
      mts: "typescript",
      cts: "typescript",
      html: "html",
      htm: "html",
      css: "css",
      scss: "scss",
      less: "less",
      json: "json",
      jsonc: "jsonc",
      py: "python",
      java: "java",
    };
  
    return languages[ext] || "plaintext";
  };

  let monacoConfigured = false;

  const fileNamesById = new Map();
  
  export const syncMonacoFileNames = (openTabs = []) => {
    fileNamesById.clear();
  
    openTabs.forEach((tab) => {
      if (tab?._id && tab?.name) {
        fileNamesById.set(String(tab._id), tab.name);
      }
    });
  };


  export const getComponentName = (fileName = "") => {
    const name = fileName
      .replace(/\\/g, "/")
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "");
  
    return (
      name
        .replace(/[^a-zA-Z0-9_$]+(.)?/g, (_, char) =>
          char ? char.toUpperCase() : ""
        )
        .replace(/^[^a-zA-Z_$]+/, "") || "Component"
    );
  };


 export  const setupMonaco = (monaco) => {
    monaco.editor.defineTheme("flux-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#00000000",
        "editorGutter.background": "#00000000",
        "editor.foreground": "#D4D4D8",
        "editorLineNumber.foreground": "#52525B",
        "editorLineNumber.activeForeground": "#A1A1AA",
        "editorCursor.foreground": "#7DD3FC",
        "editor.selectionBackground": "#3730A355",
        "editor.lineHighlightBackground": "#FFFFFF05",
        "editorWidget.background": "#111118",
        "editorWidget.border": "#27272A",
      },
    });
  
    if (monacoConfigured) return; // don't register twice
    monacoConfigured = true;
  
    const snippet = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
    const Kind = monaco.languages.CompletionItemKind;
  
    ["javascript", "typescript"].forEach((language) => {
      monaco.languages.registerCompletionItemProvider(language, {
        triggerCharacters: ["."],
        provideCompletionItems(model, position) {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };
  
          return {
            suggestions: [
              { label: "clg", kind: Kind.Snippet, insertText: "console.log($1);", insertTextRules: snippet, detail: "console.log", range },
              { label: "console.log", kind: Kind.Snippet, insertText: "console.log($1);", insertTextRules: snippet, detail: "Log output", range },
              { label: "useState", kind: Kind.Snippet, insertText: "const [${1:state}, set${2:State}] = useState($3);", insertTextRules: snippet, detail: "React state hook", range },
              { label: "useEffect", kind: Kind.Snippet, insertText: "useEffect(() => {\n\t$1\n}, [$2]);", insertTextRules: snippet, detail: "React effect hook", range },
              { label: "function", kind: Kind.Snippet, insertText: "function ${1:name}($2) {\n\t$0\n}", insertTextRules: snippet, detail: "Function declaration", range },
              {
                label: "component",
                kind: Kind.Snippet,
                detail: "React functional component",
                insertText:
                  "function ${1:Component}() {\n\treturn (\n\t\t<div>\n\t\t\t$0\n\t\t</div>\n\t);\n}",
                insertTextRules: snippet,
                range,
              },
              {
                label: "rafce",
                kind: Kind.Snippet,
                detail: "React functional component with export",
              
                insertText: (() => {
                  const modelPath = decodeURIComponent(model.uri.path);
                  const fileId = modelPath.split("/").pop();
              
                  const fileName =
                    fileNamesById.get(fileId) ||
                    fileNamesById.get(modelPath) ||
                    "";
              
                  const componentName = getComponentName(fileName);
              
                  return (
                    `const \${1:${componentName}} = () => {\n` +
                    `\treturn (\n` +
                    `\t\t<div>\n` +
                    `\t\t\t$0\n` +
                    `\t\t</div>\n` +
                    `\t);\n` +
                    `};\n\n` +
                    `export default \${1:${componentName}};`
                  );
                })(),
              
                insertTextRules: snippet,
                range,
              },
            ],
          };
        },
      });
    });
  
    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: ["!", "<", "h"],
    
      provideCompletionItems(model, position) {
        const word = model.getWordUntilPosition(position);
    
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
  
        const snippet = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
        const Kind = monaco.languages.CompletionItemKind;
    
        return {
          suggestions: [
            {
              label: "html-boiler-plate",
              insertText: [
                "<!DOCTYPE html>",
                '<html lang="en">',
                "<head>",
                '  <meta charset="UTF-8">',
                '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
                "  <title>${1:Document}</title>",
                "</head>",
                "<body>",
                "  $0",
                "</body>",
                "</html>",
              ].join("\n"),
              kind: Kind.Snippet,
              insertTextRules: snippet,
              detail: "HTML5 Boilerplate",
              range,
            },
            {
              label: "div",
              kind: Kind.Snippet,
              detail: "HTML div element",
              insertText: "<div>\n\t$0\n</div>",
              insertTextRules: snippet,
              range,
            },
            {
              label: "button",
              kind: Kind.Snippet,
              detail: "HTML button element",
              insertText: '<button type="button">$0</button>',
              insertTextRules: snippet,
              range,
            },
          ],
        };
      },
    });
  };