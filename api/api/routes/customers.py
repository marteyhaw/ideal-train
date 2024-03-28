from uuid import UUID

import crud
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Customer])
def read_customers(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Get a list of customers.
    """
    return crud.get_customers(db, skip=skip, limit=limit)


@router.get("/{customer_id}", response_model=schemas.Customer)
def read_customer(customer_id: UUID, db: Session = Depends(get_db)):
    """
    Get a customer by their id.
    """
    db_customer = crud.get_customer_by_id(db, uuid=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return db_customer


@router.post("/", response_model=schemas.Customer)
def create_customer(
    customer: schemas.CustomerCreate, db: Session = Depends(get_db)
):
    """
    Create a customer.
    """
    db_customer = crud.get_customer_by_name(db, name=customer.name)
    if db_customer:
        raise HTTPException(
            status_code=400, detail="Customer already registered"
        )
    return crud.create_customer(db=db, customer=customer)
