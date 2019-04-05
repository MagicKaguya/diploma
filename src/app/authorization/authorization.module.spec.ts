import { AuthorizationModule } from './authorization.module';

describe('AuthorizationModule', () => {
  let authorizationModule: AuthorizationModule;

  beforeEach(() => {
    authorizationModule = new AuthorizationModule();
  });

  it('should create an instance', () => {
    expect(authorizationModule).toBeTruthy();
  });
});
