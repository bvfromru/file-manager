import { errors } from "./errors.js";
import { startApp } from "./main.js";

const greeting = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

const goodbye = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

const args = process.argv.slice(2);
const lastArg = args[args.length - 1];

if (lastArg.includes("--username=")) {
  const username = lastArg.replace("--username=", "") ?? "Anonymous";
  greeting(username);
  process.on("exit", () => goodbye(username));
  await startApp();
} else {
  errors.wrongArgs();
}
