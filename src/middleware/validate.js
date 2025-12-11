import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Data tidak valid!',
      errors: errors.array(),
    });
  }

  next();
};
