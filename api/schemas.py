from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class CustomerBase(BaseModel):
    name: str
    nickname: str
    address: str | None = None
    city: str | None = None
    country: str | None = None
    email: str | None = None
    contact_no: str | None = None
    rate_volume_charge: float | None = None
    rate_weigh_charge: float | None = None
    rate_value_charge: float | None = None
    notes: str | None = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(CustomerBase):
    name: str | None = None
    nickname: str | None = None
    address: str | None = None
    city: str | None = None
    country: str | None = None
    email: str | None = None
    contact_no: str | None = None
    rate_volume_charge: float | None = None
    rate_weigh_charge: float | None = None
    rate_value_charge: float | None = None
    notes: str | None = None
    is_active: bool = True


class Customer(CustomerBase):
    id: UUID
    is_active: bool


class WaybillBase(BaseModel):
    number: int
    destination: str
    waybill_date: datetime
    total_amount: float
    total_weight_charge: float | None = None
    total_value_charge: float | None = None
    total_cu_msmt_charge: float | None = None
    total_delivery_charge: float | None = None
    total_vat: float | None = None
    payment_terms: str
    notes: str | None = None
    received_by: str
    received_at: str
    encoded_by: str
    encoded_on: datetime


class WaybillCreate(WaybillBase):
    shipper_id: UUID
    consignee_id: UUID


class Waybill(WaybillBase):
    id: UUID
    shipper: Customer
    consignee: Customer

    class Config:
        from_attributes = True
