const express = require('express')
const router = express.Router()
const User = require('../models/schema')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const jwtSecret = "MyNameIsEndToEndYouTubeChannelisAnish";

router.post('/createuser', async (req, res) => {

  const salt = await bcrypt.genSalt(10)
  const secPassword = await bcrypt.hash(req.body.password,salt)
  try {
    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location
    })

    console.log("User created:", req.body);
//  console.log("Hello")
    //   console.log(allUsers[3].password);
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    res.json({ success: false })
  }
})


router.post('/loginuser', async (req, res) => {
  let email = req.body.email;
  try {
    let userData =await User.findOne({ email });
    
    if (!userData) {
      return res.status(400).json({ error: "Try login with correct credentials" })
    }
    const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
    if (!pwdCompare ) {
      return res.status(400).json({ error: "Try login with correct credentials" })
    }
    const data = {
      user:{
        id:userData.id
      }
    }
    const authToken = jwt.sign(data, jwtSecret)
    return res.json({success:true,authToken:authToken})
   
  }
  catch (error) {
    console.log(error)
    res.json({ success: false })
  }
})

module.exports = router;