import fs from "fs/promises";
import path from "path";

export const resolvePath = (currentPath, newPath) => {
  return path.resolve(currentPath, newPath);
};

export const isExist = async (path) => {
  try {
    console.log(path);
    await fs.access(path);
  } catch (err) {
    throw err;
  }
};
