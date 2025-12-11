import 'dotenv/config';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import authService from '../services/authService.js';

const login = async (req, res) => {
  try {
    const dataLogin = req.body;
    const { user, token } = await authService.login(dataLogin);

    return sendSuccess(res, 200, 'Login berhasil', {
      user: user,
      token: token,
    });
  } catch (error) {
    // Log error untuk debugging
    console.error('Error di AuthController.login:', error);

    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 500 ? 'Terjadi kesalahan pada server' : error.message;

    return sendError(res, statusCode, message);
  }
};

const register = async (req, res) => {
  try {
    const dataRegristrasi = req.body;

    const { userData, token } = await authService.register(dataRegristrasi);

    return sendSuccess(res, 201, 'Registrasi berhasil', {
      token: token,
      user: userData,
    });
  } catch (error) {
    // Log error untuk debugging
    console.error('Error di AuthController.register:', error);

    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 500 ? 'Terjadi kesalahan pada server' : error.message;

    return sendError(res, statusCode, message);
  }
};

export default { login, register };
