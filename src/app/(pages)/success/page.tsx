"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    const saveBooking = async () => {
      try {
        await addDoc(collection(db, "bookings"), {
          customerName: "Nick",
          car: "Mercedes S Class",
          status: "paid",
          createdAt: new Date(),
        });
        console.log("Booking saved successfully");
      } catch (error) {
        console.error("Error saving booking:", error);
      }
    };

    saveBooking();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Your booking has been confirmed.</p>
    </div>
  );
}