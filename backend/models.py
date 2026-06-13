from sqlalchemy import Column, Integer, String, Text, Float
from database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    image_url = Column(String)
    price = Column(Float)

class ContactForm(Base):
    __tablename__ = "contact_forms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    message = Column(Text)

class SiteContent(Base):
    __tablename__ = "site_content"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True)   # e.g. "about_title"
    value = Column(Text)                             # The actual text content
    page = Column(String, index=True)               # e.g. "about", "collection", "contact"
    label = Column(String)                           # Human-readable label for Admin UI

