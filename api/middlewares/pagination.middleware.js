const paginationSortingMiddleware = () => {
  return (req, res, next) => {
    //get params from query params
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = (page - 1) * limit;

    const sort = req.query.sort ? req.query.sort : "ASC";
    const sortby = req.query.sortby;

    //sets the basic pagination info
    let pagination = {
      offset,
      limit,
    };

    //adds ordering if so
    if (sortby && sort) {
      pagination.order = [[sortby, sort]];
    }

    req.pagination = pagination;
    next();
  };
};

export default paginationSortingMiddleware;
