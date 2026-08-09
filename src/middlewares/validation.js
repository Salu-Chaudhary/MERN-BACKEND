const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  console.log(result);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      error: result.error.format(),
    });
  }

  req.body = result.data;

  next();
};

export default validate;
