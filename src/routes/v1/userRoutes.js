import express from 'express';

import {
  getUserById,
  updateUserById,
} from '../../controllers/userController.js';
import { checkToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/', checkToken, getUserById);

router.get('/:id', checkToken, getUserById);
router.put('/:id', checkToken, updateUserById);

export default router;
