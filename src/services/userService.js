import User from '../models/User.js';

export const findUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    const error = new Error('Pengguna tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export const updateUser = async (id, updateData) => {
  const user = await User.findByPk(id);

  if (!user) {
    const error = new Error('Pengguna tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  if (updateData.email && updateData.email !== user.email) {
    const existingUser = await User.findOne({
      where: { email: updateData.email },
    });

    if (existingUser) {
      const error = new Error('Email sudah digunakan');
      error.statusCode = 409;
      error.field = 'email';
      throw error;
    }
  }

  await user.update(updateData);

  return user;
};
