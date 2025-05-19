-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2025 a las 00:18:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `movil`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `fecha_emision` datetime DEFAULT current_timestamp(),
  `total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','pagada','cancelada') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`id`, `user_id`, `fecha_emision`, `total`, `estado`) VALUES
(1, 6, '2025-05-19 15:28:08', 50000.00, 'pendiente'),
(2, 6, '2025-05-19 15:29:43', 50000.00, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_detalle`
--

CREATE TABLE `factura_detalle` (
  `id` int(11) NOT NULL,
  `factura_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_detalle`
--

INSERT INTO `factura_detalle` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio`) VALUES
(7, 1, 1, 2, 7000.00),
(8, 1, 3, 1, 13000.00),
(9, 2, 1, 2, 7000.00),
(10, 2, 3, 1, 13000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `seccion` enum('Perros','Bebidas','Combos','Promociones') NOT NULL,
  `precio_historial` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `cantidad`, `precio`, `imagen_url`, `seccion`, `precio_historial`) VALUES
(1, 'Perro Clásico', 'Pan, salchicha Zenú, ripio, salsa de tomate, mostaza, mayonesa y salsa rosada.', 20, 7000.00, 'https://i.ibb.co/MyLsfDhx/PERRO-CLASICO.jpg', 'Perros', 0.00),
(2, 'Guaca fuego', 'Salchicha americana, jalapeños, guacamole, queso cheddar derretido y cebolla morada.', 20, 13000.00, 'https://i.ibb.co/1c7Msbb/GUACAFUEGO.jpg', 'Perros', 0.00),
(3, 'Americano Crunch', 'Salchicha americana: Tocineta crocante, cebolla crispy y queso chédar.', 20, 13000.00, 'https://i.ibb.co/Z3yy0n9/PERRO-AMERICANO.jpg', 'Perros', 0.00),
(4, 'El sabroso', 'Salchicha Zenú, carne desmenuzada, salsa de tomate salsa rosada y queso mozarela.', 20, 12000.00, 'https://i.ibb.co/qM4Q17M9/El-sabroso.jpg', 'Perros', 0.00),
(5, 'Napolitano', 'Salchicha Zenú, queso mozzarella, pepperoni y albahaca.', 20, 14000.00, 'https://i.ibb.co/fd3061qk/Perro-napolitano.jpg', 'Perros', 0.00),
(6, 'Detodito', 'Salchicha Zenú, ripio, pollo desmechado, carne desmechada, tocineta, queso y jamón salsas.', 20, 20000.00, 'https://i.ibb.co/1YkzXKfV/Perro-detodito.jpg', 'Perros', 0.00),
(7, 'Perro Paisa', 'Chorizo, salsas y chicharrón.', 20, 13000.00, 'https://i.ibb.co/VY322v24/perro-paisa.jpg', 'Perros', 0.00),
(8, 'Doble Sazon', 'Carne, pollo y tocineta', 20, 16000.00, 'https://i.ibb.co/Mk0kv4VY/Doble-sazon.jpg', 'Perros', 0.00),
(9, 'Chili Dog', 'Salchicha americana, carne molida y mostaza', 20, 13000.00, 'https://i.ibb.co/fG0xVFtg/Chili-dog.jpg', 'Perros', 0.00),
(10, 'El Poderoso', 'Chorizo Ranchero , carne, vegetales y salsa de la casa.', 20, 17000.00, 'https://i.ibb.co/V0ggtf4L/El-poderoso.jpg', 'Perros', 0.00),
(11, 'Coca Cola', 'Refresco gaseoso clásico', 0, 2500.00, 'https://example.com/coca-cola.jpg', 'Bebidas', 0.00),
(12, 'Pepsi', 'Refresco gaseoso sabor cola', 0, 2500.00, 'https://example.com/pepsi.jpg', 'Bebidas', 0.00),
(13, 'Agua Mineral', 'Agua purificada natural', 0, 1000.00, 'https://example.com/agua-mineral.jpg', 'Bebidas', 0.00),
(14, 'Combo 1: Perro + Bebida', 'Combo que incluye un perro caliente y una bebida', 0, 15000.00, 'https://example.com/combo1.jpg', 'Combos', 0.00),
(15, 'Combo 2: Perro + Papas + Bebida', 'Combo que incluye un perro caliente, papas y una bebida', 0, 30000.00, 'https://example.com/combo2.jpg', 'Combos', 0.00),
(16, 'Promoción 2x1', 'Compra un perro y recibe otro gratis', 0, 20000.00, 'https://example.com/promocion2x1.jpg', 'Promociones', 0.00),
(17, 'Descuento del 10%', '10% de descuento en cualquier combo', 0, -10.00, 'https://example.com/descuento10.jpg', 'Promociones', 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `gmail` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `gmail`, `contrasena`) VALUES
(1, 'fsdgsdf', 'dfsgfdg@gmail.com', '12345678'),
(2, 'wilmer', 'wilmer@gmail.com', '12345678'),
(3, 'hdfhfhkf', 'wer@gmail.com', '12345678'),
(4, 'profesor', 'alvaros.1705@gmail.com', '12345678'),
(5, 'jhoan', 'jhoan@gmail.com', '12345678'),
(6, 'Jhon Monsalve', 'monsalve@gmail.com', '12345678');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `factura_detalle`
--
ALTER TABLE `factura_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `factura_id` (`factura_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_product_id` (`product_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `expires_idx` (`expires`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gmail` (`gmail`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `factura_detalle`
--
ALTER TABLE `factura_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `factura_detalle`
--
ALTER TABLE `factura_detalle`
  ADD CONSTRAINT `factura_detalle_ibfk_1` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`),
  ADD CONSTRAINT `factura_detalle_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
