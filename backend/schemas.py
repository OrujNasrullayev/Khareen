from pydantic import BaseModel
from typing import Optional

class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    price: float

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True

class ContactFormBase(BaseModel):
    name: str
    email: str
    message: str

class ContactFormCreate(ContactFormBase):
    pass

class ContactForm(ContactFormBase):
    id: int

    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    token: str

class SiteContentItem(BaseModel):
    key: str
    value: str
    page: str
    label: str

    class Config:
        orm_mode = True

class SiteContentUpdate(BaseModel):
    value: str


