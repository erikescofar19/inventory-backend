import StockMovement from "../models/stockMovement.js";
import Product from "../models/product.js";

// ============================
// Crear movimiento de stock
// ============================
export const createStockMovement = async (req, res) => {
  try {
    const { product, type, quantity, note } = req.body;

    // Validaciones básicas
    if (!product || !type || quantity === undefined) {
      return res.status(400).json({
        message: "Datos incompletos",
      });
    }

    if (!["in", "out"].includes(type)) {
      return res.status(400).json({
        message: "Tipo de movimiento inválido (in | out)",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        message: "La cantidad debe ser mayor a 0",
      });
    }

    const productFound = await Product.findById(product);

    if (!productFound) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    // Validar salida
    if (type === "out" && productFound.stock < quantity) {
      return res.status(400).json({
        message: "Stock insuficiente",
      });
    }

    // Actualizar stock
    if (type === "in") {
      productFound.stock += quantity;
    } else {
      productFound.stock -= quantity;
    }

    await productFound.save();

    // Registrar movimiento
    const movement = await StockMovement.create({
      product,
      type,
      quantity,
      note,
      user: req.user.id,
    });

    return res.status(201).json(movement);
  } catch (error) {
    console.error("❌ Error stock movement:", error);
    return res.status(500).json({
      message: "Error al registrar movimiento de stock",
    });
  }
};

// ============================
// Obtener historial de movimientos
// ============================
export const getStockMovements = async (req, res) => {
  try {
    const { product } = req.query;

    const filter = product ? { product } : {};

    const movements = await StockMovement.find(filter)
      .populate("product", "name stock")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json(movements);
  } catch (error) {
    console.error("❌ Error obtener movimientos:", error);
    return res.status(500).json({
      message: "Error al obtener movimientos de stock",
    });
  }
};
