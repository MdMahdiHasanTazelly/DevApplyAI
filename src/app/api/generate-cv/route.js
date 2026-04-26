import axios from "axios";

export async function POST(request) {
    try {

        const body = await request.json();

        const resumeText = body.resumeText;
        const jobDesc = body.jobDesc;

        if (!resumeText || !jobDesc) {
            return Response.json({ error: "Resume & Job Description are required." }, { status: 400 });
        }

        const response = await axios.post(`${process.env.AI_BACKEND_URL}/generate-cv`,
            { resumeText, jobDesc },
            {
                headers: { "Content-Type": "application/json" }
            });


        //console.log(response.data.cover_letter);


        return Response.json({ cv: response.data.cover_letter });

    } catch (error) {
        console.error(error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}