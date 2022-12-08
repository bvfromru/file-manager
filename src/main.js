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

export const startApp = async () => {
  const rl = createInterface({ input, output });
  while (true) {
    const answer = await rl.question(`You are currently in ${__currentPath}\n`);
    const [command, arg] = parseAnswer(answer);

    switch (command) {
      case "up":
        nwd.up(changeCurrentPath, __currentPath);
        break;
      case "cd":
        await nwd.cd(changeCurrentPath, __currentPath, arg);
        break;
      case "ls":
        await nwd.ls(__currentPath);
        break;
      case ".exit":
      case "exit":
        process.exit(0);
      default:
        errors.invalidInput();
    }
  }
};
