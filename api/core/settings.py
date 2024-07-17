from typing import Annotated

from pydantic import AfterValidator, HttpUrl, validator
from pydantic_settings import BaseSettings

# Pydantic v2's HTTPUrl appends trailing slash to naked hostname
# which leads to potential CORS errors
CORSHttpUrlString = Annotated[
    HttpUrl, AfterValidator(lambda v: str(v).rstrip("/"))
]


class Settings(BaseSettings):
    PROJECT_NAME: str = "Awesome API"
    SIGNING_KEY: str
    BACKEND_CORS_ORIGINS: list[CORSHttpUrlString] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str] | str:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    DATABASE_URI: str
