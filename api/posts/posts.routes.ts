import express from "express";
import * as posts from "./posts.handlers";
const router = express.Router();

router.get("/findAll", posts.findAll);
router.post("/createOne", posts.createOne);

export default router;