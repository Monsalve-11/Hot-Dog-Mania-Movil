-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2025 a las 00:06:08
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
  `producto_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
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
  `precio_historial` decimal(10,2) NOT NULL,
  `favorito` enum('si','no') NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `cantidad`, `precio`, `imagen_url`, `seccion`, `precio_historial`, `favorito`) VALUES
(1, 'Perro Clásico', 'Pan, salchicha Zenú, ripio, salsa de tomate, mostaza, mayonesa y salsa rosada.', 20, 7000.00, 'https://i.ibb.co/MyLsfDhx/PERRO-CLASICO.jpg', 'Perros', 0.00, 'no'),
(2, 'Guaca fuego', 'Salchicha americana, jalapeños, guacamole, queso cheddar derretido y cebolla morada.', 20, 13000.00, 'https://i.ibb.co/1c7Msbb/GUACAFUEGO.jpg', 'Perros', 0.00, 'no'),
(3, 'Americano Crunch', 'Salchicha americana: Tocineta crocante, cebolla crispy y queso chédar.', 20, 13000.00, 'https://i.ibb.co/Z3yy0n9/PERRO-AMERICANO.jpg', 'Perros', 0.00, 'no'),
(4, 'El sabroso', 'Salchicha Zenú, carne desmenuzada, salsa de tomate salsa rosada y queso mozarela.', 20, 12000.00, 'https://i.ibb.co/qM4Q17M9/El-sabroso.jpg', 'Perros', 0.00, 'no'),
(5, 'Napolitano', 'Salchicha Zenú, queso mozzarella, pepperoni y albahaca.', 20, 14000.00, 'https://i.ibb.co/fd3061qk/Perro-napolitano.jpg', 'Perros', 0.00, 'no'),
(6, 'Detodito', 'Salchicha Zenú, ripio, pollo desmechado, carne desmechada, tocineta, queso y jamón salsas.', 20, 20000.00, 'https://i.ibb.co/1YkzXKfV/Perro-detodito.jpg', 'Perros', 0.00, 'no'),
(7, 'Perro Paisa', 'Chorizo, salsas y chicharrón.', 20, 13000.00, 'https://i.ibb.co/VY322v24/perro-paisa.jpg', 'Perros', 0.00, 'no'),
(8, 'Doble Sazon', 'Carne, pollo y tocineta', 20, 16000.00, 'https://i.ibb.co/Mk0kv4VY/Doble-sazon.jpg', 'Perros', 0.00, 'no'),
(9, 'Chili Dog', 'Salchicha americana, carne molida y mostaza', 20, 13000.00, 'https://i.ibb.co/fG0xVFtg/Chili-dog.jpg', 'Perros', 0.00, 'no'),
(10, 'El Poderoso', 'Chorizo Ranchero , carne, vegetales y salsa de la casa.', 20, 17000.00, 'https://i.ibb.co/V0ggtf4L/El-poderoso.jpg', 'Perros', 0.00, 'no'),
(11, 'Coca Cola', 'Refresco gaseoso clásico', 20, 2500.00, 'https://example.com/coca-cola.jpg', 'Bebidas', 0.00, 'no'),
(12, 'Pepsi', 'Refresco gaseoso sabor cola', 0, 2500.00, 'https://example.com/pepsi.jpg', 'Bebidas', 0.00, 'no'),
(13, 'Agua Mineral', 'Agua purificada natural', 0, 1000.00, 'https://example.com/agua-mineral.jpg', 'Bebidas', 0.00, 'no'),
(14, 'Combo 1: Perro + Bebida', 'Combo que incluye un perro caliente y una bebida', 0, 15000.00, 'https://example.com/combo1.jpg', 'Combos', 0.00, 'no'),
(15, 'Combo 2: Perro + Papas + Bebida', 'Combo que incluye un perro caliente, papas y una bebida', 0, 30000.00, 'https://example.com/combo2.jpg', 'Combos', 0.00, 'no'),
(16, 'Promoción 2x1', 'Compra un perro y recibe otro gratis', 0, 20000.00, 'https://example.com/promocion2x1.jpg', 'Promociones', 0.00, 'no'),
(17, 'Descuento del 10%', '10% de descuento en cualquier combo', 0, -10.00, 'https://example.com/descuento10.jpg', 'Promociones', 0.00, 'no');

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
('1-ZP1kIlhjQCSt4LwTsQOnSDHjKOyVQK', 1746998958, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:29:17.887Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('2RPAc4Q6AhvwDYETBZh6ZPkGHIYgOnEs', 1746995549, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:32:28.829Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('3Yf_xBQ118x9020VRZy5RWmBI_G5fqW6', 1746991577, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T19:26:16.729Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('6P5qsQEkZeecrqhEAZFWcI_BDi2bC8M4', 1746995740, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:35:40.328Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('7DYIATZ--mBXtrtKS2zD02qQkOqKCh-E', 1746995048, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:24:07.511Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('8fBpMIwQjFFoGgyNGsxNTZYGSFeHh7xg', 1746996048, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:40:48.397Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('a5bEzf4YkEYWv0rqkRNr_orQaJTK5XH3', 1746998872, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:27:51.512Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('aP6H1L9lBmCszsein2Aas9cXKvyBPUG7', 1746995946, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:39:06.421Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('aPUKQEQtUt9rN5yiYEDZhlXxufdAwb4L', 1746999374, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:36:14.110Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('CHfD2_4tCLa0yMbWwgUrDxhjAp5B4GKO', 1746994599, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:16:38.830Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('cvt9Rus92iAgcLQAubZdGk7FHkyVRBPl', 1746998021, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:13:41.330Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('dZKJZEoZiV_bszg7ryfE-HwMHehkGxi9', 1746998621, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:23:41.061Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('e8u2KUMRDRF2LlDdfvKrNBKjX1SVMfy4', 1746997396, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:03:15.628Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('f2lM6Erxy24xJqxSgUBonESIxReGuqBw', 1746997489, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:04:48.838Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('fGn3oxb7koLOg7FupIw2cWRKkZCnMA7g', 1746999025, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:30:25.431Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('HEo_IRDX25hNH-7XFiTnpnrzn_Usa1-i', 1746997667, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:07:47.386Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('ibLSEHIBXHY7LXj2GKaIvCP6SzvBrkN2', 1746991621, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T19:27:00.719Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('ifdS7xJs_RVpLCaybK6cM-owI17MuyGG', 1746998933, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:28:52.870Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('KmS60mxwFFrNjqqVKoonYsC5ski0WLfW', 1746914724, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-10T22:05:23.614Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('Kxu2NtxQmlGgj5SiPIMnYBcbigF1JlkD', 1746995928, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:38:47.998Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('mT4HgtkLTvB4Ah-7V4zuA9Jdt12kfuk8', 1746999513, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:38:33.206Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('p0tR6_OTPudA7_7ZLaTzIdGOf8n0LoyV', 1746999254, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:34:14.012Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('Pd5Y_ufbDzP-ymRjqCj92VbFSUzUFwmD', 1746991078, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T19:17:57.564Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('q-Q6DmpJMTxFSbZHwWRsSWtZANHasz65', 1746996064, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:41:03.776Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('qvhbzm5ezp9-XzESivNJyuN7KmoicJVW', 1746994896, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:21:36.281Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('QZBKtYOCfFTxKte0wRWafAjOs4HSD6Rh', 1746999797, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:43:16.978Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('RBf530cCXpxFJd0XyLjVg8oBamlbKqU7', 1746997712, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:08:31.573Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('rlqcovpqiKWHV0V2zI6HkrmEKtnlYjJC', 1746993732, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:02:12.310Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('S6iYQ1xlkHwY6blFNIcxGw_XmTGON7Sx', 1746998866, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:27:45.917Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('s8b4tp3hHJBa32kUavkm5aDKO_Hq8LgI', 1746999677, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:41:16.765Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('sQTI_u4fdHghyLAlMkydBpQ6QUKGDDiM', 1747001092, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T22:04:51.938Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('VMKFY6yl7IDxS9dm4A3dvEgUg4UAtSof', 1747001024, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T22:03:44.220Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('WtcAnictxXHnOA-ySdYfEyOF4cbe4kpE', 1746997302, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:01:42.220Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('XhQaGyKXyeCI8Km7ldcHMA1jpfNDm3Xc', 1746998196, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:16:35.975Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('XYbv_wTRJkj2gZJCVFFUM7DV8qo7gp8t', 1746995920, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:38:39.863Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('Z19stKbwcGTpwxemNS-TJ9UHYFf5iRIQ', 1746997190, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T20:59:49.694Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}'),
('ZF5VVnZ730nKsuypngBhLgMXy8T5xz-l', 1746997690, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-05-11T21:08:10.482Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":2,\"userName\":\"wilmer\",\"userEmail\":\"wilmer@gmail.com\"}');

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
  ADD KEY `producto_id` (`producto_id`);

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
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
