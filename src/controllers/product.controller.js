import Product from "../models/product.js";

console.log(" product.controller.js cargado");
console.log(" getLowStockProducts llamado");

// ======================
// Crear producto
// ======================
export const createProduct = async (req, res) => {
  try {
    console.log(" POST /api/products llamado");
    console.log("BODY:", req.body);

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================
// Obtener todos los productos
// ======================
export const getProducts = async (req, res) => {
  try {
    console.log(" GET /api/products llamado");

    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// Obtener producto por ID
// ======================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "ID inválido" });
  }
};

// ======================
// Actualizar producto (con validación de stock)
// ======================
export const updateProduct = async (req, res) => {
  try {
    const { stock } = req.body;

    //  No permitir stock negativo
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({
        message: "El stock no puede ser negativo",
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================
// Productos con stock bajo
// ======================
export const getLowStockProducts = async (req, res) => {
  try {
    const LOW_STOCK_LIMIT = 5; 

    const products = await Product.find({
      stock: { $lte: LOW_STOCK_LIMIT }
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(" Error en low stock:", error);
    return res.status(500).json({
      message: "Error al obtener productos con stock bajo"
    });
  }
};

// ======================
// Eliminar producto
// ======================
export const deleteProduct = async (req, res) => {
  try {
    console.log(" DELETE /api/products llamado");
    console.log("ID:", req.params.id);

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "ID inválido" });
  }
};



