export const doesExist = async (path) => {
  try {
    await fs.access(path);
  } catch (err) {
    throw err;
  }
};
