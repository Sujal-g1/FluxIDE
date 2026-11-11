
import pty from "node-pty";

console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
console.log("node-pty version:", process.version);

try {
  const terminal = pty.spawn(
    "/bin/zsh",
    ["-l"],
    {
      name: "xterm-256color",
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: {
        ...process.env,
        TERM: "xterm-256color",
      },
    }
  );

  terminal.onData((data) => {
    process.stdout.write(data);
  });

  terminal.onExit(({ exitCode }) => {
    console.log("Shell exited:", exitCode);  
  });

  console.log("PTY started successfully.");
} catch (error) {
  console.error("PTY test failed:", error);
}