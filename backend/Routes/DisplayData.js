const express = require('express')
const router = express.Router()


router.post('/foodData', (req,res)=>{
  try {
    // console.log([global.foor_items]);
    res.send([global.foor_items,global.foodCategory])
  } catch (error) {
    console.log(error.message);
    res.send("server error")
    
  }
})

module.exports = router;