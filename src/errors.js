export const errors = {
  wrongArgs() {
    console.log("Wrong command line arguments. Arguments should be: '-- --username=your_username'.");
  },
  invalidInput() {
    console.log("Invalid input");
  },
  operationFailed() {
    console.log("Operation failed");
  },
};
