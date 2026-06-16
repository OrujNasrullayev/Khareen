from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import items, contact, auth, site_content

models.Base.metadata.create_all(bind=engine)

from sqlalchemy import text
try:
    with engine.begin() as conn:
        conn.execute(text("ALTER TABLE contact_forms ADD COLUMN event_date VARCHAR;"))
except Exception:
    pass
try:
    with engine.begin() as conn:
        conn.execute(text("ALTER TABLE contact_forms ADD COLUMN occasion VARCHAR;"))
except Exception:
    pass
try:
    with engine.begin() as conn:
        conn.execute(text("ALTER TABLE contact_forms ADD COLUMN size VARCHAR;"))
except Exception:
    pass
app = FastAPI(title="Clothes Rental API")

# Allow CORS for local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles

app.include_router(auth.router)
app.include_router(items.router)
app.include_router(contact.router)
app.include_router(site_content.router)

# Mount the static frontend directory
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    # The prompt explicitly requested running on localhost 1111
    uvicorn.run("main:app", host="127.0.0.1", port=1111, reload=True)
