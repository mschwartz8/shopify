const {db, models: {Inventory, Warehouse}} = require("./server/db");

const WarehouseData = [
    {
        location: "New Jersey",
       
    },
    {
      location: "South Carolina",
  },
]

const InventoryData = [
  {
      name: "Yellow Duck",
      quantity: 10,
      price: 5.99 ,
      description: "articulate your coding problem to your new favorite yellow duck"
  },
  {
    name: "Green Duck",
    quantity: 10,
    price: 8.99 ,
    description: "articulate your coding problem to your new favorite green duck"
}
]

async function seed() {
    await db.sync({ force: true }); 
    console.log("db synced!");
 
    // Creating Products
    const inventory = await Promise.all(
      InventoryData.map((product) => {
        return Inventory.create(product);
      }))
    // Creating Warehouses
    const warehouses = await Promise.all(
        WarehouseData.map((warehouse) => {
          return Warehouse.create(warehouse);
        }))


  
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
  