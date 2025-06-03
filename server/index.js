const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const Usuario = require("./models/Usuario");

app.use(
  cors({
    origin: ["http://localhost:8081", "http://192.168.1.6:8081"],
    credentials: true,
  })
);

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movil",
});
db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
  } else {
    console.log("✅ Conexión a la base de datos MySQL exitosa.");
  }
});

app.use(
  session({
    key: "session_id",
    secret: "tu_secreto_super_seguro",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

function requireLogin(req, res, next) {
  if (!req.session.userId && !(req.session.user && req.session.user.id)) {
    return res.status(401).json({ message: "Debes iniciar sesión" });
  }
  next();
}

app.post("/register", (req, res) => {
  const { nombre, gmail, contrasena } = req.body;
  if (!nombre || !gmail || !contrasena) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  const sql =
    "INSERT INTO usuarios (nombre, gmail, contrasena) VALUES (?, ?, ?)";
  db.query(sql, [nombre, gmail, contrasena], (err) => {
    if (err) {
      console.error("❌ Error al registrar usuario:", err);
      return res.status(500).json({ message: "Error al registrar el usuario" });
    }
    res.json({ message: "Usuario registrado exitosamente" });
  });
});

app.post("/login", (req, res) => {
  const { gmail, contrasena } = req.body;
  const sql =
    "SELECT id, nombre, gmail FROM usuarios WHERE gmail = ? AND contrasena = ?";
  db.query(sql, [gmail, contrasena], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });
    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const userObj = new Usuario(
      results[0].id,
      results[0].nombre,
      results[0].gmail
    );

    req.session.user = userObj;
    req.session.userId = results[0].id;

    console.log("Usuario logueado:", req.session);

    res.json({
      success: true,
      message: "Sesión iniciada correctamente",
      user: {
        id: results[0].id,
        nombre: results[0].nombre,
        gmail: results[0].gmail,
      },
    });
  });
});

app.get("/me", (req, res) => {
  const usuario = req.session.user;
  if (!usuario) {
    return res.status(401).json({ message: "Debes iniciar sesión" });
  }
  res.json({
    id: usuario.id,
    nombre: usuario.nombre,
    gmail: usuario.gmail,
    saludo: usuario.saludar ? usuario.saludar() : undefined,
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    res.clearCookie("session_id");
    res.json({ message: "Sesión cerrada" });
  });
});

app.get("/productos", (req, res) => {
  const sql =
    "SELECT id, nombre, descripcion, precio, imagen_url, seccion, cantidad FROM productos";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("❌ Error al obtener productos:", err);
      return res.status(500).json({ message: "Error al obtener productos" });
    }
    res.json(rows);
  });
});

// Favoritos agregar, eliminar y obtener (igual que antes)...

app.post("/favoritos/agregar", requireLogin, (req, res) => {
  const user_id = req.session.userId;
  const { product_id } = req.body;
  if (!product_id) {
    return res.status(400).json({ message: "product_id es requerido" });
  }

  const sql = "INSERT INTO favoritos (user_id, product_id) VALUES (?, ?)";
  db.query(sql, [user_id, product_id], (err) => {
    if (err) {
      console.error("❌ Error al agregar favorito:", err);
      return res.status(500).json({ message: "Error al agregar favorito" });
    }
    res.json({ message: "Producto agregado a favoritos" });
  });
});

app.post("/favoritos/eliminar", requireLogin, (req, res) => {
  const user_id = req.session.userId;
  const { product_id } = req.body;
  if (!product_id) {
    return res.status(400).json({ message: "product_id es requerido" });
  }

  const sql = "DELETE FROM favoritos WHERE user_id = ? AND product_id = ?";
  db.query(sql, [user_id, product_id], (err) => {
    if (err) {
      console.error("❌ Error al eliminar favorito:", err);
      return res.status(500).json({ message: "Error al eliminar favorito" });
    }
    res.json({ message: "Producto eliminado de favoritos" });
  });
});

app.get("/favoritos", requireLogin, (req, res) => {
  const user_id = req.session.userId;
  const sql = `
    SELECT p.*
    FROM favoritos f
    JOIN productos p ON f.product_id = p.id
    WHERE f.user_id = ?
  `;
  db.query(sql, [user_id], (err, rows) => {
    if (err) {
      console.error("❌ Error al obtener favoritos:", err);
      return res.status(500).json({ message: "Error al obtener favoritos" });
    }
    res.json(rows);
  });
});

app.post("/factura", requireLogin, (req, res) => {
  const userId =
    req.session.userId || (req.session.user && req.session.user.id);
  if (!userId) {
    return res.status(401).json({ message: "Debes iniciar sesión" });
  }

  const { productos, total, metodo_pago } = req.body;

  if (!metodo_pago) {
    return res.status(400).json({ message: "Método de pago es requerido" });
  }

  const sqlFactura =
    "INSERT INTO facturas (user_id, total, metodo_pago, estado) VALUES (?, ?, ?, 'pagada')";
  db.query(sqlFactura, [userId, total, metodo_pago], (err, result) => {
    if (err) {
      console.error("❌ Error al registrar la factura:", err);
      return res.status(500).json({ message: "Error al registrar la factura" });
    }

    const facturaId = result.insertId;

    const detallesFactura = productos.map((producto) => [
      facturaId,
      producto.id,
      producto.cantidad,
      producto.precio,
    ]);

    const sqlDetalle =
      "INSERT INTO factura_detalle (factura_id, producto_id, cantidad, precio) VALUES ?";

    db.query(sqlDetalle, [detallesFactura], (err) => {
      if (err) {
        console.error("❌ Error al registrar los detalles de la factura:", err);
        return res
          .status(500)
          .json({ message: "Error al registrar los detalles de la factura" });
      }

      res.json({ message: "Factura registrada exitosamente" });
    });
  });
});

app.get("/misfacturas", (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).json({ message: "Debes iniciar sesión" });
  }

  const userId = user.id;

  const sqlFacturas = `
    SELECT id, fecha_emision, total, estado, metodo_pago
    FROM facturas
    WHERE user_id = ?
    ORDER BY fecha_emision DESC
  `;

  db.query(sqlFacturas, [userId], (err, facturas) => {
    if (err) {
      console.error("Error al obtener facturas:", err);
      return res.status(500).json({ message: "Error al obtener facturas" });
    }

    if (facturas.length === 0) return res.json([]);

    const facturaIds = facturas.map((f) => f.id);
    const placeholders = facturaIds.map(() => "?").join(",");

    const sqlDetalles = `
      SELECT fd.factura_id, fd.cantidad, fd.precio, p.nombre
      FROM factura_detalle fd
      JOIN productos p ON fd.producto_id = p.id
      WHERE fd.factura_id IN (${placeholders})
    `;

    db.query(sqlDetalles, facturaIds, (err2, detalles) => {
      if (err2) {
        console.error("Error al obtener detalles:", err2);
        return res.status(500).json({ message: "Error al obtener detalles" });
      }

      const detallesPorFactura = detalles.reduce((acc, detalle) => {
        if (!acc[detalle.factura_id]) acc[detalle.factura_id] = [];
        acc[detalle.factura_id].push({
          nombre: detalle.nombre,
          cantidad: detalle.cantidad,
          precio: detalle.precio,
        });
        return acc;
      }, {});

      const facturasConDetalles = facturas.map((factura) => ({
        ...factura,
        detalles: detallesPorFactura[factura.id] || [],
      }));

      res.json(facturasConDetalles);
    });
  });
});

app.get("/productos/:id", requireLogin, (req, res) => {
  const productId = req.params.id;
  const userId = req.session.userId;

  const sqlProducto = "SELECT * FROM productos WHERE id = ?";
  db.query(sqlProducto, [productId], (err, productos) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener producto" });
    }
    if (productos.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const producto = productos[0];

    // Verificar si está favorito para este usuario
    const sqlFavorito =
      "SELECT * FROM favoritos WHERE user_id = ? AND product_id = ?";
    db.query(sqlFavorito, [userId, productId], (err2, favoritos) => {
      if (err2) {
        return res.status(500).json({ message: "Error al verificar favorito" });
      }
      producto.favorito = favoritos.length > 0 ? "si" : "no";
      res.json(producto);
    });
  });
});

app.listen(3001, () => {
  console.log("🚀 Servidor corriendo en el puerto 3001");
});
