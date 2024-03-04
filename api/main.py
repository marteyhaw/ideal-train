from functools import lru_cache

from core.settings import Settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@lru_cache
def get_settings():
    return Settings()


description = """
Seasons Logistics API helps you do manage cargo logistics. 🚀

## Items

You can **read items**.

## Users

You will be able to:

* **Create users** (_not implemented_).
* **Read users** (_not implemented_).
"""

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=description,
    summary="Seasons Logistics REST API",
    version="0.0.1",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Martey Haw",
        "url": "https://github.com/marteyhaw",
        "email": "martey.haw@gmail.com",
    },
    license_info={
        "name": "MIT License",
        "identifier": "MIT",
    },
    openapi_url="/api/v1/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def hello_world():
    return {"message": "Hello World! 👋🎉🚀"}
