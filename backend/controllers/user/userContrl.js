const User = require("../../model/user/User")
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const ValidateMongodbId = require("../../utils/ValidateMongoDbId");


// REGISTERED 
//-------------
const userRegisterCtrl = expressAsyncHandler( async (req, res) => {

    //Check if user Exist
    const userExists = await User.findOne({ email: req?.body?.email });

    if (userExists) throw new Error("User already exists");
  // REGISTERED Users
  try {
      //Register user
      const user = await User.create({
          firstName: req?.body?.firstName,
          lastName: req?.body?.lastName,
          email: req?.body?.email,
          password: req?.body?.password,
      });
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  // res.json({user:"User registration"})
}
)

//-----------------------------------
// LOGIN
//..............................

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const{email, password} = req.body
  const userFound = await User.findOne({email: req.body.email})
  // check if password is correct
  if (userFound && (await userFound.isPasswordMatched(password))){
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
      isVerified: userFound?.isAccountVerified,
    })
  } else{
    res.status(401);
    {  throw new Error("User not found") }

  }
 
 
}
);


//Users
//-------------------------------
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {

  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------


//------------------------------
//Delete user
//------------------------------
const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  ValidateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});


//----------------
//user details
//----------------
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  ValidateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});


module.exports ={userRegisterCtrl, loginUserCtrl,fetchUsersCtrl,deleteUsersCtrl,fetchUserDetailsCtrl}