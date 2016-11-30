let mockTodoData, mockTokenNotExpired;

mockTodoData = {
  task: "Run tests before deployment.",
  completed: false
};
mockTokenNotExpired = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5OTk5OTk5OTk5OTk5fQ.g61RofHSdKyC4OCcwxqNI-PTON5D8Fqbw5rE1tUq3TI";

export default {
  mockTodoData: mockTodoData,
  mockUserData: {
    username: "John Doe",
    password: "Password",
    token: mockTokenNotExpired,
    todos: [mockTodoData]
  },
  mockTokenNotExpired: mockTokenNotExpired,
  mockTokenExpired: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxfQ.ZXRl43LVjm9X6dvwKuKxl86SmT7fGmIVmXdqvaUxloc",
  mockError: "User not found",
  testGreeter: class {
    constructor(name) {
      this.name = name;
      this.countByName = {};
    }

    helloWorld() {
      return "Hello world"
    }

    greet(name = this.name) {
      this.incrementCount(name);
      return `Hi there ${name}`;
    }

    incrementCount(name) {
      this.countByName[name] = ++this.countByName[name] || 1;
    }
  }
}
