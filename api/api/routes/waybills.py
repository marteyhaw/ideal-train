from uuid import UUID

import crud
import models
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, aliased

from api.deps import get_db

router = APIRouter()


@router.get("/filter_search", response_model=list[schemas.Waybill])
def filter_search_waybills(
    number: int = 0,
    shipper_name: str = "",
    consignee_name: str = "",
    destination: str = "",
    created_date: str = "",
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get a list of waybills by combo searching the following fields:

    - number
    - shipper name/nickname
    - consignee name/nickname
    - destination.description
    - created date
    """
    select_table = models.Waybill
    joins = [
        (aliased(models.Customer), select_table.shipper),
        (aliased(models.Customer), select_table.consignee),
    ]
    search_filters = [
        (select_table, "number", number),
        ((select_table.shipper, models.Customer), "name", shipper_name),
        ((select_table.shipper, models.Customer), "nickname", shipper_name),
        ((select_table.consignee, models.Customer), "name", consignee_name),
        (
            (select_table.consignee, models.Customer),
            "nickname",
            consignee_name,
        ),
        (select_table, "destination", destination),
        (select_table, "created_date", created_date),
    ]

    return crud.get_waybills_by_filter_search(
        db=db,
        select_table=select_table,
        search_filters=search_filters,
        joins=joins,
        skip=skip,
        limit=limit,
    )


@router.get("/loose_search", response_model=list[schemas.Waybill])
def loose_search_waybills(
    search_term: str = "",
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get a list of waybills using one phrase by searching the following fields:

    - number
    - shipper name/nickname
    - consignee name/nickname
    - destination
    - created date
    """
    select_table = models.Waybill
    joins = [
        (aliased(models.Customer), select_table.shipper),
        (aliased(models.Customer), select_table.consignee),
    ]
    search_filters = [
        (select_table, "number", search_term),
        ((select_table.shipper, models.Customer), "name", search_term),
        ((select_table.shipper, models.Customer), "nickname", search_term),
        ((select_table.consignee, models.Customer), "name", search_term),
        (
            (select_table.consignee, models.Customer),
            "nickname",
            search_term,
        ),
        (select_table, "destination", search_term),
        (select_table, "created_date", search_term),
    ]

    return crud.get_waybills_by_loose_search(
        db=db,
        select_table=select_table,
        search_filters=search_filters,
        joins=joins,
        skip=skip,
        limit=limit,
    )


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
async def create_waybill(
    waybill: schemas.WaybillCreate, db: Session = Depends(get_db)
):
    """
    Create a waybill.
    """
    db_existing_waybill = crud.get_waybill_by_number(
        db, waybill_number=waybill.number
    )
    if db_existing_waybill:
        raise HTTPException(
            status_code=400,
            detail="There is an existing waybill with that number",
        )
    db_shipper = crud.get_customer_by_id(db, uuid=waybill.shipper_id)
    if not db_shipper:
        raise HTTPException(status_code=400, detail="Invalid shipper")
    db_consignee = crud.get_customer_by_id(db, uuid=waybill.consignee_id)
    if not db_consignee:
        raise HTTPException(status_code=400, detail="Invalid consignee")
    db_receiver = crud.get_employee_by_id(
        db, uuid=waybill.received_by_employee_id
    )
    if not db_receiver:
        raise HTTPException(status_code=400, detail="Invalid receiver")
    db_encoder = crud.get_employee_by_id(
        db, uuid=waybill.encoded_by_employee_id
    )
    if not db_encoder:
        raise HTTPException(status_code=400, detail="Invalid encoder")
    db_waybill = await crud.create_waybill(db, waybill=waybill)

    return db_waybill


@router.post("/update_status")
async def update_waybill_status(
    waybill_status_log: schemas.WaybillStatusLogCreate,
    db: Session = Depends(get_db),
):
    """
    Update a waybill's status.
    """
    db_waybill = crud.get_waybill_by_id(db, uuid=waybill_status_log.waybill_id)
    if not db_waybill:
        raise HTTPException(status_code=400, detail="Invalid waybill")
    db_encoder = crud.get_employee_by_id(
        db, uuid=waybill_status_log.logged_by_employee_id
    )
    if not db_encoder:
        raise HTTPException(status_code=400, detail="Invalid encoder")
    httpmessage = await crud.create_waybill_status_log(db, waybill_status_log)
    if not httpmessage:
        raise HTTPException(status_code=400, detail="DB error")

    return httpmessage
