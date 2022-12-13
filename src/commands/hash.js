import { createHash } from "crypto";
import { checkThatExist } from "../helpers.js";

export const hash = async (pathToFile) => {
  await checkThatExist(pathToFile);
  const hash = createHash("sha256").update(pathToFile).digest("hex");
  console.log(`Hash of ${pathToFile} is: ${hash}`);
};
