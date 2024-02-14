import jwt from "jsonwebtoken";

const generateTokens = async (user) => {
  try {
    const payload = { id: user.userId, role: user.role };

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
      }
    );

    return { accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

export default generateTokens;
