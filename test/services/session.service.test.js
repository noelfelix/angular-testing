import angular from 'angular';
import 'angular-mocks'
import mockData from '../testData';

describe('sessionService', () => {
  let sessionService, store, mockLocalStorage, expToken, validToken;

  mockLocalStorage = {};
  expToken = mockData.mockTokenExpired;
  validToken = mockData.mockTokenNotExpired

  beforeEach(() => {
    angular.mock.module('todoApp');

    /*
    Mocked for two reasons:
      First, to prevent any actual writing to local storage.
      Second, and more importantly, to limit the scope of our unit test to our service.
      Utilize the existing testing of angular-storage, allowing us to minimally mock the interaction/functionality we need.
      Likewise for our own created service.
    */

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
      }));
    });

    //Inject the service we want to test
    inject(_sessionService_ => {
      sessionService = _sessionService_;
    });
  });

  describe('Service initialization', () => {
    it('initializes with expected dependencies', () => {
      expect(sessionService.CONSTANTS).toBeDefined();
      expect(sessionService.store).toBeDefined();
    });

    it('initializes with no current session if none exists', () => {
      expect(sessionService.currentSessionToken).toBeUndefined();
    });
  });

  describe('Session storage/retrieval/removal', () => {
    it('stores and retrieves a session token', () => {
      expect(sessionService.retrieveSession()).toBeUndefined();
      sessionService.storeSession(validToken);
      expect(sessionService.retrieveSession()).toBe(validToken);
    });

    it('stores the current session token on the service', () => {
      expect(sessionService.currentSessionToken).toBe(validToken);
    });

    it('removes a session', () => {
      expect(sessionService.retrieveSession()).toBe(validToken);
      sessionService.removeSession();
      expect(sessionService.retrieveSession()).toBeUndefined();
    })
  });

  describe('Token authentication and user retrieval', () => {
    it('retrieves the current session user', () => {
      sessionService.storeSession(expToken);
      expect(sessionService.getCurrentSessionUser()).toBe('John Doe');
    });

    it('identifies a non-existent/expired session as not authenticated', () => {
      expect(sessionService.retrieveSession()).toBe(expToken);
      expect(sessionService.isAuthenticated()).toBe(false);
      sessionService.removeSession();
      expect(sessionService.isAuthenticated()).toBe(false);
    });

    it('identifies an existing/non-expired session as authenticated', () => {
      sessionService.storeSession(validToken);
      expect(sessionService.isAuthenticated()).toBe(true);
    });
  });
});