import angular from 'angular';
import 'angular-mocks'
import mockData from '../testData';

/*
Alternative format injects dependencies per spec.

PROS:
Is a more modular, robust testing format as each individual spec runs with a fresh instantiated service.
Other format has changes to service persisting between tests, requiring tests be written conscious of one another and test order.
See line 62 and compare test from other for example.

CONS:
Redundancy in writing tests (above and beyond repeatedly injecting the same dependencies).
If testing various points in a complex action, each test would need to build up to the test state manually.
 */

describe('sessionService', () => {
  let store, mockLocalStorage, expToken, validToken;

  expToken = mockData.mockTokenExpired;
  validToken = mockData.mockTokenNotExpired

  beforeEach(() => {
    angular.mock.module('todoApp');

    angular.mock.module($provide => {
      $provide.service('store', () => ({
          get: key => mockLocalStorage[key],
          set: (key, val) => {
            mockLocalStorage[key] = val;
          },
          remove: key => {
            mockLocalStorage[key] = undefined;
            delete mockLocalStorage[key];
          }
        })
      );
    });

    mockLocalStorage = {};
  });

  describe('Service initialization and basic functionality', () => {
    it('initializes with expected dependencies', inject(sessionService => {
      expect(sessionService.CONSTANTS).toBeDefined();
      expect(sessionService.store).toBeDefined();
    }));

    it('initializes with no current session if none exists', inject(sessionService => {
      expect(sessionService.currentSessionToken).toBeUndefined();
    }));
  });

  describe('Session storage/retrieval/removal', () => {
    it('stores and retrieves a session token', inject(sessionService => {
      expect(sessionService.retrieveSession()).toBeUndefined();
      sessionService.storeSession(validToken);
      expect(sessionService.retrieveSession()).toBe(validToken);
    }));

    //COMPARE BELOW TEST
    it('stores the current session token on the service', inject(sessionService => {
      sessionService.storeSession(validToken);
      expect(sessionService.currentSessionToken).toBe(validToken);
    }));

    it('removes a session', inject(sessionService => {
      sessionService.storeSession(validToken);
      sessionService.removeSession();
      expect(sessionService.retrieveSession()).toBeUndefined();
    }));
  });

  describe('Token authentication and user retrieval', () => {
    it('retrieves the current session user', inject(sessionService => {
      expect(sessionService.getCurrentSessionUser()).toBeUndefined();
      sessionService.storeSession(expToken);
      expect(sessionService.getCurrentSessionUser()).toBe('John Doe');
    }));

    it('identifies a non-existent/expired session as not authenticated', inject(sessionService => {
      expect(sessionService.retrieveSession()).toBeUndefined();
      expect(sessionService.isAuthenticated()).toBe(false);
      sessionService.storeSession(expToken);
      expect(sessionService.isAuthenticated()).toBe(false);
    }));

    it('identifies an existing/non-expired session as authenticated', inject(sessionService => {
      sessionService.storeSession(validToken);
      expect(sessionService.isAuthenticated()).toBe(true);
    }));
  });
});