import database
import models

db = database.SessionLocal()

updates = {
    "contact_title_az": ("Özəl Libas Tövsiyəsi Alın", "contact", "Contact: Title (AZ)"),
    "contact_title_en": ("Get a Custom Recommendation", "contact", "Contact: Title (EN)"),
    "contact_subtitle_az": ("Növbəti tədbiriniz haqqında bizə bir az məlumat verin və biz sizə ən yaxşı libasları tövsiyə edək!", "contact", "Contact: Subtitle (AZ)"),
    "contact_subtitle_en": ("Tell us a bit about your upcoming event, and we will recommend you the best dresses for it!", "contact", "Contact: Subtitle (EN)"),
    "btn_send_az": ("Özəl Libas Seçimlərimi Əldə Edin", "contact", "Contact: Submit Button (AZ)"),
    "btn_send_en": ("Get My Custom Dress Options", "contact", "Contact: Submit Button (EN)"),
    "cta_caption_az": ("Biz adətən 5–6 saat ərzində fərdiləşdirilmiş libas seçimləri ilə cavab veririk.", "contact", "Contact: CTA Caption (AZ)"),
    "cta_caption_en": ("We typically reply with personalized dress options within 5–6 hours.", "contact", "Contact: CTA Caption (EN)")
}

try:
    for key, (value, page, label) in updates.items():
        item = db.query(models.SiteContent).filter(models.SiteContent.key == key).first()
        if item:
            item.value = value
            item.page = page
            item.label = label
            print(f"Updated: {key}")
        else:
            item = models.SiteContent(key=key, value=value, page=page, label=label)
            db.add(item)
            print(f"Inserted: {key}")
    db.commit()
    print("Database updates committed successfully.")
except Exception as e:
    db.rollback()
    print(f"Error updating database: {e}")
    raise
finally:
    db.close()
