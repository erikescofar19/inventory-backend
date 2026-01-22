// Middleware para verificar si el usuario es admin
export const isAdmin = (req, res, next) => {
  // Si el rol del usuario no es "admin", bloquear acceso
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso solo para administradores" });
  }
  // Si es admin, continuar con la siguiente función
  next();
};
