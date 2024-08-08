import crud
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Location])
def read_locations(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Get a list of locations.
    """
    return crud.get_locations(db, skip=skip, limit=limit)


@router.get("/{code}", response_model=schemas.Location)
def read_location(code: str, db: Session = Depends(get_db)):
    """
    Get a location by its code.
    """
    db_location = crud.get_location_by_code(db, code=code)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location


@router.post("/", response_model=schemas.Location)
def create_location(location: schemas.Location, db: Session = Depends(get_db)):
    """
    Create a location.
    """
    db_location = crud.get_location_by_code(db, code=location.code)
    if db_location:
        raise HTTPException(
            status_code=400, detail="Location already registered"
        )

    return crud.create_location(db=db, location=location)
