import { findUserById, updateUser } from '../services/userService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    return sendSuccess(res, 200, 'user ditemukan', user);
  } catch (error) {
    // Log error untuk debugging
    console.error('Error di UserController.getUserById:', error);

    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 500 ? 'Terjadi kesalahan pada server' : error.message;

    return sendError(res, statusCode, message);
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);

    return sendSuccess(res, 200, 'user berhasil diupdate', updatedUser);
  } catch (error) {
    // Log error untuk debugging
    console.error('Error di UserController.updateUserById:', error);

    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 500 ? 'Terjadi kesalahan pada server' : error.message;

    return sendError(res, statusCode, message);
  }
};
