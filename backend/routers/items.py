from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from typing import List
import shutil
import os
import uuid

import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/items",
    tags=["items"]
)

@router.get("/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = db.query(models.Item).offset(skip).limit(limit).all()
    return items

from routers.auth import verify_admin_token

@router.post("/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db), token: str = Depends(verify_admin_token)):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=schemas.Item)
def update_item(item_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db), token: str = Depends(verify_admin_token)):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    for key, value in item.dict().items():
        setattr(db_item, key, value)
        
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), token: str = Depends(verify_admin_token)):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(db_item)
    db.commit()
    return {"message": f"Item {item_id} successfully deleted"}

@router.post("/upload")
def upload_files(files: List[UploadFile] = File(...), token: str = Depends(verify_admin_token)):
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    upload_dir = os.path.join(base_dir, "frontend", "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    
    urls = []
    for file in files:
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = os.path.join(upload_dir, unique_filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        urls.append(f"/uploads/{unique_filename}")
        
    return {"urls": urls}

