from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

import models
import schemas
from database import get_db
from routers.auth import verify_admin_token

router = APIRouter(
    prefix="/site-content",
    tags=["site-content"]
)

@router.get("/", response_model=List[schemas.SiteContentItem])
def get_site_content(page: Optional[str] = None, db: Session = Depends(get_db)):
    """Public endpoint — returns all site content, optionally filtered by page."""
    query = db.query(models.SiteContent)
    if page:
        query = query.filter(models.SiteContent.page == page)
    return query.order_by(models.SiteContent.id).all()

@router.put("/{key}", response_model=schemas.SiteContentItem)
def update_site_content(
    key: str,
    update: schemas.SiteContentUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(verify_admin_token)
):
    """Admin-protected — updates the value of a content item by its key."""
    item = db.query(models.SiteContent).filter(models.SiteContent.key == key).first()
    if item is None:
        raise HTTPException(status_code=404, detail=f"Content key '{key}' not found")
    item.value = update.value
    db.commit()
    db.refresh(item)
    return item
