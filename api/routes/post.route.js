import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import { getPosts, getPost,  addPost, updatePost, deletePost, getAllBookedPosts } from "../controllers/post.controller.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/bookedposts", getAllBookedPosts)
router.get("/:id", getPost)
router.post("/", verifyToken, addPost)
router.put("/:id", verifyToken, updatePost)
router.delete("/delete/:id", verifyToken, deletePost)

export default router