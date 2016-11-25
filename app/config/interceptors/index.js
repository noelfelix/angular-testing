import httpAuthInterceptor from './httpAuthInterceptor';

export default ngModule => {
  httpAuthInterceptor(ngModule);
}