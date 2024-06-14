import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
    try{
       const users = await prisma.user.findMany()

       res.status(200).json(users)

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to get Users"})
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id
    try{
        const user = await prisma.user.findUnique({
            where:{id},
        })

        res.status(200).json(user)

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to get Users"})
    }
}


export const updateUser = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId

    const { password, avatar, ...inputs } = req.body

    if(id !== tokenUserId){
        return res.status(403).json({message: "Not Authorized!"})
    }

    let updatedPassword = null

    try{

        if(password){
            updatedPassword = await bcrypt.hash(password,10)
        }

       const updatedUser = await prisma.user.update({
        where:{id},
        data:{
            ...inputs,
            ...(updatedPassword && { password : updatedPassword }),
            ...(avatar && { avatar }),
        },
       })

       const {password: userPassword, ...rest} = updatedUser // we must not send password for security reasons

       res.status(200).json(rest)

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to get Users"})
    }
}


export const deleteUser = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId

    if(id !== tokenUserId){
        return res.status(403).json({message: "Not Authorized!"})
    }

    try{
       await prisma.user.delete({
          where: {id},
       })

       res.status(200).json({message: "User Deleted!"})

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to get Users"})
    }
}


export const savePost = async (req, res) => {
    const postId = req.body.postId
    const tokenUserId = req.userId

    try{
        const savedPost = await prisma.savedPost.findUnique({
           where:{
             userId_postId:{
                userId: tokenUserId,
                postId: postId,
             }
           }
        })

        if (savedPost){
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id
                }
            })

            res.status(200).json({message: "Post removed from saved list!"})
        }
        else{
           await prisma.savedPost.create({
            data:{
                userId: tokenUserId,
                postId: postId
            }
           })

           res.status(200).json({message: "Post added to saved list!"})
        }
       

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to get Users"})
    }
}


export const bookPost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        const bookedPost = await prisma.bookedPosts.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId: postId,
                },
            },
        });

        if (bookedPost) {
            await prisma.bookedPosts.delete({
                where: {
                    id: bookedPost.id,
                },
            });

            await prisma.post.update({
                where: { id: postId },
                data: { status: 'not_adopted' }, // Update to the appropriate status
            });

            res.status(200).json({ message: "Post removed from saved list!" });
        } else {
            await prisma.bookedPosts.create({
                data: {
                    userId: tokenUserId,
                    postId: postId,
                },
            });

            await prisma.post.update({
                where: { id: postId },
                data: { status: 'booking' },
            });

            res.status(200).json({ message: "Post added to saved list!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to process booking" });
    }
};

export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId
    try{
        const userPosts = await prisma.post.findMany({
            where:{ userId: tokenUserId },
        })

        const saved = await prisma.savedPost.findMany({
            where:{ userId: tokenUserId },
            include:{
                post: true
            }
        })

        const booked = await prisma.bookedPosts.findMany({
            where:{ userId: tokenUserId },
            include:{
                post: true
            }
        })

        const savedPosts = saved.map((item) => item.post)
        const bookedPosts = booked.map((item) => item.post)

        res.status(200).json({ userPosts, savedPosts, bookedPosts })

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to get Profile Posts"})
    }
}
