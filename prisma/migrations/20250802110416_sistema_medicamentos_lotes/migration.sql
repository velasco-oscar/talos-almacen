-- CreateTable
CREATE TABLE "lotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numeroLote" TEXT NOT NULL,
    "fechaCaducidad" DATETIME NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "precioCompra" REAL,
    "proveedor" TEXT,
    "fechaRecepcion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observaciones" TEXT,
    "inventarioId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "lotes_inventarioId_fkey" FOREIGN KEY ("inventarioId") REFERENCES "inventario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- AlterTable
ALTER TABLE "inventario" ADD COLUMN "fechaCaducidadOriginal" DATETIME;
