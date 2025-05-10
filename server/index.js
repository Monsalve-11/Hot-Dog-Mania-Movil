const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// 1. CORS
app.use(
  cors({
    origin: [
      "http://localhost:8081", // tu frontend en dev
      "http://192.168.1.6:8081", // si accedes por IP
    ],
    credentials: true,
  })
);
// 2. JSON parser
app.use(express.json());

// 3. Conexión a MySQL
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

let userId;
let nombre;
let gmail;
// 4. Store de sesiones en MySQL
const sessionStore = new MySQLStore(
  {
    expiration: 86400000, // Tiempo de expiración de la sesión en milisegundos (1 día)
    checkExpirationInterval: 900000, // Intervalo de tiempo para limpiar sesiones expiradas (15 minutos)
    clearExpired: true, // Limpiar sesiones expiradas
  },
  db // Usar la conexión a la base de datos MySQL
);

// 5. Middleware de sesión
app.use(
  session({
    key: "session_id",
    secret: "tu_secreto_super_seguro", // cámbialo en producción
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000, // 1 día
      httpOnly: true,
      secure: false, // true si usas HTTPS
      sameSite: "lax",
    },
  })
);

// Middleware para proteger rutas
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Debes iniciar sesión" });
  }
  next();
}

// Registro
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

// Login
app.post("/login", (req, res) => {
  const { gmail, contrasena } = req.body;
  const sql =
    "SELECT id, nombre, gmail FROM usuarios WHERE gmail = ? AND contrasena = ?";
  db.query(sql, [gmail, contrasena], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });
    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Usar let para variables que se pueden reasignar
    let userId = (req.session.userId = results[0].id);
    let nombre = (req.session.userName = results[0].nombre);
    let gmail = (req.session.userEmail = results[0].gmail);

    console.log("Usuario logueado:", req.session); // Verifica que el ID se guarde correctamente

    res.json({
      success: true,
      message: "Sesión iniciada correctamente",
      user: {
        id: results[0].id,
        nombre: results[0].nombre,
        gmail: results[0].gmail, // Incluyendo el correo
      },
    });
  });
});

// Ruta para obtener los datos del usuario
app.get("/me", (req, res) => {
  console.log("Cookies de la solicitud:", req.headers.cookie); // Verifica si la cookie está siendo enviada

  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "No has iniciado sesión." });
  }

  const query = "SELECT id, nombre, gmail FROM usuarios WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al obtener los datos del usuario" });
    }
    if (results.length > 0) {
      res.json(results[0]); // Responde con los datos del usuario
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    res.clearCookie("session_id");
    res.json({ message: "Sesión cerrada" });
  });
});

// Obtener productos (público)
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

// --- RUTAS PROTEGIDAS FAVORITOS ---

// Agregar favorito
app.post("/favoritos/agregar", requireLogin, (req, res) => {
  const user_id = req.session.userId;
  const { product_id } = req.body;
  if (!product_id) {
    return res.status(400).json({ message: "product_id es requerido" });
  }

  // Primero, actualizar el estado en la tabla productos
  const updateFavorite = "UPDATE productos SET favorito = 'si' WHERE id = ?";
  db.query(updateFavorite, [product_id], (err, result) => {
    if (err) {
      console.error(
        "❌ Error al actualizar el estado de favorito en productos:",
        err
      );
      return res.status(500).json({
        message: "Error al actualizar el favorito en la base de datos",
      });
    }

    // Verificar que se haya actualizado correctamente
    console.log(
      `Estado favorito actualizado a 'si' para producto con id: ${product_id}`
    );

    // Ahora, agregar a la tabla de favoritos
    const sql = "INSERT INTO favoritos (user_id, product_id) VALUES (?, ?)";
    db.query(sql, [user_id, product_id], (err) => {
      if (err) {
        console.error("❌ Error al agregar favorito:", err);
        return res.status(500).json({ message: "Error al agregar favorito" });
      }
      res.json({ message: "Producto agregado a favoritos" });
    });
  });
});

// Eliminar favorito
app.post("/favoritos/eliminar", requireLogin, (req, res) => {
  const user_id = req.session.userId;
  const { product_id } = req.body;
  if (!product_id) {
    return res.status(400).json({ message: "product_id es requerido" });
  }

  // Eliminar de la tabla favoritos
  const sql = "DELETE FROM favoritos WHERE user_id = ? AND product_id = ?";
  db.query(sql, [user_id, product_id], (err) => {
    if (err) {
      console.error("❌ Error al eliminar favorito:", err);
      return res.status(500).json({ message: "Error al eliminar favorito" });
    }

    // Ahora, actualizar el estado en la tabla productos
    const updateFavorite = "UPDATE productos SET favorito = 'no' WHERE id = ?";
    db.query(updateFavorite, [product_id], (err) => {
      if (err) {
        console.error(
          "❌ Error al actualizar el estado de favorito en productos:",
          err
        );
        return res.status(500).json({
          message: "Error al actualizar el favorito en la base de datos",
        });
      }

      // Verificar que se haya actualizado correctamente
      console.log(
        `Estado favorito actualizado a 'no' para producto con id: ${product_id}`
      );

      res.json({ message: "Producto eliminado de favoritos" });
    });
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

// Ruta para crear una factura
app.post("/factura", requireLogin, (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  const { productos, total } = req.body;

  // Insertar la factura
  const sqlFactura = "INSERT INTO facturas (user_id, total) VALUES (?, ?)";
  db.query(sqlFactura, [userId, total], (err, result) => {
    if (err) {
      console.error("❌ Error al registrar la factura:", err);
      return res.status(500).json({ message: "Error al registrar la factura" });
    }

    const facturaId = result.insertId; // Obtener el ID de la factura recién insertada

    // Insertar los detalles de la factura
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

// Inicia servidor en el puerto 3001
app.listen(3001, () => {
  console.log("🚀 Servidor corriendo en el puerto 3001");
});
