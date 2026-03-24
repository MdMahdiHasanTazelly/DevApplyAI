# AI Apply



## Problems:
1. pdf-parse is incompitalbe with nextjs.   
- When extracting resume text, pdf-parse package was not working properly with nextjs. Importing this way "import pdfParse from "pdf-parse";" was no longer had a default export in its latest ESM version.
- "import * as pdfParse from "pdf-parse";" importing this way also shows "The export default was not found in module [project]/node_modules/pdf-parse/dist/pdf-parse/esm/index.js [app-route] (ecmascript)."  
**Soln :** Then used pdf2json package for resume text extraction.

 2. Projects virtual environment was not working.  
 **Cause:** Changing the project's folder name. Because in the env configuration file, the directory had remained as the old peoject name. So, global python was running instead of the projects env.  
 **Soln :** Recreated the virtual environment.
