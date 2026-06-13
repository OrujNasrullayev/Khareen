from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/contact",
    tags=["contact"]
)

@router.post("/", response_model=schemas.ContactForm)
def submit_contact_form(form: schemas.ContactFormCreate, db: Session = Depends(get_db)):
    db_form = models.ContactForm(**form.dict())
    db.add(db_form)
    db.commit()
    db.refresh(db_form)
    return db_form

from routers.auth import verify_admin_token

@router.get("/", response_model=List[schemas.ContactForm])
def read_contact_forms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), token: str = Depends(verify_admin_token)):
    forms = db.query(models.ContactForm).offset(skip).limit(limit).all()
    return forms

@router.delete("/{contact_id}")
def delete_contact_form(contact_id: int, db: Session = Depends(get_db), token: str = Depends(verify_admin_token)):
    db_form = db.query(models.ContactForm).filter(models.ContactForm.id == contact_id).first()
    if db_form is None:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    
    db.delete(db_form)
    db.commit()
    return {"message": f"Contact form submission {contact_id} successfully deleted"}

