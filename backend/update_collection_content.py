import database
import models

db = database.SessionLocal()

updates = {
    "coll_title_az": ("Kolleksiyamız", "collection", "Collection: Title (AZ)"),
    "coll_subtitle_az": ("Həm də sizin", "collection", "Collection: Subtitle (AZ)"),
    "coll_subtitle_en": ("Also yours", "collection", "Collection: Subtitle (EN)"),
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
    print("Collection copy updates committed successfully.")
except Exception as e:
    db.rollback()
    print(f"Error updating database: {e}")
    raise
finally:
    db.close()
