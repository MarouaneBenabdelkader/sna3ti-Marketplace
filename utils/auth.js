import * as jose from 'jose';
// const { JWKS, JWT } = require('jose')
const parseJwt = async (token) => {
    try {
        const { payload: jwtData } = await jose.jwtVerify(
            token, new TextEncoder().encode(process.env.jwtSecret)
        );
        return jwtData.user;
    } catch (error) {
        console.log(error);
        // JWT validation failed or token is invalid
        return {}
    }
}
export default parseJwt;



