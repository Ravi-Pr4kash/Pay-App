import express from 'express'
import userRouter from './user.js'
import accountRouter from './account.js'

const router = express.Router() // router for /api/v1
// /api/v1/user
// /api/v1/transaction

router.use("/user", userRouter)
router.use('/account', accountRouter)

export default router;