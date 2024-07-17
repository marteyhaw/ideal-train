from uuid import UUID

import crud
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Cargo])
def read_cargos(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Get a list of cargos.
    """
    return crud.get_cargos(db, skip=skip, limit=limit)


@router.patch("/{cargo_id}", response_model=schemas.Cargo)
def update_cargo(
    cargo_id: UUID,
    cargo_update: schemas.CargoUpdate,
    db: Session = Depends(get_db),
):
    """
    Update a cargo.
    """
    update_data = cargo_update.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="Bad request")
    updated_cargo = crud.update_cargo(db, cargo_id, update_data)
    if updated_cargo is None:
        raise HTTPException(status_code=404, detail="Cargo not found")

    return updated_cargo
