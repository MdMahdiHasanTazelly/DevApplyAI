import { extractText, analyzeResume } from "@/app/utils/helper.js";
import axios from "axios";

export async function POST(request) {
    try {

        const formData = await request.formData();
        const file = formData.get("file");
        const jobDesc = formData.get("jobDesc");

        if (!file) {
            return Response.json({ error: "No file uploaded" }, { status: 400 });
        }

        // FILE TYPE VALIDATION
        if (file.type !== "application/pdf") {
            return Response.json(
                { error: "Only PDF files are allowed" },
                { status: 400 }
            );
        }

        const text = await extractText(file); //resume text extraction in helper.js

        const response = await axios.post(`${process.env.AI_BACKEND_URL}/analyze`, { resume: text, jobDesc }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        return Response.json({ analysis: response.data, resumeText: text });

    } catch (err) {
        console.error(err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}




