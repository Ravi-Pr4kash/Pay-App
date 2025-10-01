import express from 'express';
import bcrypt from 'bcrypt'
import z from 'zod'
import jwt from 'jsonwebtoken'
import JWT_SECRET from '../config.js'
import { Account } from '../db.js';
import { User } from '../db.js';
import authMiddleware from '../middleware.js';



const router = express.Router();

const signupBody = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

const updateBody = z.object({
    firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  password: z.string().min(6).optional()
})

router.post('/signup', async(req,res) => {
    try {
        const parseResult = signupBody.safeParse(req.body);

        if (!parseResult.success) {
          return res.status(400).json({ msg: "Invalid input"});
        }
    
        
        const { username, firstName, lastName, password } = parseResult.data;

        const existingUser = await User.findOne({
            username
        })
        if(existingUser) {
            return res.status(409).json("user already exists")
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        })
        const userId = user._id

        // create new account in Accounts DB
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({userId}, JWT_SECRET)

        res.status(201).json({
            msg: "User created Successfully",
            userId: user._id,
            token: token
        })
    } catch (error) {
        res.status(500).json({msg: "Internal server error"})
    }
})

router.post('/signin', async(req,res) => {
    try {
        const parseResult = signinBody.safeParse(req.body);
        if(!parseResult.success) {
        return res.status(411).json({msg: "please enter valid inputs"})
    }
    const {username, password} = parseResult.data;

    const user = await User.findOne({username})
    if(!user) {
        return res.status(400).json({msg: "User not found"})
    }

    const matchPass = await bcrypt.compare(password, user.password)
    if(!matchPass) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET)

    return res.status(200).json({
        msg: "Login successful",
        token: token,
        firstName: user.firstName,
        lastName: user.lastName
    })
    } catch (error) {
        res.status(500).json({msg: "Internal server error"})
    }
})

router.put('/update', authMiddleware, async(req,res) => {
    try {
        const parseResult = updateBody.safeParse(req.body);
        if(!parseResult.success) {
           return res.status(403).json({msg:"Invalid inputs"})
        }

        const updateFields = {};
            if (parseResult.data.firstName) updateFields.firstName = parseResult.data.firstName;
            if (parseResult.data.lastName) updateFields.lastName = parseResult.data.lastName;
            if (parseResult.data.password) updateFields.password = parseResult.data.password;

            if (Object.keys(updateFields).length === 0) {
                return res.status(400).json({ msg: "No fields to update" });
              }

        await User.updateOne({_id: req.userId}, { $set: parseResult.data })

        return res.status(200).json({msg: "updated successfully"})
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg: "Internal server issue"})
    }
})

router.get('/bulk', async(req,res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })
    return res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

    
})

export default router;