const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Usa "root" si esa es tu contraseña real
  database: "movil",
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
  } else {
    console.log("✅ Conexión a la base de datos MySQL exitosa.");
  }
});

// Ruta de registro
app.post("/register", (req, res) => {
  const { nombre, gmail, contrasena } = req.body;

  if (!nombre || !gmail || !contrasena) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const query =
    "INSERT INTO usuarios (nombre, gmail, contrasena) VALUES (?, ?, ?)";

  db.query(query, [nombre, gmail, contrasena], (err, result) => {
    if (err) {
      console.error("❌ Error al registrar usuario:", err);
      return res.status(500).json({ message: "Error al registrar el usuario" });
    }

    return res.status(200).json({ message: "Usuario registrado exitosamente" });
  });
});

// Ruta de login (ya existente)
app.post("/login", (req, res) => {
  const gmail = req.body.gmail;
  const contrasena = req.body.contrasena;

  db.query(
    "SELECT * FROM usuarios WHERE gmail = ? AND contrasena = ?",
    [gmail, contrasena],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: "Error en el servidor" });
      } else {
        if (result.length > 0) {
          res.send({ message: "Sesión iniciada correctamente" });
        } else {
          res.status(401).send({ message: "Credenciales incorrectas" });
        }
      }
    }
  );
});

app.listen(3001, () => {
  console.log("🚀 Servidor corriendo en el puerto 3001");
});
