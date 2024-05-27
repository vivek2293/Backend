import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../db/model";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(403).json({ message: "User already exists" });
    } 
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign(
        {
          _id: newUser._id,
          username: newUser.username,
          role: "user",
        },
        process.env.JWT_SECRET ?? "",
        { expiresIn: "24h" }
      );
      res.json({ message: "User created successfully", token });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid input data", errors: error });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign(
                    {
                      _id: user._id,
                      username: user.username,
                      role: "user",
                    },
                    process.env.JWT_SECRET ?? "",
                    { expiresIn: "24h" }
                  );
                res.status(200).json({ message: 'User logged in successfully', token });
            } else {
                res.status(403).json({ message: 'Invalid username or password.' });
            }
        } else {
            res.status(403).json({ message: 'User does not exist' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Login error:', errors: error });
    }
};