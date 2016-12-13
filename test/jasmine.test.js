//More thorough version of this at jasmine.github.io/2.0/introduction.html

describe('Basic jasmine functionality test', () => {
  let x, y, context;

  it('should have various expectations using different matchers', () => {
    let z = 1;

    expect(x).toBe(undefined);
    expect(x).toEqual(undefined);
    expect(x).toBeUndefined();

    //difference between false and "falsy"
    expect(x).not.toEqual(false);
    expect(x).toBeFalsy();

    //undefined !== null
    expect(x).not.toBe(null);
    expect(x).not.toEqual(null);
    expect(x).not.toBeTruthy();

    x = 1;

    //difference between true and "truthy"
    expect(x).not.toEqual(true);
    expect(x).toBeTruthy();

    //No type conversion
    expect(x).not.toBe('1');
    expect(x).not.toEqual('1');

    //toBe and toEqual concerning primitives
    expect(x).toBe(z);
    expect(x).toEqual(z);

    x = { z: z };
    y = { z: z };

    /*
     toBe and toEqual concerning objects:

     toEqual - deep value comparison
     toBe - strictly identity comparison
     */

    expect(x).toEqual(y);
    expect(x).not.toBe(y);

    y = x;

    expect(x).toBe(y);
  });

  it('retains proper function scope between individual specs', () => {
    //x remains since declared in describe scope
    expect(x.z).toBe(1);

    //z was declared in prev spec scope and in current spec is not defined and first test will error

    //Try catch blocks control flow like normal, below registers as one passing test, not fail/pass
    try {
      expect(z).toBeUndefined();
    }
    catch(e) {
      expect(e.toString()).toBe('ReferenceError: z is not defined');
    }
  });

  describe('nested describes and beforeEach', () => {

    it('exectues beforeEach hook regardless of where in the describe block it is defined', () => {
      expect(x).toBe(undefined);
      expect(y.z).toBe(1);
      x = "DEFINED";
    });

    it('executes beforeEach function before each spec in the describe block', () => {
      expect(x).not.toBe('DEFINED');
      expect(x).toBe(undefined);
    });

    //This is poor placement, just an example.
    beforeEach(() => {
      x = undefined;
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
      //Format: spyon({object reference}, {method key as a string})
      spyOn(context, 'func');

      context.func(3);
      context.func(3, 'unused_param');

      expect(context.func).toHaveBeenCalled();
      expect(context.func).toHaveBeenCalledWith(3);
      expect(context.func).toHaveBeenCalledWith(3, 'unused_param');

      expect(context.func).not.toHaveBeenCalledWith('unused_param', 3);
      expect(context.func).not.toHaveBeenCalledWith('unused_param');
    });

    it('should prevent function call with spyon, mock return values with returnValue', () => {
      let val = 0;
      context.func = () => { val = 1 };

      //We can mock return values
      spyOn(context, 'func').and.returnValue(42);

      //By default, spyOn prevents the actual function from being called
      context.func();
      expect(context.func).toHaveBeenCalled();
      expect(val).toBe(0); //Val remains unchanged

      expect(context.func()).toBe(42);
    });

    it('should allow function call with callThrough', () => {
      let val = 0;
      context.func = () => { val = 1 };

      //Use callThrough to spy and execute function call
      spyOn(context, 'func').and.callThrough();
      context.func();
      expect(context.func).toHaveBeenCalled();
      expect(val).toBe(1);
    });

    describe('async without done', () => {
      //By default, does not wait for async operations to complete
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
        //spec did not wait for timeout to complete
        expect(val).toBeUndefined();
      });
    });

    describe('async with done', () => {
      //beforeEach, it, and afterEach can take in optional argument to be called when async ops complete
      let val, asyncWithDone;

      asyncWithDone = done => {
        setTimeout(() => {
          val = 1;
          done();
        }, 10);
      };

      //Standard naming convention is to call this arg 'done'
      beforeEach(done => {
        asyncWithDone(done);
      });

      it('should handle async operations with done', () => {
        //spec "waited" until done()
        expect(val).toBe(1);
      });
    });
  });
});