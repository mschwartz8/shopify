const {
  db,
  models: { Inventory, Warehouse, Products},
} = require("./server/db");

const WarehouseData = [
  {
    location: "New Jersey",
  },
  {
    location: "South Carolina",
  },
];

const InventoryData = [
  {
    name: "Yellow Duck",
    quantity: 10,
    price: 5.99,
    description:
      "articulate your coding problem to your new favorite yellow duck",
  },
  {
    name: "Green Duck",
    quantity: 10,
    price: 8.99,
    description:
      "articulate your coding problem to your new favorite green duck",
  },
];



async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  // Creating Inventory
  const inventory = await Promise.all(
    InventoryData.map((inventory) => {
      return Inventory.create(inventory);
    })
  );
  // Creating Warehouses
  const warehouses = await Promise.all(
    WarehouseData.map((warehouse) => {
      return Warehouse.create(warehouse);
    })
  );

    // x Creating Products x 
    // const products = await Promise.all(
    //   ProductData.map((product) => {
    //     return Products.create(product);
    //   })
    // );
 
  // warehouses can have many inventorys
  // await warehouses[0].addInventory([
  //   inventory[0],
  //   inventory[1],
  // ]);

  // inventory can have many warehouses
  await inventory[0].addWarehouses([
    warehouses[0],
    warehouses[1],
  ]);

 //Creating Products Through table items 
  // const products = await Promise.all([
  //   Products.create({productQuantity: 3}),
  //   Products.create({productQuantity: 4}),
  // ]) 



  console.log(`seeded successfully`);
}



async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
    Execute the `seed` function, IF we ran this module directly (`node seed`).
    `Async` functions always return a promise, so we can use `catch` to handle
    any errors that might occur inside of `seed`.
  */
if (module === require.main) {
  runSeed();
}
