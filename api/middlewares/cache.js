import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 });

const cacheMiddleware = (key) => {
  return (req, res, next) => {
    let content = cache.get(`${key} - ${JSON.stringify(req.pagination)}`);

    if (!content) {
      return next();
    }

    return res.status(200).send(content);
  };
};

export { cache, cacheMiddleware };
