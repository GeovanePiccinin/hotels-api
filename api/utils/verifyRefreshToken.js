import UsersService from "../v1/services/users.service.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, privateKey, async (err, tokenDetails) => {
      if (err) {
        return reject({ error: true, message: "Invalid refresh token" });
      }

      const user = await UsersService.getUser(tokenDetails.id);

      if (user.refreshToken !== refreshToken) {
        return reject({ error: true, message: "Invalid refresh token" });
      }

      resolve({
        tokenDetails,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
};

export default verifyRefreshToken;
