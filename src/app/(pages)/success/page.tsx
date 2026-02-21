'use client';

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect } from "react";

useEffect(() => {

  const saveBooking = async () => {

    await addDoc(collection(db, "bookings"), {
      customerName: "Nick",
      car: "Mercedes S Class",
      status: "paid",
      createdAt: new Date(),
    });

  };

  saveBooking();

}, []);
