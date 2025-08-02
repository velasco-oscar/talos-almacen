/*
  Warnings:

  - You are about to drop the column `fechaCaducidadOriginal` on the `inventario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_inventario" (
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
INSERT INTO "new_inventario" ("codigoBarras", "concentracion", "createdAt", "fechaCaducidad", "formula", "id", "isActive", "lote", "nombre", "observaciones", "precioCompra", "precioVenta", "proveedor", "stockActual", "ubicacion", "updatedAt") SELECT "codigoBarras", "concentracion", "createdAt", "fechaCaducidad", "formula", "id", "isActive", "lote", "nombre", "observaciones", "precioCompra", "precioVenta", "proveedor", "stockActual", "ubicacion", "updatedAt" FROM "inventario";
DROP TABLE "inventario";
ALTER TABLE "new_inventario" RENAME TO "inventario";
CREATE UNIQUE INDEX "inventario_codigoBarras_key" ON "inventario"("codigoBarras");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
