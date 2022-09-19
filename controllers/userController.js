const { Console } = require("console");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});



exports.getUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findOne({ id_user: req.params.id });
  if (foundUser) {
    res.status(200).json({
      status: "success",
      data: {
       User: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});


exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      User: newUser,
    },
  });
});

exports.putUser= catchAsync(async(req, res) => {
  let foundUser = await User.findOne({ id_user: req.params.id });

  if (foundUser) {
    req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
    foundUser.userName = req.body.userName
    foundUser.password = req.body.password
    foundUser.email = req.body.email
    let UpdateUser = await User.findByIdAndUpdate(foundUser._id, foundUser);
    UpdateUser = UpdateUser.toObject();
    delete UpdateUser.password;
    res.status(200).json({
      status: "success",
      data: {
        User:  foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteUser =  catchAsync(async(req, res) => {
  let foundUser = await User.findOne({ id_user: req.params.id });

  if (foundUser) {
    var id = foundUser._id.toString().trim();
    await User.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
