import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from database import Base, engine
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

# 2. Drop existing tables and recreate them to apply new multilingual columns
print("Dropping existing tables...")
Base.metadata.drop_all(bind=engine)

print("Creating tables...")
Base.metadata.create_all(bind=engine)

# 3. Add initial clothes items and site content
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

try:
    print("Adding dummy rental items...")
    dummy_items = [
        models.Item(
            name_az="Məxmər Ziyafət Libası",
            name_en="Velvet Evening Gown",
            description_az="Eleqant tünd göy rəngli məxmər ziyafət libası, rəsmi tədbirlər və qala gecələri üçün mükəmməldir.",
            description_en="Elegant midnight blue velvet gown, perfect for formal events and black-tie galas.",
            price=85.00,
            image_url="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80"
        ),
        models.Item(
            name_az="Klassik Tvidd Blazer",
            name_en="Classic Tweed Blazer",
            description_az="Zərif qızılı düymələrlə premium tvidd blazer. Zamanı üstələyən üslub.",
            description_en="Premium heritage tweed blazer with subtle gold buttons. Timeless styling.",
            price=45.00,
            image_url="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80"
        ),
        models.Item(
            name_az="Dizayner İpək Trençkotu",
            name_en="Designer Silk Trench Coat",
            description_az="Qumlu bej rəngdə yüngül ipək qarışığı trençkot. Nəfəs ala bilən və ultra-premium.",
            description_en="Lightweight silk blend trench coat in sandy beige. Breathable and ultra-premium.",
            price=95.00,
            image_url="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80"
        ),
        models.Item(
            name_az="Satin Güllü Midi Libas",
            name_en="Satin Floral Midi Dress",
            description_az="Axıcı satendə parlaq güllü midi libas. Toylar və yay partiləri üçün əladır.",
            description_en="Vibrant floral print midi dress in fluid satin. Great for weddings and summer parties.",
            price=55.00,
            image_url="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80"
        )
    ]
    db.add_all(dummy_items)

    print("Adding default site content...")
    default_content = [
        # Navbar items
        models.SiteContent(key="nav_home_az", value="Ana Səhifə", page="nav", label="Navbar: Home (AZ)"),
        models.SiteContent(key="nav_home_en", value="Home", page="nav", label="Navbar: Home (EN)"),
        models.SiteContent(key="nav_collection_az", value="Kolleksiya", page="nav", label="Navbar: Collection (AZ)"),
        models.SiteContent(key="nav_collection_en", value="Collection", page="nav", label="Navbar: Collection (EN)"),
        models.SiteContent(key="nav_about_az", value="Haqqımızda", page="nav", label="Navbar: About (AZ)"),
        models.SiteContent(key="nav_about_en", value="About Us", page="nav", label="Navbar: About (EN)"),
        models.SiteContent(key="nav_contact_az", value="Bizimlə Əlaqə", page="nav", label="Navbar: Contact (AZ)"),
        models.SiteContent(key="nav_contact_en", value="Contact Us", page="nav", label="Navbar: Contact (EN)"),

        # Hero section
        models.SiteContent(key="hero_tag_az", value="Premium Tədbir Libaslarının İcarəsi", page="home", label="Hero: Tag (AZ)"),
        models.SiteContent(key="hero_tag_en", value="Premium Event Dress Rentals", page="home", label="Hero: Tag (EN)"),
        models.SiteContent(key="hero_title_az", value="Üslubunuzu Ucaldın.<br>Ən fərqlini <br><span class=\"gradient-text\">İcarə edin</span>.", page="home", label="Hero: Title (AZ)"),
        models.SiteContent(key="hero_title_en", value="Elevate Your Style.<br>Rent the <span class=\"gradient-text\">Extraordinary</span>.", page="home", label="Hero: Title (EN)"),
        models.SiteContent(key="hero_subtitle_az", value="Kürator tərəfindən seçilmiş dizayner geyimlərinə və podiuma hazır ziyafət libaslarına pərakəndə satış qiymətinin cüzi bir hissəsi ilə sahib olun. Ən yaddaqalan anlarınız üçün hazırlanmış davamlı dəbdəbə.", page="home", label="Hero: Subtitle (AZ)"),
        models.SiteContent(key="hero_subtitle_en", value="Access curated designer gowns and runway-ready event dresses for a fraction of the retail price. Sustainable luxury tailored for your most memorable moments.", page="home", label="Hero: Subtitle (EN)"),
        models.SiteContent(key="hero_btn_browse_az", value="Kolleksiyaya Baxın", page="home", label="Hero: Browse Button (AZ)"),
        models.SiteContent(key="hero_btn_browse_en", value="Browse Collection", page="home", label="Hero: Browse Button (EN)"),
        models.SiteContent(key="hero_btn_story_az", value="Hekayəmiz", page="home", label="Hero: Story Button (AZ)"),
        models.SiteContent(key="hero_btn_story_en", value="Our Story", page="home", label="Hero: Story Button (EN)"),

        # Collection section
        models.SiteContent(key="coll_title_az", value="Bizim Kolleksiya", page="collection", label="Collection: Title (AZ)"),
        models.SiteContent(key="coll_title_en", value="Our Collection", page="collection", label="Collection: Title (EN)"),
        models.SiteContent(key="coll_subtitle_az", value="İcarəyə verilən premium geyimlər.", page="collection", label="Collection: Subtitle (AZ)"),
        models.SiteContent(key="coll_subtitle_en", value="Premium clothing available for rent.", page="collection", label="Collection: Subtitle (EN)"),

        # About Us section
        models.SiteContent(key="about_title_az", value="Haqqımızda", page="about", label="About: Title (AZ)"),
        models.SiteContent(key="about_title_en", value="About Us", page="about", label="About: Title (EN)"),
        models.SiteContent(key="about_text1_az", value="KháReen-ə xoş gəlmisiniz. Biz davamlı dəbə və büdcənizə zərər vermədən ən yaxşı görünüşə sahib olmağa inanırıq. Premium geyimlərdən ibarət kolleksiyamız istənilən tədbir üçün icarəyə verilir.", page="about", label="About: Paragraph 1 (AZ)"),
        models.SiteContent(key="about_text1_en", value="Welcome to KháReen. We believe in sustainable fashion and looking your best without breaking the bank. Our curated collection of premium clothing is available for you to rent for any occasion.", page="about", label="About: Paragraph 1 (EN)"),
        models.SiteContent(key="about_text2_az", value="Missiyamız keyfiyyətli xidmət, şəffaf qiymətlər və sizin hesab edə biləcəyiniz daim genişlənən qarderob vasitəsilə etibar yaratmaqdır.", page="about", label="About: Paragraph 2 (AZ)"),
        models.SiteContent(key="about_text2_en", value="Our mission is to build trust through quality service, transparent pricing, and an ever-expanding wardrobe that you can call your own.", page="about", label="About: Paragraph 2 (EN)"),

        # Contact section
        models.SiteContent(key="contact_title_az", value="Özəl Libas Tövsiyəsi Alın", page="contact", label="Contact: Title (AZ)"),
        models.SiteContent(key="contact_title_en", value="Get a Custom Recommendation", page="contact", label="Contact: Title (EN)"),
        models.SiteContent(key="contact_subtitle_az", value="Növbəti tədbiriniz haqqında bizə bir az məlumat verin və biz sizə ən yaxşı libasları tövsiyə edək!", page="contact", label="Contact: Subtitle (AZ)"),
        models.SiteContent(key="contact_subtitle_en", value="Tell us a bit about your upcoming event, and we will recommend you the best dresses for it!", page="contact", label="Contact: Subtitle (EN)"),
        models.SiteContent(key="btn_send_az", value="Özəl Libas Seçimlərimi Əldə Edin", page="contact", label="Contact: Submit Button (AZ)"),
        models.SiteContent(key="btn_send_en", value="Get My Custom Dress Options", page="contact", label="Contact: Submit Button (EN)"),
        models.SiteContent(key="cta_caption_az", value="Biz adətən 5–6 saat ərzində fərdiləşdirilmiş libas seçimləri ilə cavab veririk.", page="contact", label="Contact: CTA Caption (AZ)"),
        models.SiteContent(key="cta_caption_en", value="We typically reply with personalized dress options within 5–6 hours.", page="contact", label="Contact: CTA Caption (EN)")
    ]
    db.add_all(default_content)

    db.commit()
    print("Database initialization and seeding completed successfully.")
except Exception as e:
    db.rollback()
    print(f"Error seeding database: {e}")
    raise
finally:
    db.close()
