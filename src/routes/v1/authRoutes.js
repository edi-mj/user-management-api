import express from 'express';

import authController from '../../controllers/authController.js';
import { body } from 'express-validator';
import { validate } from '../../middleware/validate.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').notEmpty().withMessage('Email wajib diisi!'),
    body('password').notEmpty().withMessage('Password wajib diisi!'),
  ],
  validate,
  authController.login
);

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Nama tidak boleh kosong!'),
    body('email')
      .notEmpty()
      .withMessage('Email tidak boleh kosong')
      .isEmail()
      .withMessage('Email tidak valid!'),
    body('password')
      .notEmpty()
      .withMessage('Password tidak boleh kosong')
      .isLength({ min: 6 })
      .withMessage('Password minimal 6 karakter!'),
    body('contact_info')
      .optional()
      .isNumeric()
      .withMessage('Contact info harus berupa angka!'),
  ],
  validate,
  authController.register
);

export default router;
