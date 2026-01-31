import cloudinary.uploader
from fastapi import UploadFile

async def upload_product_image(file: UploadFile):
    result = cloudinary.uploader.upload(
        file.file,
        folder="ecommerce/products",
        transformation=[
            {"width": 800, "height": 800, "crop": "fill"},
            {"quality": "auto"},
            {"fetch_format": "auto"}
        ]
    )
    return result["secure_url"]
