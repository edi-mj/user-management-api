import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    const error = new Error('Pengguna tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const error = new Error('Email atau password salah');
    error.statusCode = 401;
    throw error;
  }

  const tokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user };
};

const register = async (data) => {
  const { name, email, password, contact_info } = data;

  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) {
    const error = new Error('Email sudah terdaftar');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    contact_info: contact_info,
    role: 'member',
  });

  const tokenPayload = {
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const userData = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    contact_info: newUser.contact_info,
    role: newUser.role,
  };

  return { token, userData };
};

export default { login, register };
