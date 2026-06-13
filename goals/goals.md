# Project Goals

## Primary Objective
Build a website for a Clothes Renting business. 

## Technical Stack
- **Backend:** Python with FastAPI
- **Database:** PostgreSQL
- **Frontend:** HTML/JS/CSS or framework (React/Next.js/Vite) with a simple and rich design (simple gradients, builds trust).
- **Hosting/Execution:** Run on localhost port 1111 when done.
- **Deployment:** Deployed to Netlify via GitHub Actions (triggered by pushes to `master`/`main` or manually).

## Features & Pages
1. **Collection Page:** Show items from collections.
2. **About Us Page:** Information about the business.
3. **Contact Us Page:** Retrieve filled out contact us forms in the backend.
4. **Admin Panel:** Manage (view, add, edit, delete) everything built (e.g., collection items, contact submissions, and all editable text content across pages). Must be secured with authentication (login) and only accessible via a direct link/hash (no navbar button).
5. **Site Content Management:** All text displayed on the website (Collection page hero, About Us text, Contact Us text, etc.) must be stored in the database and editable from the Admin Panel.

## Constraints & Rules
- Every time any sort of change is made, ensure alignment with this goals document.
- When adding new features, do not make any changes that were not explicitly prompted for.
- Every feature/data model added must be integrated into the Admin Panel so it is easily modifiable later.
- Deployment via GitHub Actions requires the following repository secrets to be configured on GitHub:
  - `NETLIFY_AUTH_TOKEN`: Your Netlify Personal Access Token.
  - `NETLIFY_SITE_ID`: `f548b168-754e-412e-903a-8608d33610d0` (the site ID for `magical-volta`).

---
*Feel free to write out additional goals or edit this document so that we are always working on the same thing.*
