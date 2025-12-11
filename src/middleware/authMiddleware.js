import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { sendError } from '../utils/apiResponse.js';

export const checkToken = (req, res, next) => {
  let token;
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    return sendError(res, 401, 'Akses ditolak, token tidak ada');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, 401, 'Token tidak valid atau kadaluarsa');
  }
};
