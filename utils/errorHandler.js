const errorHandlerController =
  (controller, { status } = { status: 200 }) =>
  async (req, res, next) => {
    try {
      const result = await controller(req, res, next);

      return res.status(status).json(result);
    } catch (error) {
      next(error);
    }
  };

const errorHandlerAsync =
  (func) =>
  (...params) =>
    func(...params)
      .then((data) => data)
      .catch((err) => err);

module.exports = {
  errorHandlerController,
  errorHandlerAsync
};
