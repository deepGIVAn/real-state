import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// export const createUser = asyncHandler(async (req, res) => {
const createUser = asyncHandler(async (req, res) => {
  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      messsage: "User registered successfully",
      user: user,
    });
  } else res.status(201).json({ messsage: "User already registered" });
});

const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
    }
    res.send("Your Visit is booked successfully");
  } catch (error) {
    throw new Error(error.messsage);
  }
});

const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.messsage);
  }
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const userbookvisits = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    // console.log(userbookvisits);
    // console.log(userbookvisits.bookedVisits);

    const index = userbookvisits.bookedVisits.findIndex(
      (visit) => visit.id === id
    );

    if (index === -1) {
      res.status(404).json({ message: "Booking not found!!" });
    } else {
      userbookvisits.bookedVisits.splice(index, 1);
    }

    await prisma.user.update({
      where: { email: email },
      data: {
        bookedVisits: { set: userbookvisits.bookedVisits },
      },
    });

    res.status(200).send("Booking cancelled successfully!!");
  } catch (error) {
    throw new Error(error.messsage);
  }
});

// funciton to add a resd in favourites list of a user
const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  const rid = id;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: user.favResidenciesID.filter((id) => id !== rid),
        },
      });
      res.send({ message: "Removed from favourites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: user.favResidenciesID.concat(id.toString()),
          // favResidenciesID: {
          //   push: id,
          // },
        },
      });
      console.log(user.favResidenciesID.push(id.toString())); // it is returning the new length at which it is pushed here..
      res.send({ message: "Updated favourites", user: updateUser });
    }
  } catch (error) {
    throw new Error(error.messsage);
  }
});

// function to get all favourites..
const allfav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResidencies = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResidencies);
  } catch (error) {
    throw new Error(error.messsage);
  }
});

export { createUser, bookVisit, allBookings, cancelBooking, toFav, allfav };
