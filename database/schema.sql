CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla: roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla: departamento
CREATE TABLE departamento (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL
);

-- Tabla: usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    id_rol UUID REFERENCES roles(id)
);

-- Tabla: espacio
CREATE TABLE espacio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    capacidad INTEGER NOT NULL,
    descripcion TEXT
);

-- Tabla: reserva
CREATE TABLE reserva (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    folio_reserva VARCHAR(20) UNIQUE NOT NULL,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_final TIME NOT NULL,
    descripcion TEXT,
    estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'Aprobada', 'Rechazada', 'Cancelada')) DEFAULT 'Pendiente',
    id_usuario UUID REFERENCES usuarios(id),
    id_espacio UUID REFERENCES espacio(id),
    id_departamento UUID REFERENCES departamento(id)
);

-- Tabla: historial_cambios
CREATE TABLE historial_cambios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_reserva UUID REFERENCES reserva(id),
    id_usuario UUID REFERENCES usuarios(id),
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accion_realizada VARCHAR(20) CHECK (accion_realizada IN ('Pendiente', 'Aprobada', 'Rechazada', 'Cancelada'))
);
