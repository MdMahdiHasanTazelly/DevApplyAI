export const runtime = "nodejs";

export async function POST(request) {
    try {
        const PDFParser = (await import("pdf2json")).default;

        const formData = await request.formData();
        const file = formData.get("file");

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

        const buffer = Buffer.from(await file.arrayBuffer());

        const pdfParser = new PDFParser();

        const text = await new Promise((resolve, reject) => {
            pdfParser.on("pdfParser_dataError", err => reject(err));
            pdfParser.on("pdfParser_dataReady", pdfData => {
                let textContent = "";

                pdfData.Pages.forEach(page => {
                    page.Texts.forEach(t => {
                        t.R.forEach(r => {
                            textContent += decodeURIComponent(r.T) + " ";
                        });
                    });
                    textContent += "\n";
                });

                resolve(textContent);
            });

            pdfParser.parseBuffer(buffer);
        });

        return Response.json({ text });

    } catch (err) {
        console.error(err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}