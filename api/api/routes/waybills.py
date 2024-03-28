from uuid import UUID

import crud
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Waybill])
def read_waybills(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Get a list of waybills.
    """
    return crud.get_waybills(db, skip=skip, limit=limit)


@router.get("/{waybill_id}", response_model=schemas.Waybill)
def read_waybill(waybill_id: UUID, db: Session = Depends(get_db)):
    """
    Get a waybill by its id.
    """
    db_waybill = crud.get_waybill_by_id(db, uuid=waybill_id)
    if db_waybill is None:
        raise HTTPException(status_code=404, detail="Waybill not found")
    return db_waybill


@router.post("/", response_model=schemas.Waybill)
def create_waybill(
    waybill: schemas.WaybillCreate, db: Session = Depends(get_db)
):
    """
    Create a waybill.
    """
    db_shipper = crud.get_customer_by_id(db, uuid=waybill.shipper_id)
    if not db_shipper:
        raise HTTPException(status_code=400, detail="Invalid shipper")
    db_consignee = crud.get_customer_by_id(db, uuid=waybill.consignee_id)
    if not db_consignee:
        raise HTTPException(status_code=400, detail="Invalid consignee")
    return crud.create_waybill(db=db, waybill=waybill)
