const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeding de la base de datos...');

  // Crear categorías de ejemplo
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Electrónicos' },
      update: {},
      create: {
        name: 'Electrónicos',
        description: 'Productos electrónicos y tecnológicos',
        color: '#3B82F6'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Oficina' },
      update: {},
      create: {
        name: 'Oficina',
        description: 'Artículos de oficina y papelería',
        color: '#10B981'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Herramientas' },
      update: {},
      create: {
        name: 'Herramientas',
        description: 'Herramientas y equipos',
        color: '#F59E0B'
      }
    })
  ]);

  console.log(`✅ Creadas ${categories.length} categorías`);

  // Crear productos de ejemplo
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'LAPTOP-001' },
      update: {},
      create: {
        name: 'Laptop Dell Inspiron 15',
        description: 'Laptop Dell Inspiron 15 con procesador Intel i5',
        sku: 'LAPTOP-001',
        price: 899.99,
        cost: 650.00,
        stock: 5,
        minStock: 2,
        categoryId: categories[0].id
      }
    }),
    prisma.product.upsert({
      where: { sku: 'MOUSE-001' },
      update: {},
      create: {
        name: 'Mouse Inalámbrico Logitech',
        description: 'Mouse inalámbrico Logitech MX Master 3',
        sku: 'MOUSE-001',
        price: 99.99,
        cost: 70.00,
        stock: 15,
        minStock: 5,
        categoryId: categories[0].id
      }
    }),
    prisma.product.upsert({
      where: { sku: 'PEN-001' },
      update: {},
      create: {
        name: 'Bolígrafos BIC Azul',
        description: 'Paquete de 12 bolígrafos BIC azules',
        sku: 'PEN-001',
        price: 12.99,
        cost: 8.00,
        stock: 50,
        minStock: 10,
        categoryId: categories[1].id
      }
    }),
    prisma.product.upsert({
      where: { sku: 'PAPER-001' },
      update: {},
      create: {
        name: 'Papel Bond A4',
        description: 'Resma de papel bond tamaño A4 (500 hojas)',
        sku: 'PAPER-001',
        price: 8.50,
        cost: 5.00,
        stock: 25,
        minStock: 5,
        categoryId: categories[1].id
      }
    }),
    prisma.product.upsert({
      where: { sku: 'DRILL-001' },
      update: {},
      create: {
        name: 'Taladro Eléctrico DeWalt',
        description: 'Taladro eléctrico DeWalt 18V con batería',
        sku: 'DRILL-001',
        price: 159.99,
        cost: 120.00,
        stock: 3,
        minStock: 1,
        categoryId: categories[2].id
      }
    }),
    prisma.product.upsert({
      where: { sku: 'SCREW-001' },
      update: {},
      create: {
        name: 'Tornillos Phillips 2"',
        description: 'Caja de 100 tornillos Phillips de 2 pulgadas',
        sku: 'SCREW-001',
        price: 15.99,
        cost: 10.00,
        stock: 1, // Stock bajo para testing
        minStock: 5,
        categoryId: categories[2].id
      }
    })
  ]);

  console.log(`✅ Creados ${products.length} productos`);

  // Crear algunos movimientos de inventario de ejemplo
  const movements = await Promise.all([
    prisma.inventoryMovement.create({
      data: {
        productId: products[0].id,
        type: 'IN',
        quantity: 10,
        reason: 'Compra inicial',
        reference: 'PO-001',
        notes: 'Primera compra de laptops'
      }
    }),
    prisma.inventoryMovement.create({
      data: {
        productId: products[0].id,
        type: 'OUT',
        quantity: 5,
        reason: 'Venta',
        reference: 'INV-001',
        notes: 'Venta a cliente corporativo'
      }
    }),
    prisma.inventoryMovement.create({
      data: {
        productId: products[1].id,
        type: 'IN',
        quantity: 20,
        reason: 'Compra',
        reference: 'PO-002'
      }
    }),
    prisma.inventoryMovement.create({
      data: {
        productId: products[1].id,
        type: 'OUT',
        quantity: 5,
        reason: 'Venta',
        reference: 'INV-002'
      }
    })
  ]);

  console.log(`✅ Creados ${movements.length} movimientos de inventario`);

  console.log('🎉 Seeding completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });