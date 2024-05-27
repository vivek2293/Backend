import express from "express";
import auth from "./auth/auth.routes";
import posts from "./posts/posts.routes";

import { jwtAuthenticator } from "../middleware/authenticator";
const router = express.Router();


router.use('/auth', auth);
router.use('/posts', jwtAuthenticator, posts);

export default router;