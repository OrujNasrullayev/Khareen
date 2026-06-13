import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from database import Base, engine, get_db
import models

# 1. Connect to postgres default DB to check and create clothes_rental DB
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/clothes_rental")
# Split to get connection to default postgres database
base_url, db_name = DATABASE_URL.rsplit('/', 1)
postgres_url = f"{base_url}/postgres"

temp_engine = create_engine(postgres_url, isolation_level="AUTOCOMMIT")
with temp_engine.connect() as conn:
    # Check if database exists
    result = conn.execute(text(f"SELECT 1 FROM pg_database WHERE datname='{db_name}'"))
    exists = result.scalar()
    if not exists:
        print(f"Database {db_name} does not exist. Creating it...")
        conn.execute(text(f"CREATE DATABASE {db_name}"))
        print(f"Database {db_name} created successfully.")
    else:
        print(f"Database {db_name} already exists.")

# 2. Bind the engine and create tables
print("Creating tables...")
Base.metadata.create_all(bind=engine)

# 3. Add initial clothes items if they do not exist
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

try:
    item_count = db.query(models.Item).count()
    if item_count == 0:
        print("Adding dummy rental items...")
        dummy_items = [
            models.Item(
                name="Velvet Evening Gown",
                description="Elegant midnight blue velvet gown, perfect for formal events and black-tie galas.",
                price=85.00,
                image_url="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80"
            ),
            models.Item(
                name="Classic Tweed Blazer",
                description="Premium heritage tweed blazer with subtle gold buttons. Timeless styling.",
                price=45.00,
                image_url="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80"
            ),
            models.Item(
                name="Designer Silk Trench Coat",
                description="Lightweight silk blend trench coat in sandy beige. Breathable and ultra-premium.",
                price=95.00,
                image_url="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80"
            ),
            models.Item(
                name="Satin Floral Midi Dress",
                description="Vibrant floral print midi dress in fluid satin. Great for weddings and summer parties.",
                price=55.00,
                image_url="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80"
            )
        ]
        db.add_all(dummy_items)
        db.commit()
        print("Dummy rental items added.")
    else:
        print("Database already contains items.")
finally:
    db.close()
