import auth from './mutation-auth';

import client from './initGraphQl';

const clientLogin = (email: string, password: string) => client.mutate({ mutation: auth.tokenAuth, variables: { email, password } });

const clientVerifyToken = (token: string) => client.mutate({ mutation: auth.verifyToken, variables: { token } });

const clientRefreshToken = (token: string) => client.mutate({ mutation: auth.refreshToken, variables: { token } });

export { clientLogin, clientVerifyToken, clientRefreshToken };
