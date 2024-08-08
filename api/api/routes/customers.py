from uuid import UUID

import crud
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.get("/filter_search", response_model=list[schemas.Customer])
def filter_search_customers(
    name: str = "",
    nickname: str = "",
    city: str = "",
    email: str = "",
    contact_no: str = "",
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get a list of customers by combo searching the following fields:

    - name
    - nickname
    - city
    - email
    - contact_no
    """
    search_filters = [
        ("name", name),
        ("nickname", nickname),
        ("city", city),
        ("email", email),
        ("contact_no", contact_no),
    ]

    return crud.get_customers_by_filter_search(
        db=db,
        search_filters=search_filters,
        skip=skip,
        limit=limit,
    )


@router.get("/loose_search", response_model=list[schemas.Customer])
def loose_search_customers(
    search_term: str = "",
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Get a list of customers using one phrase by searching the following fields:

    - name
    - nickname
    - city
    - email
    - contact_no
    """
    search_filters = [
        ("name", search_term),
        ("nickname", search_term),
        ("city", search_term),
        ("email", search_term),
        ("contact_no", search_term),
    ]

    return crud.get_customers_by_loose_search(
        db=db,
        search_filters=search_filters,
        skip=skip,
        limit=limit,
    )


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


@router.patch("/{customer_id}", response_model=schemas.Customer)
def update_customer(
    customer_id: UUID,
    customer_update: schemas.CustomerUpdate,
    db: Session = Depends(get_db),
):
    """
    Update a customer.
    """
    db_customer = crud.get_customer_by_id(db, uuid=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    update_data = customer_update.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="Bad request")
    updated_customer = crud.update_customer(db, customer_id, update_data)

    return updated_customer
