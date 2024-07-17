from functools import lru_cache

from core.settings import Settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.main import api_router


@lru_cache
def get_settings():
    return Settings()


description = """
Seasons Logistics API helps you manage cargo logistics. 🚀

## Waybills

You can **read waybills**.

## Customers

You will be able to:

* **Create customers**
* **Read customers**

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

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def hello_world():
    return {"message": "Hello World! 👋🎉🚀"}
