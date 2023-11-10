const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/gofoodmern');
    console.log("Connection Is successful and connected to MongoDB");

    const fetched_data = mongoose.connection.db.collection("foor_items");
    const data = await fetched_data.find({}).toArray();
    global.foor_items = data;
    console.log(global.foor_items)
    
    const foodCategory = mongoose.connection.db.collection("foodcategory");
    const category = await foodCategory.find({}).toArray();
    global.foodCategory = category

    console.log(global.foodCategory)

  } catch (e) {
    console.log("Error: " + e);
  }
})();
