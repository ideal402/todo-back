const User = require("../model/User")
const bcrypt = require("bcrypt")
const saltRounds = 10;
const userController = {}

userController.createUser = async (req,res) => {
    try{
        const {name, email, pw} = req.body
        if (!name) {
            throw new Error("Name is required.");
        }
        if (!email) {
            throw new Error("Email is required.");
        }
        if (!pw) {
            throw new Error("Password is required.");
        }

        const AlreadyExist = await User.findOne({email})

        if (AlreadyExist){
            throw new Error("이미 가입된 메일 주소입니다.");
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(pw, salt);

        const newUser = new User({name, email, pw:hash});
        await newUser.save();

        res.status(200).json({status:'ok', data:newUser});
    }catch(err){
        res.status(400).json({status:"fail", error:err.message})
    }
} 

userController.login = async (req, res) => {
    try{    
        const {email, pw} = req.body

        const findUser = await User.findOne({email},"-createAt -updatedAt -__v")

        if(findUser){
            const result = bcrypt.compareSync(pw, findUser.pw);
            if(result){
                const token = findUser.generateToken();
                res.status(200).json({status:"ok", findUser, token})
                
                return;
            }
        }
        throw new Error("이메일 혹은 비밀번호가 일치하지 않습니다.")
    }catch(err){
        res.status(400).json({status:"fail", error:err.message})
    } 
}

userController.getUser = async (req, res) =>{
    try {
        const {userId} = req; 
        const user = await User.findOne({_id:userId});
        if(!user){
            throw new Error("can not find user");
        }
        res.status(200).json({status:"success", user:user});
    } catch (error) {
        res.status(400).json({status:"fail", error:error.message});        
    }
}
 
module.exports = userController