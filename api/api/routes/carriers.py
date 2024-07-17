from uuid import UUID

import crud
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Carrier])
def read_carriers(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Get a list of carriers.
    """
    return crud.get_carriers(db, skip=skip, limit=limit)


@router.get("/{carrier_id}", response_model=schemas.Carrier)
def read_carrier(carrier_id: UUID, db: Session = Depends(get_db)):
    """
    Get a carrier by its id.
    """
    db_carrier = crud.get_carrier_by_id(db, uuid=carrier_id)
    if db_carrier is None:
        raise HTTPException(status_code=404, detail="Carrier not found")

    return db_carrier


@router.post("/", response_model=schemas.Carrier)
def create_carrier(
    carrier: schemas.CarrierCreate, db: Session = Depends(get_db)
):
    """
    Create a carrier.
    """
    db_carrier = crud.get_carrier_by_name(db, name=carrier.name)
    if db_carrier:
        raise HTTPException(
            status_code=400, detail="Carrier already registered"
        )

    return crud.create_carrier(db=db, carrier=carrier)
