import express from "express";
import { createResidency, getAllResidencies, getResidency } from "../controllers/resdController.js";
const router = express.Router();

router.post("/create", createResidency);
router.get("/getall", getAllResidencies);
router.get("/:id",getResidency)

export { router as residencyRoute };