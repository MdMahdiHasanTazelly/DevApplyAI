"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/page.js";

export default function CoverLetterCard({ resumeText, jobDesc, onClose }) {

    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        generateCoverLetter();
    }, []);

    // working on generate-cv endpoint
    const generateCoverLetter = async () => {
        try {
            const res = await axios.post(`/api/generate-cv`,
                { resumeText, jobDesc },
                { headers: { "Content-Type": "application/json" } }
            );
            //setCoverLetter(res.data.coverLetter);


        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };


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

                <h2 className="text-xl font-semibold mb-4"
                    onClick={generateCoverLetter}>
                    Generated Cover Letter
                </h2>

                {loading ? (
                    <Loader />

                ) : (
                    <div className="whitespace-pre-line text-sm text-gray-700 max-h-[500px] overflow-y-auto">

                        {/* <textarea/> */}
                        <textarea
                            className={`form-control w-100 ${isEditing ? "border-primary border-2 shadow-lg" : ""}`}
                            rows="20"
                            value={coverLetter}
                            readOnly={!isEditing}
                            onChange={(e) => setCoverLetter(e.target.value)}
                        ></textarea>
                        {coverLetter}
                    </div>
                )}

                {/* Copy Button */}
                {!loading && (
                    <>

                        <button
                            className="btn btn-primary mt-4"
                            onClick={() => navigator.clipboard.writeText(coverLetter)}
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