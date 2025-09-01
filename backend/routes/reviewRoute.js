import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { addReview, getAllReviews } from "../controllers/reviewController.js"
import { constants } from "http2"



const reviewRouter = express.Router()

reviewRouter.post("/givereview",isAuth,addReview)
reviewRouter.get("/allReview",getAllReviews)


export default reviewRouter