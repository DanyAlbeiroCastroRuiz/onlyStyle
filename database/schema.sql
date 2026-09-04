-- ============================================================
--  OnliStyle - Schema de Base de Datos
--  Base de datos: onliStyle
--  Motor: MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS onliStyle
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE onliStyle;

-- ------------------------------------------------------------
-- Tabla: usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id              VARCHAR(20)     NOT NULL,           -- Cédula / documento
    nombre          VARCHAR(100)    NOT NULL,
    correo          VARCHAR(100)    NOT NULL UNIQUE,
    hash            VARCHAR(255)    NOT NULL,           -- Contraseña hasheada (bcrypt)
    telefono        VARCHAR(20)     NOT NULL,
    fecha_nacimiento DATE           NOT NULL,
    rol             ENUM('USUARIO','Empleado','Admin') NOT NULL DEFAULT 'USUARIO',
    fecha_registro  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activo          TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla: empleados
-- Postulaciones de usuarios que desean ser empleados
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS empleados (
    id                      INT             NOT NULL AUTO_INCREMENT,
    id_usuario              VARCHAR(20)     NOT NULL,
    profesion               VARCHAR(150)    NOT NULL,
    modalidad               VARCHAR(50)     NOT NULL,   -- Ej: Presencial, Virtual
    punto_fisico            VARCHAR(255)    NOT NULL,   -- Dirección o ubicación
    experiencia_laboral     TEXT            NOT NULL,
    diplomas                TEXT            NOT NULL,
    fecha_postulacion       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_empleado_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla: categorias_servicios
-- Categorías para clasificar los servicios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categorias_servicios (
    id              INT             NOT NULL AUTO_INCREMENT,
    nombre          VARCHAR(100)    NOT NULL,
    descripcion     TEXT            NOT NULL,
    icono           VARCHAR(100)    NOT NULL,           -- Nombre o clase del icono
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla: servicios_empleados
-- Servicios que cada empleado ofrece
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS servicios_empleados (
    id                  INT             NOT NULL AUTO_INCREMENT,
    id_empleado         VARCHAR(20)     NOT NULL,       -- FK a usuarios.id
    id_categoria        INT             NOT NULL,
    nombre              VARCHAR(150)    NOT NULL,
    descripcion         TEXT            NOT NULL,
    modalidad           VARCHAR(50)     NOT NULL,       -- Presencial / Virtual
    punto_fisico        VARCHAR(255)    NULL,           -- Dirección si aplica
    precio              DECIMAL(10,2)   NOT NULL,
    disponible          TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT fk_servicio_empleado
        FOREIGN KEY (id_empleado) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_servicio_categoria
        FOREIGN KEY (id_categoria) REFERENCES categorias_servicios(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla: pedidos
-- Cabecera del pedido/cita agendada
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pedidos (
    id              INT             NOT NULL AUTO_INCREMENT,
    id_usuario      VARCHAR(20)     NOT NULL,
    total           DECIMAL(10,2)   NOT NULL,
    fecha_pedido    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_pedido_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla: detalle_pedido
-- Detalle de cada cita agendada
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS detalle_pedido (
    id              INT             NOT NULL AUTO_INCREMENT,
    id_pedido       INT             NOT NULL,
    servicio_id     INT             NOT NULL,
    tiempo_total    INT             NOT NULL,           -- Duración en minutos
    fecha_inicio    DATETIME        NOT NULL,
    fecha_fin       DATETIME        NOT NULL,
    direccion       VARCHAR(255)    NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_detalle_pedido
        FOREIGN KEY (id_pedido) REFERENCES pedidos(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_detalle_servicio
        FOREIGN KEY (servicio_id) REFERENCES servicios_empleados(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Tabla: pagos
-- Registro del pago asociado a cada pedido
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pagos (
    id              INT             NOT NULL AUTO_INCREMENT,
    id_pedido       INT             NOT NULL,
    monto           DECIMAL(10,2)   NOT NULL,
    estado          ENUM('Pendiente','Pagado','Cancelado') NOT NULL DEFAULT 'Pendiente',
    fecha_pago      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_pago_pedido
        FOREIGN KEY (id_pedido) REFERENCES pedidos(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
