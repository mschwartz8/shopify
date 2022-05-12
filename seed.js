const {db, models: {Inventory}} = require("./server/db");

const InventoryData = [
    {
        name: "Yellow Duck",
        quantity: 10,
        price: 5.99 ,
        description: "articulate your coding problem to your new favorite duck"
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
  