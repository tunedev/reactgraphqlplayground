exports.validateId = async (request, response, next) => {
  const { id: idFromBody } = request.body;
  const { id: idFromParams } = request.params;

  const id = idFromBody || idFromParams;

  if (!id) {
    return response.status(400).json({
      status: 'Failed',
      message: 'Id is required',
    });
  }

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return response.status(400).json({
      status: 'Failed',
      message: 'Id is invalid',
    });
  }

  next();
};
