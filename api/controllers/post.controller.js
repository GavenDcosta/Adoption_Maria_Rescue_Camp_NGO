import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const getPosts = async (req, res) => {
  const query = req.query;
  const token = req.cookies?.token;
  let userId = null;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      userId = payload.id;
    } catch (err) {
      console.log('Token verification failed:', err);
    }
  }

  try {
    const posts = await prisma.post.findMany({
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (userId) {
      for (const post of posts) {
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: post.id,
              userId: userId,
            },
          },
        });
        post.isSaved = !!saved;
      }
    } else {
      posts.forEach(post => {
        post.isSaved = false;
      });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get the Posts!" });
  }
};


export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;
    let isSaved = false;
    let isBooked = false

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });
        isSaved = !!saved;
      } catch (err) {
        console.log('Token verification failed:', err);
      }
    }

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const booked = await prisma.bookedPosts.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });
        isBooked = !!booked;
      } catch (err) {
        console.log('Token verification failed:', err);
      }
    }

    res.status(200).json({ ...post, isSaved, isBooked });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};


export const addPost = async (req, res) => {
    const body = req.body
    const tokenUserId = req.userId
    try{
       const newPost = await prisma.post.create({
         data:{
            ...body.postData,
            userId: tokenUserId,
            postDetail:{
              create: body.postDetail,
            }
         }
       })
     

       res.status(200).json(newPost)
    
    }catch(error){
     console.log(error)
     res.status(500).json({message: "Failed to Create the Post!"})
    }  
}

export const updatePost = async (req, res) => {
    try{

     res.status(200).json()
 
    }catch(error){
     console.log(error)
     res.status(500).json({message: "Failed to Update the Post!"})
    }
}

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
      // Find the post by id
      const post = await prisma.post.findUnique({
          where: { id }
      });

      // If post not found, return 404
      if (!post) {
          return res.status(404).json({ message: "Post not found!" });
      }

      // Check if the user is authorized to delete this post
      if (post.userId !== tokenUserId) {
          return res.status(403).json({ message: "You are not authorized to perform this action!" });
      }

      // Delete the post, which will also delete associated PostDetail and SavedPost entries due to cascading deletes
      await prisma.post.delete({
          where: { id }
      });

      res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete the post!" });
  }
}

