-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2025 a las 02:59:34
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

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('0SGWazLJ-XSw8XBJ3VCSMmK_l7mWtnUe', 1746596404, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:40:03.576Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('5XAU79itF0tmXUCEVK-_-2N5IkGRgzkM', 1746593957, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:59:16.664Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('6iXKPfKZQkKw69rVEEjz9OVv0C3Vy2Xb', 1746595830, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:30:28.043Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"userName\":\"fsdgsdf\",\"userEmail\":\"dfsgfdg@gmail.com\"}'),
('8AyaVYqQynO9KFW6CMNioG0x6LzWNCfh', 1746594439, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:40:50.126Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"userName\":\"fsdgsdf\",\"userEmail\":\"dfsgfdg@gmail.com\"}'),
('8TEbEVm0Mt-0pPzhmh35w26Db_Qcws1C', 1746625517, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:35:47.353Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"userName\":\"fsdgsdf\",\"userEmail\":\"dfsgfdg@gmail.com\"}'),
('8WKmKo_3nUuY3NcFt4IHh6SdbM5JsEDf', 1746596281, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:38:00.891Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('AxS3qF8zkgqRPMMOZXUAGOoK9Cr29d41', 1746625143, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:39:03.272Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('CDCEW_uvewyqJ-M2UMaOc0qseRMR-w7d', 1746596445, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:40:41.478Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('E9yuu3g8-MF3pn0x2k66LyqgpXODOV63', 1746625763, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:49:23.242Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('eowJJYbINwkJHw-8nS_d4LxI5pIV7p-8', 1746592758, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:39:18.056Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('ESJqWV0bdkeis9kFwYUHmSlMYh1bhe3g', 1746594747, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:12:26.878Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('hEq2tmlmLvljXF7zCglRh59C8i8axnFl', 1746624542, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:28:16.935Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('HILblXyLarxHIAWv64KZGzm_R93WH_Xs', 1746625960, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:52:39.559Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('Hj509MPsM9o_8tE9KNY7GIa60HhUy_8J', 1746624717, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:31:57.129Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('Hztydb55bQkJl4-96A4OtrMDHSSf-kpj', 1746593656, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:54:15.733Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('ifBEMBSHjeJXvYOGfuXtimDhssd4SGcH', 1746625861, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:51:00.716Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('kFl0sY844ztyevAzGVpCWPFj5n7KGs9t', 1746625554, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:45:33.352Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"userName\":\"fsdgsdf\",\"userEmail\":\"dfsgfdg@gmail.com\"}'),
('kjAcPhRZ5xNwdpPPWe6F2T_36WDSyHSs', 1746596287, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:38:06.512Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('KVfpP-DJuTzGHolEjNEc_O0m0p1Q84-I', 1746625215, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:40:15.298Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('M5mLgyj9xaxbzpxx6DfUuGngNBxu6jct', 1746624686, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:31:25.689Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('MaOgaayjC7xxlIMwSVdnkRbDlV7pCk2w', 1746594264, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:04:24.003Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('P3hgdV_L_apQJasjxREaJtlgnw8BtLPv', 1746625722, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:48:06.956Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"userName\":\"fsdgsdf\",\"userEmail\":\"dfsgfdg@gmail.com\"}'),
('pb7d8A7INOMA8b59FE-JpERJyWQkAUgQ', 1746593080, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:44:39.768Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('peMZltbB9bu2x4dwN1vuCYzGxehwLXAn', 1746592612, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:36:52.479Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('qjB98plHRZ6rWb7XpX3ibaC0o7VRkbx2', 1746624353, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:25:52.726Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('RJA278KQsWkwAjM4Igl01soYgg3Itse_', 1746591663, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:21:02.503Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('S8cyT_bBTZz2fkIfpO4l-xlMP8k31oHk', 1746592442, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:34:02.098Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('SsrTTZdtGkjdW5RVHLBxWGMYzL9mqc7B', 1746625892, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:51:31.948Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('TJWLjzyNFCR2IG6dmoPY6Uc02EUyCDWe', 1746592829, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:31:40.674Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"userName\":\"fsdgsdf\",\"userEmail\":\"dfsgfdg@gmail.com\"}'),
('vdVbD9oQWG4YUN5n6Ow7Me3OdAEvhyhs', 1746593021, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:43:40.937Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('xlGgdwhcx8xUQ6NCc7riQlypZt4lkUfB', 1746591471, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:17:50.577Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('YHiOogqwaEfpuDF_4drZeklgFIz8pCQL', 1746592590, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T04:36:30.292Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('Z7RYR2-crEUbIBd8bjTsxFke1wYwvQTS', 1746624444, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T13:27:24.391Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('zibd32kgWEBrLeeSi0MB_g0MRtOXS0ot', 1746595791, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:29:51.389Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"userName\":\"fsdgsdf\",\"userEmail\":\"dfsgfdg@gmail.com\"}'),
('_PmsrOy90lMVk1CkKJhT1-oLjt7ZyBeq', 1746596463, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-07T05:41:03.251Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}');

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
(4, 'profesor', 'alvaros.1705@gmail.com', '12345678');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura_detalle`
--
ALTER TABLE `factura_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
