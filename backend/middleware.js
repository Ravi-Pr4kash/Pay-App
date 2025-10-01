import JWT_SECRET from "./config.js";
import jwt from 'jsonwebtoken';
import express from 'express'


const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({msg: "Token Missing"})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded.userId) {
            req.userId = decoded.userId;
            next()
        } else{
            return res.status(403).json({msg: "Invalid user"})
        }

    } catch (error) {
        return res.status(403).json({msg: "Invalid user"})
    }
}

export default authMiddleware;