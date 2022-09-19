const Product = require("../models/Product");
const Cart = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");

exports.AddCart = catchAsync(async (req, res) => {
    let foundCart = await Cart.findOne({userName: req.body.userName,status: "PENDING"});
    let UpdateCart = null;
    if(foundCart)
    { 
        const foundproduct = await Product.findOne({id_product: req.body.id_product})
        console.log(foundproduct)
        const aux_product = {"id_product": foundproduct.id_product,"Price":foundproduct.price,"Quantity": req.body.quantity}
        foundCart.products.push(aux_product)
        await Cart.findByIdAndUpdate(foundCart._id,foundCart)
        UpdateCart= await Cart.findById(foundCart._id)
    }
    else
    {
        let newCart = new Cart()
        newCart = newCart.toObject()
        newCart.userName = req.body.userName
        newCart.status = "PENDING"
        const foundproduct = await Product.findOne({id_product: req.body.id_product})
        const aux_product = {"id_product": foundproduct.id_product,"Price":foundproduct.price,"Quantity": req.body.quantity}
        newCart.products.push(aux_product)
        UpdateCart = await Cart.create(newCart);
    }
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      data: {
        Cart:  UpdateCart,
      },
    });
  });


exports.DeleteCart = catchAsync(async (req, res) => {
    let foundCart = await Cart.findOne({userName: req.body.userName,status: "PENDING"});
    if(foundCart)
    { 
        let id = Number(req.params.id)
        const newArray = foundCart.products.filter((e)=> e.id_product !== id);
        foundCart.products = newArray
        await Cart.findByIdAndUpdate(foundCart._id,foundCart)
        res.status(200).json({
            status: "success",
            data: {
                Cart:  foundCart,
              },
          });
    }
    else
    {
        res.status(400).json({
            status: "error",
          });
    }
  });

  exports.PayCart = catchAsync(async (req, res) => {
    let foundCart = await Cart.findOne({userName: req.body.userName,status: "PENDING"});
    if(foundCart && foundCart.products.length)
    { 
        const pay = foundCart.products.map((e)=> re= e.Price*e.Quantity).reduce((e,result)=> result =  result +e)
        foundCart.status = "PAID" 
        await Cart.findByIdAndUpdate(foundCart._id,foundCart)     
        const UpdateCart = await Cart.findById(foundCart._id)
        res.status(200).json({
            status: "success",
            data: {
                total_pay:  pay,
                Cart: UpdateCart
              },
          });
       
    }
    else
    {
        res.status(400).json({
            status: "error",
          });
    }
  });
