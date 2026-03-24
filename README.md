# AI Apply



## Problems:
1.
- When extracting resume text, pdf-parse package was not working properly with nextjs. Importing this way "import pdfParse from "pdf-parse";" was no longer had a default export in its latest ESM version.
- "import * as pdfParse from "pdf-parse";" importing this way also shows "The export default was not found in module [project]/node_modules/pdf-parse/dist/pdf-parse/esm/index.js [app-route] (ecmascript)."
