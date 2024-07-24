import crud
import schemas
from fastapi import APIRouter, Depends
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
