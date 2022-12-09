import os from "node:os";
import { errors } from "../errors.js";

export const sysInfo = (args) => {
  const parameter = args[0];
  switch (parameter) {
    case "--eol":
    case "--EOL":
      console.log("EOL:", JSON.stringify(os.EOL));
      break;
    case "--cpus":
      const cpus = os.cpus();
      let result = [];
      cpus.forEach((cpu) => result.push({ Model: cpu.model.trim(), Rate: `${cpu.speed} GHz` }));
      console.log("Overall amount of CPUS:", cpus.length);
      console.table(result);
      break;
    case "--homedir":
      console.log("Home directory:", os.homedir());
      break;
    case "--username":
      console.log("System user name:", os.userInfo().username);
      break;
    case "--architecture":
      console.log("This processor architecture is:", process.arch);
      break;
    default:
      console.log(errors.invalidInput);
  }
};
