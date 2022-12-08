import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import os from "os";
import { nwd } from "./commands/nwd.js";
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
  exit() {
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
        errors.operationFailed();
      }
    } else {
      errors.invalidInput();
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
