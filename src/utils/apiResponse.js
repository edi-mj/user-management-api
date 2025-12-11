/**
 * Helper buat kirim respon sukses (HTTP 2xx)
 * @param {object} res - Objek 'response' dari Express
 * @param {number} statusCode - HTTP Status Code (misal: 200, 201)
 * @param {string} message - Pesan sukses buat client
 * @param {object|array|null} data - Data yang mau dikirim (opsional)
 */
export const sendSuccess = (res, statusCode, message, data = null) => {
  const responsePayload = {
    status: 'success',
    message: message,
  };

  if (data !== null) {
    responsePayload.data = data;
  }

  return res.status(statusCode).json(responsePayload);
};

/**
 * Helper buat kirim respon error (HTTP 4xx atau 5xx)
 * @param {object} res - Objek 'response' dari Express
 * @param {number} statusCode - HTTP Status Code (misal: 400, 404, 500)
 * @param {string} message - Pesan error yang aman buat client
 */
export const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: 'error',
    message: message,
  });
};
