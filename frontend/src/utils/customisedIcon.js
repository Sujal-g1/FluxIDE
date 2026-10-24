import {
   FileCode2,
   FileJson,
   FileText,
   FileImage,
   FileVideo,
   FileAudio,
   FileArchive,
   FileSpreadsheet,
   File as FileIcon,
   FileTerminal,
   FileType,
   FileCog,
   FileKey,
   FileLock,
   FileCheck,
   FileDigit,
   Database,
   Package,
   Lock,
   KeyRound,
   Settings,
   Globe,
   Palette,
   Braces,
   BookOpen,

   Folder,
   FolderOpen,
   FolderCode,
   FolderCog,
   FolderGit2,
   FolderKanban,
   FolderCheck,
   FolderSearch,
   Image,
   TestTube,
   ShieldCheck,
   Languages,
 } from "lucide-react";
 
 export const getFileIcon = (name = "") => {
   const key = name.trim().replace(/\\/g, "/").split("/").pop().toLowerCase();

const dotIndex = key.lastIndexOf(".");
const ext = dotIndex > 0 ? key.slice(dotIndex + 1) : "";

// console.log("File:", name, "| Extension:", ext);
 
   const knownNames = {
     "package.json": {
       icon: Package,
       color: "text-emerald-400",
     },
     "package-lock.json": {
       icon: Lock,
       color: "text-zinc-400",
     },
     "pnpm-lock.yaml": {
       icon: Lock,
       color: "text-orange-400",
     },
     "yarn.lock": {
       icon: Lock,
       color: "text-sky-400",
     },
     ".env": {
       icon: KeyRound,
       color: "text-lime-400",
     },
     ".env.local": {
       icon: KeyRound,
       color: "text-lime-400",
     },
     ".gitignore": {
       icon: FileCheck,
       color: "text-orange-400",
     },
     ".npmrc": {
       icon: Settings,
       color: "text-red-400",
     },
     "dockerfile": {
       icon: Package,
       color: "text-sky-400",
     },
     "docker-compose.yml": {
       icon: Package,
       color: "text-sky-400",
     },
     "readme.md": {
       icon: BookOpen,
       color: "text-blue-400",
     },
     "license": {
       icon: FileText,
       color: "text-amber-400",
     },
     "vite.config.js": {
       icon: Settings,
       color: "text-purple-400",
     },
     "tailwind.config.js": {
       icon: Palette,
       color: "text-cyan-400",
     },
     "tsconfig.json": {
       icon: FileCog,
       color: "text-blue-400",
     },
   };
 
   if (knownNames[key]) return knownNames[key];
 
   // Extension-based icons
   const map = {
     // JavaScript ecosystem
     js: { icon: FileCode2, color: "text-yellow-400" },
     jsx: { icon: FileCode2, color: "text-cyan-400" },
     mjs: { icon: FileCode2, color: "text-yellow-300" },
     cjs: { icon: FileCode2, color: "text-yellow-500" },
     ts: { icon: FileCode2, color: "text-blue-400" },
     tsx: { icon: FileCode2, color: "text-blue-300" },
 
     // Web
     html: { icon: Globe, color: "text-orange-400" },
     htm: { icon: Globe, color: "text-orange-400" },
     css: { icon: Palette, color: "text-blue-400" },
     scss: { icon: Palette, color: "text-pink-400" },
     sass: { icon: Palette, color: "text-pink-400" },
     less: { icon: Palette, color: "text-indigo-400" },
     svg: { icon: FileImage, color: "text-orange-300" },
 
     // Data and configuration
     json: { icon: FileJson, color: "text-amber-400" },
     jsonc: { icon: FileJson, color: "text-amber-300" },
     yaml: { icon: Settings, color: "text-red-300" },
     yml: { icon: Settings, color: "text-red-300" },
     toml: { icon: Settings, color: "text-orange-300" },
     xml: { icon: Braces, color: "text-orange-400" },
     csv: { icon: FileSpreadsheet, color: "text-emerald-400" },
     sql: { icon: Database, color: "text-sky-400" },
 
     // Programming languages
     py: { icon: FileCode2, color: "text-blue-400" },
     java: { icon: FileCode2, color: "text-orange-400" },
     class: { icon: FileDigit, color: "text-orange-300" },
     c: { icon: FileCode2, color: "text-blue-300" },
     h: { icon: FileCode2, color: "text-blue-300" },
     cpp: { icon: FileCode2, color: "text-blue-400" },
     hpp: { icon: FileCode2, color: "text-blue-400" },
     cs: { icon: FileCode2, color: "text-purple-400" },
     go: { icon: FileCode2, color: "text-cyan-400" },
     rs: { icon: FileCode2, color: "text-orange-400" },
     php: { icon: FileCode2, color: "text-violet-400" },
     rb: { icon: FileCode2, color: "text-red-400" },
     swift: { icon: FileCode2, color: "text-orange-400" },
     kt: { icon: FileCode2, color: "text-purple-400" },
     dart: { icon: FileCode2, color: "text-cyan-400" },
     vue: { icon: FileCode2, color: "text-emerald-400" },
     svelte: { icon: FileCode2, color: "text-orange-400" },
     astro: { icon: FileCode2, color: "text-purple-400" },
 
     // Documents
     md: { icon: BookOpen, color: "text-blue-400" },
     mdx: { icon: BookOpen, color: "text-blue-300" },
     txt: { icon: FileText, color: "text-zinc-400" },
     pdf: { icon: FileText, color: "text-red-400" },
     doc: { icon: FileText, color: "text-blue-500" },
     docx: { icon: FileText, color: "text-blue-500" },
     rtf: { icon: FileText, color: "text-blue-300" },
     ppt: { icon: FileText, color: "text-orange-400" },
     pptx: { icon: FileText, color: "text-orange-400" },
 
     // Images
     png: { icon: FileImage, color: "text-pink-400" },
     jpg: { icon: FileImage, color: "text-pink-400" },
     jpeg: { icon: FileImage, color: "text-pink-400" },
     gif: { icon: FileImage, color: "text-pink-300" },
     webp: { icon: FileImage, color: "text-pink-400" },
     ico: { icon: FileImage, color: "text-violet-400" },
     bmp: { icon: FileImage, color: "text-pink-400" },
 
     // Audio and video
     mp3: { icon: FileAudio, color: "text-green-400" },
     wav: { icon: FileAudio, color: "text-green-400" },
     ogg: { icon: FileAudio, color: "text-green-400" },
     mp4: { icon: FileVideo, color: "text-purple-400" },
     mov: { icon: FileVideo, color: "text-purple-400" },
     webm: { icon: FileVideo, color: "text-purple-400" },
 
     // Archives
     zip: { icon: FileArchive, color: "text-amber-400" },
     rar: { icon: FileArchive, color: "text-amber-400" },
     "7z": { icon: FileArchive, color: "text-amber-400" },
     tar: { icon: FileArchive, color: "text-amber-400" },
     gz: { icon: FileArchive, color: "text-amber-400" },
 
     // Shell and executable files
     sh: { icon: FileTerminal, color: "text-emerald-400" },
     bash: { icon: FileTerminal, color: "text-emerald-400" },
     zsh: { icon: FileTerminal, color: "text-emerald-400" },
     bat: { icon: FileTerminal, color: "text-green-400" },
     ps1: { icon: FileTerminal, color: "text-blue-400" },
     exe: { icon: FileDigit, color: "text-zinc-400" },
     dll: { icon: FileCog, color: "text-zinc-400" },
 
     // Certificates and keys
     pem: { icon: FileKey, color: "text-lime-400" },
     key: { icon: FileKey, color: "text-lime-400" },
     crt: { icon: FileLock, color: "text-lime-400" },
     cer: { icon: FileLock, color: "text-lime-400" },
     p12: { icon: FileLock, color: "text-lime-400" },
     pfx: { icon: FileLock, color: "text-lime-400" },
 
     // Databases and other
     db: { icon: Database, color: "text-sky-400" },
     sqlite: { icon: Database, color: "text-sky-400" },
     log: { icon: FileText, color: "text-zinc-500" },
     lock: { icon: Lock, color: "text-zinc-400" },
   };
 
   return map[ext] || { icon: FileIcon, color: "text-zinc-400" };
 };


 export const getFolderIcon = (name = "", isOpen = false) => {
   const key = name.toLowerCase();
 
   const folderMap = {
     // Application structure
     src: {
       icon: FolderCode,
       color: "text-sky-400",
     },
     app: {
       icon: FolderCode,
       color: "text-blue-400",
     },
     pages: {
       icon: FolderKanban,
       color: "text-blue-400",
     },
     views: {
       icon: FolderKanban,
       color: "text-blue-400",
     },
     components: {
       icon: FolderCog,
       color: "text-cyan-400",
     },
     layouts: {
       icon: FolderKanban,
       color: "text-indigo-400",
     },
     hooks: {
       icon: FolderCheck,
       color: "text-teal-400",
     },
     utils: {
       icon: FolderCog,
       color: "text-amber-400",
     },
     lib: {
       icon: FolderCog,
       color: "text-violet-400",
     },
     helpers: {
       icon: FolderCog,
       color: "text-amber-400",
     },
     services: {
       icon: FolderCog,
       color: "text-emerald-400",
     },
     api: {
       icon: Globe,
       color: "text-green-400",
     },
     routes: {
       icon: FolderKanban,
       color: "text-indigo-400",
     },
     controllers: {
       icon: FolderCog,
       color: "text-purple-400",
     },
     middleware: {
       icon: ShieldCheck,
       color: "text-orange-400",
     },
     models: {
       icon: Database,
       color: "text-teal-400",
     },
     schemas: {
       icon: FolderCheck,
       color: "text-lime-400",
     },
     types: {
       icon: Languages,
       color: "text-blue-300",
     },
     constants: {
       icon: FolderKanban,
       color: "text-yellow-400",
     },
 
     // Styling and static resources
     public: {
       icon: Globe,
       color: "text-emerald-400",
     },
     assets: {
       icon: Image,
       color: "text-pink-400",
     },
     images: {
       icon: Image,
       color: "text-pink-400",
     },
     img: {
       icon: Image,
       color: "text-pink-400",
     },
     icons: {
       icon: Image,
       color: "text-fuchsia-400",
     },
     styles: {
       icon: Palette,
       color: "text-violet-400",
     },
     css: {
       icon: Palette,
       color: "text-violet-400",
     },
     fonts: {
       icon: Languages,
       color: "text-rose-300",
     },
 
     // Testing and documentation
     tests: {
       icon: TestTube,
       color: "text-green-400",
     },
     __tests__: {
       icon: TestTube,
       color: "text-green-400",
     },
     e2e: {
       icon: TestTube,
       color: "text-lime-400",
     },
     docs: {
       icon: FolderSearch,
       color: "text-blue-300",
     },
     documentation: {
       icon: FolderSearch,
       color: "text-blue-300",
     },
 
     // Build and dependencies
     node_modules: {
       icon: Package,
       color: "text-zinc-500",
     },
     vendor: {
       icon: Package,
       color: "text-zinc-500",
     },
     dist: {
       icon: FolderCheck,
       color: "text-zinc-500",
     },
     build: {
       icon: FolderCheck,
       color: "text-zinc-500",
     },
     coverage: {
       icon: TestTube,
       color: "text-zinc-500",
     },
 
     // Project and configuration
     config: {
       icon: Settings,
       color: "text-orange-400",
     },
     scripts: {
       icon: FolderCog,
       color: "text-yellow-400",
     },
     migrations: {
       icon: Database,
       color: "text-orange-300",
     },
     prisma: {
       icon: Database,
       color: "text-teal-300",
     },
     ".git": {
       icon: FolderGit2,
       color: "text-orange-400",
     },
     ".github": {
       icon: FolderGit2,
       color: "text-zinc-400",
     },
     ".vscode": {
       icon: Settings,
       color: "text-blue-400",
     },
     ".next": {
       icon: FolderCode,
       color: "text-zinc-400",
     },
     ".vercel": {
       icon: Globe,
       color: "text-zinc-400",
     },
   };
 
   const result = folderMap[key];
 
   if (result) {
     return {
       ...result,
       isOpen,
     };
   }
 
   return {
     icon: isOpen ? FolderOpen : Folder,
     color: "text-sky-400",
     isOpen,
   };
 };


