import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error('Invalid token');
    return null;
  }
}
