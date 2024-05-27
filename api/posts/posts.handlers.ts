import { Request, Response, NextFunction } from "express";
import { Post } from "../../db/model";

export const createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body;
        const newPost = new Post({ post: content });
        await newPost.save();

        res.status(201).json({ message: "Post created successfully", newPost });
    } catch (error) {
        res.status(400).json({ message: "Invalid input data", errors: error });
    }
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}