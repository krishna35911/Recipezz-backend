// import usermodel
const usermodel=require('../model/userschema')

const jwt=require('jsonwebtoken')

// logic for register
exports.register=async(req,res)=>
{
    const {username,email,password}=req.body
    try {
        const alreadyuser=await usermodel.findOne({email})
        if(alreadyuser)
        {
            res.status(406).json('User already exist')
        }
        else
        {
            const newuser=new usermodel({
                username,
                email,
                password
            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

// login 
exports.login=async(req,res)=>
{
    // console.log('inside login controller');
    // res.status(200).json('login request recieved')
    const{email,password}=req.body
    try {
       const alreadyuser=await usermodel.findOne({email,password})

       if(alreadyuser){
        const token=jwt.sign({userid:alreadyuser._id},"krishnasecretkey")
        res.status(200).json({alreadyuser,token})
       } 
       else
       {
        res.status(404).json('Invalid email or password')
       }
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.getusercount=async(req,res)=>
{
    const result=await usermodel.countDocuments()
    res.status(200).json(result)
}

exports.edituserprofile = async (req, res) => {
    const {userid} = req.payload;
    const { username, email, password } = req.body;  
    try {
      const updateprofile = await usermodel.findByIdAndUpdate(
        { _id: userid },
        { username, email, password },
        { new: true }
      );
  
      await updateprofile.save()
      res.status(200).json(updateprofile);
    } catch (err) {
      res.status(401).json(`${err}`);
    }
  };

  exports.getuserdetails=async(req,res)=>
  {
    try {
      const users=await usermodel.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(401).json(error)
    }
  }