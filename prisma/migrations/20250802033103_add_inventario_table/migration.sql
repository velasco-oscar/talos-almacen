-- CreateTable
CREATE TABLE "inventario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "codigoBarras" TEXT NOT NULL,
    "fechaCaducidad" DATETIME NOT NULL,
    "precioCompra" REAL NOT NULL,
    "precioVenta" REAL NOT NULL,
    "stockActual" INTEGER NOT NULL DEFAULT 0,
    "formula" TEXT,
    "concentracion" TEXT,
    "lote" TEXT,
    "proveedor" TEXT,
    "ubicacion" TEXT,
    "observaciones" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "inventario_codigoBarras_key" ON "inventario"("codigoBarras");
