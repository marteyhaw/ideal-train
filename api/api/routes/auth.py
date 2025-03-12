from datetime import timedelta

import models
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from security import create_access_token, verify_password
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.post("/login")
def login_for_access_token(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Authenticate user and return a JWT access token in a secure cookie.
    """
    user = (
        db.query(models.User)
        .filter(models.User.username == form_data.username)
        .first()
    )
    if not user or not verify_password(
        form_data.password, user.hashed_password
    ):
        raise HTTPException(
            status_code=400, detail="Incorrect username or password"
        )

    access_token_expires = timedelta(minutes=60)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=3600,
    )

    return {"message": "Login successful"}


@router.post("/logout")
def logout(response: Response):
    """
    Logs out the user by clearing the authentication cookie.
    """
    response.delete_cookie("token")
    return {"message": "Logged out successfully"}
