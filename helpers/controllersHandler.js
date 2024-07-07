const controllerHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export default controllerHandler;