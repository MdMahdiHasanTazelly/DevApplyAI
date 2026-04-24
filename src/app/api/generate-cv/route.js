import axios from "axios";

export async function POST(request) {
    try {

        const body = await request.json();

        const resumeText = body.resumeText;
        const jobDesc = body.jobDesc;

        if (!resumeText || !jobDesc) {
            return Response.json({ error: "Resume & Job Description are requires." }, { status: 400 });
        }

        const response = await axios.post(`${process.env.AI_BACKEND_URL}/generate-cv`,
            { resumeText, jobDesc },
            {
                headers: { "Content-Type": "application/json" }
        });


       // console.log(response);


        return Response.json({ message: "Dummy." });

    } catch (error) {
        console.error(error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}