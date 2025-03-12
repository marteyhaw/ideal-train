from uuid import UUID

import crud
import models
import schemas
from fastapi import APIRouter, Depends, HTTPException
from security import require_roles
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.post("/register", response_model=schemas.User)
def register_user(
    user_data: schemas.UserCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(require_roles(["admin"])),
):

    employee = (
        db.query(models.Employee)
        .filter(models.Employee.id == user_data.employee_id)
        .first()
    )
    if not employee:
        raise HTTPException(status_code=400, detail="Employee not found")

    existing_user = (
        db.query(models.User)
        .filter(models.User.employee_id == user_data.employee_id)
        .first()
    )
    if existing_user:
        raise HTTPException(
            status_code=400, detail="User already exists for this employee"
        )

    new_user = models.User(
        username=user_data.username,
        email=user_data.email,
        employee_id=employee.id,
    )
    new_user.set_password(user_data.password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.patch("/{user_id}/roles", response_model=schemas.User)
def update_user_roles(
    user_id: UUID,
    new_roles: schemas.RolesUpdate,
    db: Session = Depends(get_db),
    user: models.User = Depends(require_roles(["admin"])),
):
    """
    Update a user's roles (Admin-only).
    """
    user = crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = crud.update_user_roles(db, user_id, new_roles.roles)

    return updated_user
