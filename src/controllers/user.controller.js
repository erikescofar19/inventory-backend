import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

console.log("🔥 user.controller.js cargado");

// ===========================
// REGISTRO
// ===========================
export const registerUser = async (req, res) => {
  try {
    console.log("🧑 Registro de usuario");

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // role se asigna por default como "user"
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===========================
// LOGIN (🔥 CLAVE PARA ROLES)
// ===========================
export const loginUser = async (req, res) => {
  try {
    console.log("🔐 Login usuario");

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, // 🔥 IMPORTANTE
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 🔥 IMPORTANTE
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===========================
// ASIGNAR ROL ADMIN (SOLO ADMIN)
// ===========================
export const assignAdminRole = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.role = "admin";
    await user.save();

    res.json({
      message: "Rol de admin asignado correctamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error asignando rol",
      error: error.message,
    });
  }
};
