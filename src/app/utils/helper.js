export const runtime = "nodejs";

export async function extractText(file) {

    const PDFParser = (await import("pdf2json")).default;

    const buffer = Buffer.from(await file.arrayBuffer());

    const pdfParser = new PDFParser();

    const text = await new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataError", err => reject(err));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            let textContent = "";

            pdfData.Pages.forEach(page => {
                page.Texts.forEach(t => {
                    t.R.forEach(r => {
                        textContent += decodeURIComponent(r.T) + "";
                    });
                });
                textContent += "\n";
            });

            resolve(textContent);
        });

        pdfParser.parseBuffer(buffer);
    });

    return text;
}







