import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const jwtDataOptions = {
  secret: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
};
const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token?.split(" ")[1], jwtDataOptions.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;

    res.set(
      "authn-challenge-verifier",
      String(
        crypto
          .createHash("md5")
          .update(req.baseUrl + "authn")
          .digest("hex")
      ).slice(-10)
    );

    next();
  });
};

const verifyAuthorization = (authorizedRoles) => (req, res, next) => {
  try {
    const { user } = req;

    if (!user || !user.role || !authorizedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.set(
      "authr-challenge-verifier",
      String(
        crypto
          .createHash("md5")
          .update(req.baseUrl + "authr")
          .digest("hex")
      ).slice(-10)
    );

    res.set(
      "authr-challenge-verifier-role",
      String(
        `${crypto
          .createHash("md5")
          .update(authorizedRoles.toString())
          .digest("hex")}`
      ).slice(-10)
    );

    next();
  } catch (error) {
    console.error("Error authorizing user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while authorizing the user" });
  }
};

async function basicAuth(req, res, next) {
  // check for basic auth header
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic ") === -1
    ) {
      return res.status(401).json({ message: "Missing Authorization Header" });
    }

    console.log("req.headers", req.headers);

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    console.log("username password", username, password);

    if (!(process.env.USER === username && process.env.PASSWORD === password)) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials" });
    }
    req.verifiedAdmin = true;
    req.user = {
      role: "admin",
    };

    res.set(
      "authb-challenge-verifier",
      String(
        crypto
          .createHash("md5")
          .update(req.baseUrl + "authb")
          .digest("hex")
      ).slice(-10)
    );

    next();
  } catch (err) {
    console.error("Error basic auth:", err);
    res
      .status(500)
      .json({ error: "An error occurred while authenticating the user" });
  }
}

export { verifyToken, verifyAuthorization, basicAuth };
