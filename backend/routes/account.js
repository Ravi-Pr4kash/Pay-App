import express from 'express'
import authMiddleware from '../middleware.js';
import { Account, User } from '../db.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/balance', authMiddleware, async(req,res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    const user = await User.findById(req.userId);

    res.status(200).json({
        balance: account.balance,
        firstName: user.firstName,
        lastName: user.lastName
    })
})

router.post('/transfer', authMiddleware, async(req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    //fetch the account within the session
    const account = await Account.findOne({ userId: req.userId }).session(session)

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({msg: "Insufficient balance"})
    }

    const toAccount = await Account.findOne({userId: to}).session(session)

    if(!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({msg: "invalid account"})
    }

    //perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({userId: to}, { $inc: { balance: amount } }).session(session)

    //commit the transaction
    await session.commitTransaction()
    res.status(200).json({msg: "Transfer successfull"})
})

export default router;