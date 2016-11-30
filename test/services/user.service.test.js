import angular from 'angular';
import 'angular-mocks';
import mockData from '../testData';
import CONSTANTS from '../../app/config/constants';

describe('userService', () => {
  let $httpBackend, mockResponse, authenticated;

  mockResponse = {
    code: 200,
    data: mockData.mockUserData
  };

  //Real app would need tests for app/config/interceptors/httpAuthInterceptor to justify variable below (see: userService constructor and register function)
  authenticated = false;

  beforeEach(() => {
    angular.mock.module('todoApp');

    //Having wrote tests for sessionService, we can use local variables and minimal mock functions.
    angular.mock.module($provide => {
      $provide.service('sessionService', () => ({
        //Justified by backend jwt/response formation (real app would have own tests) and existing sessionService tests
        getCurrentSessionUser:  () => mockResponse.data.username,
        //Justified by tests: backend jwt/response formation and tests, as well as httpInterceptor tests
        isAuthenticated: () => authenticated,
        retrieveSession: () => mockData.mockTokenNotExpired,
        removeSession: angular.noop,
        storeSession: angular.noop
      }));

      $provide.service('$state', () => ({
        go: angular.noop,
        current: {
          name: 'login'
        }
      }));
    });

    inject(_$httpBackend_ => {
      $httpBackend = _$httpBackend_;
    });

    $httpBackend.when('GET', CONSTANTS.USER_ENDPOINT).respond(200, mockData.mockUserData);
    $httpBackend.when('POST', CONSTANTS.USER_ENDPOINT).respond(200, mockData.mockUserData);
    $httpBackend.when('POST', `${CONSTANTS.USER_ENDPOINT}/${mockResponse.data.username}`).respond(200, mockData.mockUserData);
    $httpBackend.when('DELETE', CONSTANTS.USER_ENDPOINT).respond(200, mockData.mockUserData);
  });

  describe('Service initialization', () => {
    it('initializes with expected dependencies', inject(userService => {
      expect(userService.$http).toBeDefined();
      expect(userService.$state).toBeDefined();
      expect(userService.CONSTANTS).toBeDefined();
      expect(userService.sessionService).toBeDefined();
    }));

    describe('current user', () => {
      it('is undefined if not authenticated', inject(userService => {
        expect(userService.currentUser).toBeUndefined();

        /*
        Below preps next test
        Only justify this approach based on would be backend and interceptor tests (as well as our sessionService tests)
         */
        authenticated = true;
      }));


      it('is set if authenticated', inject(userService => {
        expect(userService.currentUser).toBe(mockResponse.data.username);
      }));
    });
  });

  describe('Register', () => {
    it('correctly makes api call', inject(userService => {
      spyOn(userService, '$http').and.callThrough();
      userService.register(mockData.mockUserData.username, mockData.mockUserData.password);
      expect(userService.$http).toHaveBeenCalledWith({
        method: 'POST',
        url: CONSTANTS.USER_ENDPOINT,
        data: {
          username: mockData.mockUserData.username,
          password: mockData.mockUserData.password
        }
      });
    }));

    it('sets current user', inject(userService => {
      spyOn(userService.sessionService, 'getCurrentSessionUser');
      userService.register(mockData.mockUserData.username, mockData.mockUserData.password);
      $httpBackend.flush();
      expect(userService.sessionService.getCurrentSessionUser).toHaveBeenCalled();
    }));

    it('navigates to todos', inject(userService => {
      spyOn(userService.$state, 'go');
      userService.register(mockData.mockUserData.username, mockData.mockUserData.password);
      $httpBackend.flush();
      expect(userService.$state.go).toHaveBeenCalledWith('todos');
    }));
  });

  describe('Login', () => {
    it('correctly makes api call', inject(userService => {
      spyOn(userService, '$http').and.callThrough();
      userService.login(mockData.mockUserData.username, mockData.mockUserData.password);
      expect(userService.$http).toHaveBeenCalledWith({
        method: 'POST',
        url: `${CONSTANTS.USER_ENDPOINT}/${mockData.mockUserData.username}`,
        data: {
          password: mockData.mockUserData.password
        }
      });
    }));

    it('sets current user', inject(userService => {
      spyOn(userService.sessionService, 'getCurrentSessionUser');
      userService.login(mockData.mockUserData.username, mockData.mockUserData.password);
      $httpBackend.flush();
      expect(userService.sessionService.getCurrentSessionUser).toHaveBeenCalled();
    }));

    it('navigates to todos with users todos', inject(userService => {
      spyOn(userService.$state, 'go');
      userService.login(mockData.mockUserData.username, mockData.mockUserData.password);
      $httpBackend.flush();
      expect(userService.$state.go).toHaveBeenCalledWith('todos', {
        todos: mockData.mockUserData.todos
      });
    }));

    it('logs and returns the error on an invalid login attempt', inject(userService => {
      let errorUsername = "NON_EXISTENT_USERNAME";
      $httpBackend.when('POST', `${CONSTANTS.USER_ENDPOINT}/${errorUsername}`).respond(400, mockData.mockError);

      spyOn(console, 'error');
      userService.login(errorUsername, "PASSWORD");
      $httpBackend.flush();

      //Below is an example of isolating a specific key/value to check
      expect(console.error.calls.mostRecent().args[0].data).toBe(mockData.mockError);
    }));
  });

  describe('Logout', () => {
    it('destroys current session', inject(userService => {
      spyOn(userService.sessionService, 'removeSession');
      userService.logout();
      expect(userService.sessionService.removeSession).toHaveBeenCalled();
    }));

    it('sets current user to undefined', inject(userService => {
      //Line below is optional due to spec "Service initialization current user is set if authenticated (:69)"
      expect(userService.currentUser).toBe(mockResponse.data.username);
      userService.logout();
      expect(userService.currentUser).toBeUndefined();
    }));

    it('navigates to login on logout', inject(userService => {
      spyOn(userService.$state, 'go');
      userService.logout();
      expect(userService.$state.go).not.toHaveBeenCalled();

      userService.$state.current.name = "notLogin";
      userService.logout();
      expect(userService.$state.go).toHaveBeenCalledWith('login');
    }));
  });
});