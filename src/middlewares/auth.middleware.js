import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    console.log("🔐 Auth middleware ejecutado");
    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token, acceso denegado" });
    }

    // "Bearer TOKEN"
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos la info del usuario para usarla después
    req.user = decoded; // { id, role, iat, exp }

    console.log("✅ Token válido, usuario:", decoded);

    next();
  } catch (error) {
    console.error("❌ Error auth:", error.message);
    return res.status(401).json({ message: "Token no válido" });
  }
};

export default authMiddleware;
