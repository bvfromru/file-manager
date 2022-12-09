import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import os from "os";
import { brotli } from "./commands/brotli.js";
import { files } from "./commands/files.js";
import { hash } from "./commands/hash.js";
import { nwd } from "./commands/nwd.js";
import { sysInfo } from "./commands/sysInfo.js";
import { errors } from "./errors.js";

let __currentPath = os.homedir();

const parseAnswer = (answer) => {
  return answer.split(" ");
};

const changeCurrentPath = (newPath) => {
  __currentPath = newPath;
};

const executeCommand = {
  up() {
    nwd.up(changeCurrentPath, __currentPath);
  },
  async cd(args) {
    await nwd.cd(changeCurrentPath, __currentPath, args);
  },
  async ls() {
    await nwd.ls(__currentPath);
  },
  async cat(args) {
    await files.cat(__currentPath, args);
  },
  os(args) {
    sysInfo(args);
  },
  async hash(args) {
    await hash(__currentPath, args);
  },
  async compress(args) {
    await brotli.compress(__currentPath, args[0], args[1]);
  },
  async decompress(args) {
    await brotli.decompress(__currentPath, args[0], args[1]);
  },
  exit() {
    process.exit(0);
  },
  [".exit"]() {
    process.exit(0);
  },
};

export const startApp = async () => {
  const rl = createInterface({ input, output });
  while (true) {
    const answer = await rl.question(`You are currently in ${__currentPath}\n`);
    const [command, ...args] = parseAnswer(answer);

    if (executeCommand[command]) {
      try {
        await executeCommand[command](args);
      } catch {
        console.log(errors.operationFailed);
      }
    } else {
      console.log(errors.invalidInput);
    }
    // switch (command) {
    //   case "up":
    //     nwd.up(changeCurrentPath, __currentPath);
    //     break;
    //   case "cd":
    //     await nwd.cd(changeCurrentPath, __currentPath, arg);
    //     break;
    //   case "ls":
    //     await nwd.ls(__currentPath);
    //     break;
    //   case ".exit":
    //   case "exit":
    //     process.exit(0);
    //   default:
    //     errors.invalidInput();
    // }
  }
};
