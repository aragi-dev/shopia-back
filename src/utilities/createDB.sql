-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: user
-- Almacena los usuarios del sistema, incluyendo admin y vendedores
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),                            -- Identificador único
    name VARCHAR(100) NOT NULL,                                                -- Nombre del usuario
    email VARCHAR(100) NOT NULL UNIQUE,                                        -- Correo electrónico único
    password_hash TEXT NOT NULL,                                               -- Contraseña hasheada
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'seller')),            -- Rol del usuario
    status BOOLEAN NOT NULL DEFAULT TRUE,                                      -- Estatus activo o inactivo
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),            -- Fecha de creación
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()             -- Fecha de última modificación
);
CREATE UNIQUE INDEX idx_user_email ON "user"(email);

-- Table: product
-- Almacena los productos disponibles para la venta
CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),                           -- Identificador único
    code VARCHAR(50) NOT NULL UNIQUE,                                         -- Código del producto
    name VARCHAR(255) NOT NULL,                                               -- Nombre del producto
    description TEXT,                                                         -- Descripción del producto
    purchase_price NUMERIC(10,2) NOT NULL,                                    -- Precio de compra (coste)
    price NUMERIC(10,2) NOT NULL,                                             -- Precio unitario
    stock INTEGER NOT NULL,                                                   -- Cantidad en inventario
    status BOOLEAN NOT NULL DEFAULT TRUE,                                     -- Estatus activo o inactivo
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),           -- Fecha de creación
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()            -- Fecha de última modificación
);
CREATE UNIQUE INDEX idx_product_code ON product(code);

-- Table: sale
-- Registra las ventas realizadas por los vendedores
CREATE TABLE sale (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),                           -- Identificador único de la venta
    user_id UUID NOT NULL,                                                    -- Referencia al vendedor (usuario)
    total NUMERIC(10,2) NOT NULL,                                             -- Monto total de la venta
    status BOOLEAN NOT NULL DEFAULT TRUE,                                     -- Estatus de la venta
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),           -- Fecha de creación
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),           -- Fecha de última modificación
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);
CREATE INDEX idx_sale_user ON sale(user_id);

-- Table: sale_detail
-- Detalles de los productos incluidos en cada venta
CREATE TABLE sale_detail (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),                           -- Identificador único del detalle
    sale_id UUID NOT NULL,                                                    -- Referencia a la venta
    product_id UUID NOT NULL,                                                 -- Referencia al producto
    quantity INTEGER NOT NULL,                                                -- Cantidad vendida
    unit_price NUMERIC(10,2) NOT NULL,                                        -- Precio unitario al momento de la venta
    status BOOLEAN NOT NULL DEFAULT TRUE,                                     -- Estatus del detalle
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),           -- Fecha de creación
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),           -- Fecha de última modificación
    FOREIGN KEY (sale_id) REFERENCES sale(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE INDEX idx_sale_detail_sale ON sale_detail(sale_id);
CREATE INDEX idx_sale_detail_product ON sale_detail(product_id);