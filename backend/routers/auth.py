from fastapi import APIRouter, HTTPException, status
import schemas

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

# In a production app, this should be a JWT token or random session ID.
# For simplicity, we are using a stable token defined here.
ADMIN_TOKEN = "lumina_rent_secret_admin_token_2026"

@router.post("/login", response_model=schemas.TokenResponse)
def login(request: schemas.LoginRequest):
    if request.username == "admin" and request.password == "Khareen2026":
        return {"token": ADMIN_TOKEN}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password"
    )

from fastapi import Header

def verify_admin_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header"
        )
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header must be Bearer <token>"
        )
    token = parts[1]
    if token != ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid or expired admin token"
        )

