import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = 'clavesecretkey'; //process.env.JWT_SECRET_KEY

export const authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ mensaje: "Token requerido" });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'nuevaclavesecretkey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};


  // Si viene con Bearer lo limpiamos, si no, lo dejamos igual
  // if (token.includes("Bearer ")) {
  //   token = token.split(" ")[1];
  // }


