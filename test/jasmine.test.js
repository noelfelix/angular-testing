//More thorough version of this at jasmine.github.io/2.0/introduction.html

describe('Basic jasmine functionality test', () => {
  let x, y, context;

  it('should have various expectations using different matchers', () => {
    let z = 1;

    expect(x).toBe(undefined);
    expect(x).toEqual(undefined);
    expect(x).toBeUndefined();

    expect(x).not.toEqual(false);
    expect(x).toBeFalsy();

    expect(x).not.toBe(null);
    expect(x).not.toEqual(null);
    expect(x).not.toBeTruthy();

    x = 1;

    expect(x).not.toEqual(true);
    expect(x).toBeTruthy();

    expect(x).not.toBe('1');
    expect(x).not.toEqual('1');

    expect(x).toBe(z);
    expect(x).toEqual(z);

    x = { z: z };
    y = { z: z };

    expect(x).toEqual(y);
    expect(x).not.toBe(y);

    y = x;

    expect(x).toBe(y);
  });

  it('should retain proper function scope between specs', () => {
    expect(x.z).toBe(1);
    try {
      expect(z).toBeUndefined();
    }
    catch(e) {
      expect(e.toString()).toBe('ReferenceError: z is not defined');
    }
  });

  describe('nested describes and before each', () => {
    it('should apply beforeEach hook regardless of where in the describe block it is defined', () => {
      expect(x).toBe(undefined);
      expect(y.z).toBe(1);
      x = "DEFINED";
    });

    beforeEach(() => {
      x = undefined;
    });

    it('should run beforeEach function before each spec in the describe', () => {
      expect(x).not.toBe('DEFINED');
      expect(x).toBe(undefined);
    });
  });

  describe('testing functions', () => {
    beforeEach(() => {
      context = {
        func: x => x * x
      };
    });

    it('should be used to test predicted return values', () => {
      expect(context.func(3)).toBe(9);
      expect(context.func(context.func(3))).toBe(81);
    });

    it('should use spyOn to test function calls, given an object and the key of the method', () => {
      spyOn(context, 'func');
      context.func(3);
      context.func(3, 'unused_param');
      expect(context.func).toHaveBeenCalled();
      expect(context.func).toHaveBeenCalledWith(3);
      expect(context.func).toHaveBeenCalledWith(3, 'unused_param');
      expect(context.func).not.toHaveBeenCalledWith('unused_param');
    });

    it('should prevent function call with spyon, mock return values with returnValue', () => {
      let val = 0;
      context.func = () => { val = 1 };

      spyOn(context, 'func').and.returnValue(42);
      context.func();
      expect(context.func).toHaveBeenCalled();
      expect(val).toBe(0);
      expect(context.func()).toBe(42);
    });

    it('should allow function call with callThrough', () => {
      let val = 0;
      context.func = () => { val = 1 };

      spyOn(context, 'func').and.callThrough();
      context.func();
      expect(val).toBe(1);
    });

    describe('async without done', () => {
      let val, asyncWithoutDone;

      asyncWithoutDone = () => {
        setTimeout(() => {
          val = 1;
        }, 10);
      };


      beforeEach(() => {
        asyncWithoutDone();
      });

      it('should not handle async operations', () => {
        expect(val).toBeUndefined();
      });
    });

    describe('async with done', () => {
      let val, asyncWithDone;

      asyncWithDone = done => {
        setTimeout(() => {
          val = 1;
          done();
        }, 10);
      };


      beforeEach(done => {
        asyncWithDone(done);
      });

      it('should handle async operations with done', () => {
        expect(val).toBe(1);
      });
    });
  });
});