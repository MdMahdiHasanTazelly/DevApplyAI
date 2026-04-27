"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
    return <ToastContainer position="bottom-center" autoClose={1500}
        toastStyle={{ fontSize: "20px", color: "black" }}
    />;
}