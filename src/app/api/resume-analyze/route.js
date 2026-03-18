export async function POST(request) {
    const formData = await request.formData();
    const jobDesc = formData.get("jobDesc");
    const file = formData.get("file");

    console.log(jobDesc);
    console.log(file);

    return Response.json({ message: "Hello from resume analyzer." });
}