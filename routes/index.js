const UserRouter =require("./users") ;
const express = require('express');

const router = express.Router()
router.use("/", UserRouter);

module.exports=router