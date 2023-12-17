const express = require("express");
const User = require('./user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const jwtKey ='Ksenia';

const router = express.Router();

const getUserNum = async (req, res) => {
    try{
        let result = await User.find();
        console.log(result.length);
        res.status(201).json(result.length);  

     } catch(err){
        console.log(err);
        res.status(406).json({message:"Unexpected error."});  

     }
}

const login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate){
        const passwordResult = await bcrypt.compare(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, jwtKey, {expiresIn: 90 * 90});
            res.status(200).json({
                token: `Bearer p${token}`
            });

        } else {
            res.status(401).json({message:"Not valid password."});
        }

    } else {
        res.status(404).json({message:"Not existing user"})
    }
}

const register = async (req, res) => {
    const candidate = await User.findOne({email:req.body.email});
    if (candidate){
        res.status(409).json({
            message:"Existing user."
        });
    } else {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10)
        })

        try {
            await user.save();
            res.status(201).json(user);  
        }
        catch(e){
            console.log(e);
        }
    }
}

router.post('/login', login);
router.post('/register', register);
router.get('/getUserNum', getUserNum);

module.exports = router;