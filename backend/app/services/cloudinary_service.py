import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)


def upload_image(file):
    result = cloudinary.uploader.upload(
        file,
        folder="ecommerce",
        transformation=[
            {"width": 800, "height": 800, "crop": "fit"}
        ]
    )
    return result["secure_url"]
