from uuid import UUID

import schemas
from models import Customer, Waybill
from sqlalchemy.orm import Session


def get_customer_by_name(db: Session, name: str) -> Customer | None:
    db_customer = db.query(Customer).filter(Customer.name == name).first()
    if not db_customer:
        return None
    return db_customer


def get_customer_by_id(db: Session, uuid: UUID) -> Customer | None:
    return db.query(Customer).filter(Customer.id == uuid).first()


def get_customers(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Customer]:
    return db.query(Customer).offset(skip).limit(limit).all()


def create_customer(db: Session, customer: schemas.CustomerCreate) -> Customer:
    db_customer = Customer(**customer.model_dump())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


def update_customer(
    db: Session,
    uuid: UUID,
    customer_update_data: schemas.CustomerUpdate,
) -> Customer:
    db_customer = db.query(Customer).filter(Customer.id == uuid)
    db_customer.first()
    if db_customer is None:
        return None
    db_customer.update(
        customer_update_data,
        synchronize_session=False,
    )
    db.commit()
    updated_customer = db_customer.first()
    return updated_customer


def get_waybill_by_id(db: Session, uuid: UUID) -> Waybill | None:
    return db.query(Waybill).filter(Waybill.id == uuid).first()


def get_waybills(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Waybill]:
    return db.query(Waybill).offset(skip).limit(limit).all()


def create_waybill(
    db: Session,
    waybill: schemas.WaybillCreate,
) -> Waybill:
    db_waybill = Waybill(**waybill.model_dump())
    db.add(db_waybill)
    db.commit()
    db.refresh(db_waybill)
    return db_waybill
