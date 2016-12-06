import testData from './testData';

describe('Basic testing without any Angular', () => {
  let greeter, name, greeting;

  name = "Dev Extraordinaire";
  greeting = "Hi there";

  beforeEach(() => {
    greeter = new testData.testGreeter(name);
  });

  describe('Class instantiation', () => {
    it('initializes name value from constructor argument', () => {
      expect(greeter.name).toBe(name);
    });

    it('instantiates countByName to an empty object', () => {
      expect(greeter.countByName).toEqual({});
    });
  });

  describe('Functionality', () => {
    it('hello worlds with the best of them', () => {
      expect(greeter.helloWorld()).toBe('Hello world');
    });

    describe('Greeting by name/Greet function', () => {
      it('greets using default name or name as argument if passed in', () => {
        let otherName = "Jack";

        expect(greeter.greet()).toBe(`${greeting} ${name}`);
        expect(greeter.greet(otherName)).toBe(`${greeting} ${otherName}`);
      });
    });

    describe('Tracking greeting count by name/incrementCount function', () => {
      it('tracks the number of greetings by name', () => {
        let otherName = "Jack";

        expect(greeter.countByName[name]).toBeUndefined();

        greeter.greet();
        expect(greeter.countByName[name]).toBe(1);

        greeter.greet();
        greeter.greet();
        expect(greeter.countByName[name]).toBe(3);

        expect(greeter.countByName[otherName]).toBeUndefined();

        greeter.greet(otherName);
        expect(greeter.countByName[otherName]).toBe(1);

        greeter.greet(otherName);
        greeter.greet(otherName);
        expect(greeter.countByName[otherName]).toBe(3);
      });
    });
  });
});