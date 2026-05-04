"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Loader from "../Loader/page.js";

import { toast } from "react-toastify";

export default function CoverLetterCard({ resumeText, jobDesc, onClose }) {

    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [cvSuggestions, setCVSuggestions] = useState("");

    // working on generate-cv endpoint
    const generateCVSuggestions = async () => {
        try {
            const res = await axios.post(`/api/cv-suggestions`,
                { resumeText, jobDesc },
                { headers: { "Content-Type": "application/json" } }
            );

            // console.log(res.data.cv);
            setCVSuggestions(res.data.cv);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    // to avoid useEffect(in next) double firing in dev
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        hasFetched.current = true;
        generateCVSuggestions();
    }, []);



    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            {/* Card */}
            <div className="bg-white w-[90%] max-w-2xl rounded-2xl shadow-xl p-6 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                    <i className="bi bi-x-circle fs-2 fw-bold"></i>

                </button>

                <h2 className="text-xl font-semibold mb-4">
                    Cover Letter Suggestions
                </h2>

                {loading ? (

                    <div
                        className="form-control w-100 d-flex justify-content-center align-items-center"
                        style={{ height: "480px" }}
                    >
                        <Loader />
                    </div>


                ) : (
                    <div className="whitespace-pre-line text-sm text-gray-700 max-h-[500px] overflow-y-auto">

                        <textarea
                            className={`form-control w-100 ${isEditing ? "border-primary border-2 shadow-lg" : ""}`}
                            rows="20"
                            value={cvSuggestions}
                            readOnly={!isEditing}
                            onChange={(e) => setCVSuggestions(e.target.value)}
                        ></textarea>

                    </div>
                )}


                {!loading && (
                    <>

                        <button
                            className="btn btn-primary mt-4"
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(cvSuggestions);
                                    toast.success("Copied to clipboard!");
                                } catch (err) {
                                    console.log(err);
                                    toast.error("Failed to copy!");
                                }
                            }}
                        >
                            <b>Copy to Clipboard</b>
                        </button>

                        <button className="btn btn-primary mt-4 ms-4"
                            onClick={handleEditToggle}
                            style={{ width: "6rem" }}
                        >
                            <b>{isEditing ? "Save" : "Edit"}</b>
                        </button>
                    </>

                )}

            </div>
        </div>
    );
}