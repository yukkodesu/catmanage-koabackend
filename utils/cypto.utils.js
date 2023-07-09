const { serverKey } = require("../config/server.config");
const cypto = require("crypto-js");
module.exports = {
  generateToken(uid, username) {
    const header = cypto.enc.Base64.parse(
      JSON.stringify({
        alg: "HS256",
        typ: "JWT",
      })
    );
    const payload = cypto.enc.Base64.parse(
      JSON.stringify({
        sub: uid,
        name: username,
        iat: Date.now().toString(),
      })
    );
    const sign = cypto.HmacSHA256(`${header}.${payload}`, serverKey);
    return `${header}.${payload}.${sign}`;
  },
  verifyToken(token) {
    const [header, payload, sign] = token.split(".");
    const sign_verify = cypto.HmacSHA256(`${header}.${payload}`, serverKey).toString();
    if (sign_verify !== sign) return false;
    return true;
  },
};
