import os from "os";
import { createInterface } from "readline/promises";
import { brotli, files, hash, nwd, sysInfo } from "./commands/index.js";
import { MESSAGES } from "./messages.js";

let currentPath = os.homedir();

const parseAnswer = (answer) => {
  let args = answer.split(" ");
  if (/"|'/g.test(args)) {
    args = args
      .join(" ")
      .split(/["'] | ["']/)
      .map((arg) => arg.replace(/"|'/g, ""));
  }
  return args;
};

const changeCurrentPath = (newPath) => {
  currentPath = newPath;
};

const executeCommand = {
  up() {
    nwd.up(changeCurrentPath, currentPath);
  },
  async cd(args) {
    await nwd.cd(changeCurrentPath, currentPath, args[0]);
  },
  async ls() {
    await nwd.ls(currentPath);
  },
  async cat(args) {
    await files.cat(currentPath, args[0]);
  },
  async add(args) {
    await files.add(currentPath, args[0]);
  },
  async rn(args) {
    await files.rn(currentPath, args[0], args[1]);
  },
  async cp(args) {
    await files.cp(currentPath, args[0], args[1]);
  },
  async mv(args) {
    await files.mv(currentPath, args[0], args[1]);
  },
  async rm(args) {
    await files.rm(currentPath, args[0]);
  },
  os(args) {
    sysInfo(args[0]);
  },
  async hash(args) {
    await hash(currentPath, args[0]);
  },
  async compress(args) {
    await brotli.compress(currentPath, args[0], args[1]);
  },
  async decompress(args) {
    await brotli.decompress(currentPath, args[0], args[1]);
  },
  [".exit"]() {
    process.exit();
  },
};

export const startApp = async () => {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  while (true) {
    const answer = await rl.question(`You are currently in ${currentPath}\n`);
    const [command, ...args] = parseAnswer(answer);

    if (executeCommand[command]) {
      try {
        await executeCommand[command](args);
      } catch {
        console.log(MESSAGES.operationFailed);
      }
    } else {
      console.log(MESSAGES.invalidInput);
    }
  }
};
