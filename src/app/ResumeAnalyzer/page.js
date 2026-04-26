"use client";
import { useRef, useState } from "react";
import CoverLetterCard from "../CoverLetterCard/page.js";
import axios from "axios";
import Loader from "../Loader/page.js";

export default function ResumeAnalyzerUI() {

    const [analysisResult, setAnalysisResult] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [file, setFile] = useState(null);
    const [resumeText, setResumeText] = useState("");
    const [clickAnalyzed, setClickAnalyzed] = useState(false);


    const [showCV, setShowCV] = useState(false);

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        //console.log("Selected file:", selectedFile);
    };




    const analyze = (e) => {
        e.preventDefault();

        if (!file || !jobDesc) return; // safety check

        setClickAnalyzed(true);

        const formData = new FormData();
        formData.append("jobDesc", jobDesc);
        formData.append("file", file);

        try {

            axios.post("/api/resume-analyze", formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
                .then(res => {
                    // console.log(res.data);
                    setAnalysisResult(res.data.analysis); // Save response in state
                    setResumeText(res.data.resumeText);
                    setClickAnalyzed(false);
                });

        } catch (error) {
            console.log(error);
        }

        //setJobDesc("");
        setFile(null);
    }


    return (
        <div className="min-h-screen bg-gray-50 overflow-hidden selection:bg-indigo-200 selection:text-indigo-900 relative">
            <form onSubmit={analyze}>
                {/* Background Effects */}
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-50 to-transparent -z-10"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-indigo-100 rounded-full blur-[120px] -z-10 opacity-50 translate-x-1/3 -translate-y-1/3"></div>

                {/* HEADER */}
                <header className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shadow-lg">
                            ✨
                        </div>



                        <h1 className="text-2xl font-bold tracking-tight">
                            AI Resume Analyzer
                        </h1>
                    </div>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Optimize your resume for TECH role. Upload your CV and paste the job
                        description to get instant, actionable feedback.
                    </p>
                </header>

                {/* MAIN */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT SIDE */}
                        <div className="lg:col-span-5 flex flex-col gap-6">

                            {/* Upload Card */}
                            <div className="bg-white border shadow-lg rounded-2xl p-6 relative group">

                                <div className="absolute top-0 inset-x-0 h-1 "></div>

                                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                    <i className="bi bi-file-earmark-text-fill text-secondary"></i>
                                    1. Upload Resume
                                </h2>

                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition hover:border-indigo-400 hover:bg-gray-100"
                                >
                                    <input
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        className="hidden"
                                    />

                                    <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-500">
                                        <img src="/upload.svg"></img>
                                    </div>

                                    <p className="text-sm font-medium mb-1">
                                        {file ? file.name : "Click or drag to upload"}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Supports PDF format, up to 5MB
                                    </p>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="bg-white border shadow-lg rounded-2xl p-6 relative group">
                                <div className="absolute top-0 inset-x-0 h-1 "></div>

                                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                    <i className="bi bi-briefcase-fill text-secondary"></i>
                                    2. Job Description
                                </h2>

                                <textarea
                                    required
                                    placeholder="Paste the target job description here..."
                                    className="w-full h-48 px-4 py-3 rounded-xl bg-gray-50 border text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 resize-none shadow-inner"
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />
                            </div>


                            <button type="submit" className="btn btn-primary btn-lg btn-block mt-5">
                                Analyze Resume &nbsp; &nbsp;

                                <i className="bi bi-arrow-right-circle-fill"></i>
                            </button>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="lg:col-span-7 h-full">
                            <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl bg-white/50 text-center">




                                {analysisResult ? (

                                    <>


                                        <div className="text-left w-full max-w-lg">
                                            <h3 className="text-xl font-semibold mb-2">Analysis Result</h3>

                                            <p className="mb-2">
                                                <strong>Score:</strong> {analysisResult.score}%
                                            </p>

                                            <div className="mb-2">
                                                <strong>Matched Skills:</strong>
                                                <ul className="list-disc list-inside">
                                                    {analysisResult.matchedSkills.map(skill => (
                                                        <li key={skill}>{skill}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="mb-2">
                                                <strong>Missing Skills:</strong>
                                                <ul className="list-disc list-inside">
                                                    {analysisResult.missingSkills.map(skill => (
                                                        <li key={skill}>{skill}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="mb-2">
                                                <strong>Suggestions:</strong>
                                                <ul className="list-disc list-inside">
                                                    {analysisResult.suggestions.map(suggestion => (
                                                        <li key={suggestion}>{suggestion}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <button type="button" className="btn btn-primary btn-lg btn-block mt-5"
                                            onClick={() => setShowCV(true)}
                                        >
                                            Generate Cover Letter &nbsp;
                                            <i className="bi bi-pencil-square text-white"></i>
                                        </button>

                                    </>

                                ) : (
                                    (
                                        !clickAnalyzed ? (
                                            <>
                                                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 rotate-3">
                                                    ✨
                                                </div>
                                                <h3 className="text-xl font-semibold mb-2">Ready for Analysis</h3>
                                                <p className="text-gray-500 max-w-md">
                                                    Provide your resume and a job description on the left. Our AI
                                                    will evaluate your match, highlight missing keywords, and suggest
                                                    improvements.
                                                </p>
                                            </>
                                        ) : (
                                            <Loader />

                                        )
                                    )
                                )}

                            </div>
                        </div>

                    </div>
                </main>

            </form>


            {showCV && (
                <CoverLetterCard
                    resumeText={resumeText}
                    jobDesc={jobDesc}
                    onClose={() => setShowCV(false)}
                />
            )}
        </div>
    );
}