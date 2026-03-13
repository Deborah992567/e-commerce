import cloudinary.uploader
from fastapi import UploadFile

async def upload_product_image(file_content: bytes, filename: str):
    result = cloudinary.uploader.upload(
        file_content,
        folder="ecommerce/products",
        public_id=filename,
        transformation=[
            {"width": 800, "height": 800, "crop": "fill"},
            {"quality": "auto"},
            {"fetch_format": "auto"}
        ]
    )
    return result["secure_url"]
