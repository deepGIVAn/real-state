import express from "express";
import {
  allBookings,
  allfav,
  bookVisit,
  cancelBooking,
  createUser,
  toFav,
} from "../controllers/userContoller.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);
router.post("/allbookings", allBookings);
router.post("/removebooking/:id", cancelBooking);
router.post("/tofav/:id", toFav);
router.post("/allfav", allfav);

export { router as userRoute };
