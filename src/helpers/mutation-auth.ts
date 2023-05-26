import { gql } from '@apollo/client';

const auth = {
    tokenAuth: gql`
        mutation tokenAuth($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                refreshToken
            }
        }
    `,
    verifyToken: gql`
        mutation verifyToken($token: String!) {
            verifyJwt(token: $token) {
                payload
            }
        }
    `,
    refreshToken: gql`
        mutation refreshToken($token: String!) {
            login: refreshJwt(refreshToken: $token) {
                token
                refreshToken
            }
        }
    `,
};

export default auth;
