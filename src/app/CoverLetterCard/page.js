"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/page.js";

export default function CoverLetterCard({ resumeText, jobDesc, onClose }) {

    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        generateCoverLetter();
    }, []);

    const generateCoverLetter = async () => {
        try {
            // next backend neeeds to be connected
            const res = await axios.post(`${process.env.AI_BACKEND_URL}/generate-cv`, {
                resumeText, jobDesc
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );

            setCoverLetter(res.data.coverLetter);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

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
                    Generated Cover Letter
                </h2>

                {loading ? (
                    <Loader />

                ) : (
                    <div className="whitespace-pre-line text-sm text-gray-700 max-h-[400px] overflow-y-auto">
                        {coverLetter}
                    </div>
                )}

                {/* Copy Button */}
                {!loading && (
                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => navigator.clipboard.writeText(coverLetter)}
                    >
                        <b>Copy to Clipboard</b>
                    </button>
                )}
            </div>
        </div>
    );
}