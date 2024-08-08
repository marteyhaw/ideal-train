from datetime import datetime
from decimal import Decimal
from typing import Annotated
from uuid import UUID

from pydantic import BaseModel, Field


class CargoBase(BaseModel):
    quantity: int = Field(title="Number of cargo units", gt=0, le=999999999999)
    unit: str = Field(mtitle="Unit of measure", ax_length=20)
    description: str = Field(title="Description of cargo item", max_length=100)
    declared_value: Annotated[
        Decimal,
        Field(
            title="Declared value of cargo",
            max_digits=11,
            decimal_places=2,
            ge=0,
        ),
    ]
    length: (
        Annotated[
            Decimal,
            Field(
                title="Measured length of cargo",
                max_digits=12,
                decimal_places=6,
                ge=0,
            ),
        ]
        | None
    ) = None
    width: (
        Annotated[
            Decimal,
            Field(
                title="Measured width of cargo",
                max_digits=12,
                decimal_places=6,
                ge=0,
            ),
        ]
        | None
    ) = None
    height: (
        Annotated[
            Decimal,
            Field(
                title="Measured height of cargo",
                max_digits=12,
                decimal_places=6,
                ge=0,
            ),
        ]
        | None
    ) = None
    weight: (
        Annotated[
            Decimal,
            Field(
                title="Measured weight of cargo",
                max_digits=10,
                decimal_places=4,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_volume: (
        Annotated[
            Decimal,
            Field(
                title="Total volume of cargo",
                max_digits=12,
                decimal_places=6,
                ge=0,
            ),
        ]
        | None
    ) = None
    charge_type: str | None = Field(
        title="Charge cargo by volume, weight, or both",
        default=None,
        max_length=20,
    )
    volume_charge: (
        Annotated[
            Decimal,
            Field(
                title="Volume charge amount",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    weight_charge: (
        Annotated[
            Decimal,
            Field(
                title="Weight charge amount",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    additional_charge: (
        Annotated[
            Decimal,
            Field(
                title="Additional charge amount",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None


class CargoCreate(CargoBase):
    waybill_id: UUID | None = None


class CargoUpdate(CargoBase):
    id: UUID | None = None


class Cargo(CargoBase):
    id: UUID
    waybill_id: UUID | None

    class Config:
        from_attributes = True


class CarrierBase(BaseModel):
    name: str = Field(title="Name of Carrier", max_length=50)
    nickname: str | None = Field(
        title="Nickname of Carrier", default=None, max_length=20
    )
    address: str | None = Field(
        title="Complete address of Carrier", default=None, max_length=100
    )
    email: str | None = Field(
        title="Email address of Carrier", default=None, max_length=50
    )
    contact_no: str | None = Field(
        title="Contact Number of Carrier", default=None, max_length=20
    )
    notes: str | None = Field(
        title="Additional Notes", default=None, max_length=500
    )


class CarrierCreate(CarrierBase):
    pass


class Carrier(CarrierBase):
    id: UUID
    is_active: bool

    class Config:
        from_attributes = True


class ContainerizationBase(BaseModel):
    code: str = Field(title="", max_length=20)
    container_date: datetime


class ContainerizationCreate(ContainerizationBase):
    carrier_id: UUID


class ContainerizationUpdate(ContainerizationBase):
    carrier_id: UUID


class Containerization(ContainerizationBase):
    id: UUID

    class Config:
        from_attributes = True


class CustomerBase(BaseModel):
    name: str = Field(title="Name of Customer", max_length=50)
    nickname: str = Field(title="Nickname of Customer", max_length=20)
    address: str | None = Field(
        title="Street Address of Customer", default=None, max_length=100
    )
    city: str | None = Field(
        title="City of Customer", default=None, max_length=50
    )
    country: str | None = Field(
        title="Country of Customer", default=None, max_length=50
    )
    email: str | None = Field(
        title="Email address of Customer", default=None, max_length=50
    )
    contact_no: str | None = Field(
        title="Contact number of Customer", default=None, max_length=50
    )
    rate_volume_charge: (
        Annotated[
            Decimal,
            Field(
                title="Personalized volume rate for Customer",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    rate_weight_charge: (
        Annotated[
            Decimal,
            Field(
                title="Personalized weight rate for Customer",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    rate_value_charge: (
        Annotated[
            Decimal,
            Field(
                title="Personalized value charge for Customer",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    notes: str | None = Field(
        title="Additional notes", default=None, max_length=500
    )


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(CustomerBase):
    name: str | None = Field(
        title="Name of Customer", default=None, max_length=50
    )
    nickname: str = Field(title="Nickname of Customer", max_length=20)
    address: str | None = Field(
        title="Street Address of Customer", default=None, max_length=100
    )
    city: str | None = Field(
        title="City of Customer", default=None, max_length=50
    )
    country: str | None = Field(
        title="Country of Customer", default=None, max_length=50
    )
    email: str | None = Field(
        title="Email address of Customer", default=None, max_length=50
    )
    contact_no: str | None = Field(
        title="Contact number of Customer", default=None, max_length=50
    )
    rate_volume_charge: (
        Annotated[
            Decimal,
            Field(
                title="Personalized volume rate for Customer",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    rate_weight_charge: (
        Annotated[
            Decimal,
            Field(
                title="Personalized weight rate for Customer",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    rate_value_charge: (
        Annotated[
            Decimal,
            Field(
                title="Personalized value charge for Customer",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    notes: str | None = Field(
        title="Additional notes", default=None, max_length=500
    )
    is_active: bool = True


class Customer(CustomerBase):
    id: UUID
    is_active: bool

    class Config:
        from_attributes = True


class EmployeeBase(BaseModel):
    last_name: str = Field(title="Last name of Employee", max_length=30)
    first_name: str = Field(title="First name of Employee", max_length=50)
    middle_name: str | None = Field(
        title="Middle name of Employee", default=None, max_length=50
    )
    email: str = Field(title="Email address of Employee", max_length=80)
    local_office: str = Field(
        title="Assigned Branch of Employee", max_length=20
    )


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
    last_name: str = Field(
        title="Last name of Employee", default=None, max_length=30
    )
    first_name: str = Field(
        title="First name of Employee", default=None, max_length=50
    )
    middle_name: str | None = Field(
        title="Middle name of Employee", default=None, max_length=50
    )
    email: str = Field(
        title="Email address of Employee", default=None, max_length=80
    )
    local_office: str = Field(
        title="Assigned Branch of Employee", default=None, max_length=20
    )
    is_active: bool = True


class Employee(EmployeeBase):
    id: UUID
    is_active: bool

    class Config:
        from_attributes = True


class LocationBase(BaseModel):
    code: str = Field(title="Shortcode for Location", max_length=10)
    description: str = Field(
        title="Full Description of Location", max_length=50
    )


class LocationCreate(LocationBase):
    pass


class Location(LocationBase):
    pass


class ManifestBase(BaseModel):
    number: int = Field(title="Manifest Number", ge=0, lt=1000000000000)
    destination: str = Field(
        title="Destination of Manifested cargo", max_length=20
    )
    total_volume: (
        Annotated[
            Decimal,
            Field(
                title="Total Volume of Manifested cargo",
                max_digits=12,
                decimal_places=6,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_weight: (
        Annotated[
            Decimal,
            Field(
                title="Total Weight of Manifested cargo",
                max_digits=12,
                decimal_places=6,
                ge=0,
            ),
        ]
        | None
    ) = None
    created_date: datetime = Field(title="Date of Manifested cargo")
    notes: str | None = Field(
        title="Additional notes", default=None, max_length=500
    )
    encoded_on: datetime


class ManifestCreate(ManifestBase):
    checked_by_employee_id: UUID
    encoded_by_employee_id: UUID
    status_logs: list["ManifestStatusLog"] = []
    waybills: list[UUID] = []
    code: str | None = Field(
        title="Container Identifier", default=None, max_length=20
    )
    carrier_id: UUID | None
    container_date: datetime | None = Field(
        title="Containerization Date", default=None
    )


class ManifestUpdate(BaseModel):
    total_volume: (
        Annotated[
            Decimal,
            Field(
                title="Total Volume of Manifested cargo",
                max_digits=12,
                decimal_places=6,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_weight: (
        Annotated[
            Decimal,
            Field(
                title="Total Weight of Manifested cargo",
                max_digits=12,
                decimal_places=6,
                ge=0,
            ),
        ]
        | None
    ) = None
    waybills: list[UUID] = []
    code: str | None = Field(
        title="Container Identifier", default=None, max_length=20
    )
    carrier_id: UUID | None
    container_date: datetime | None = Field(
        title="Containerization Date", default=None
    )


class Manifest(ManifestBase):
    id: UUID
    checked_by: Employee = Field(
        title="Checker responsible for loading the Manifest"
    )
    encoded_by: Employee
    containerization: Containerization | None
    status_logs: list["ManifestStatusLog"] = []
    waybills: list["Waybill"] = []

    class Config:
        from_attributes = True


class ManifestStatusLogBase(BaseModel):
    status_current: str = Field(
        title="Status of the Manifested cargo", max_length=20
    )
    location: str = Field(
        title="Location of the Manifested cargo", max_length=50
    )
    notes: str | None = Field(
        title="Additional notes", default=None, max_length=20
    )


class ManifestStatusLogCreate(ManifestStatusLogBase):
    logged_by_employee_id: UUID
    manifest_id: UUID


class ManifestStatusLog(ManifestStatusLogBase):
    id: UUID
    logged_by: Employee
    manifest_id: UUID
    logged_on: datetime

    class Config:
        from_attributes = True


class WaybillBase(BaseModel):
    number: int = Field(title="Waybill Number", ge=0, lt=1000000000000)
    destination: str = Field(title="Destination of Waybill", max_length=20)
    origin_address: str | None = Field(
        title="Address of Shipper", default=None, max_length=100
    )
    destination_address: str | None = Field(
        title="Address of Consignee", default=None, max_length=100
    )
    created_date: datetime = Field(title="Date of Waybill")
    total_amount: Annotated[
        Decimal,
        Field(
            title="Total Freight Cost Amount by Volume",
            max_digits=11,
            decimal_places=2,
            ge=0,
        ),
    ]
    total_weight_charge: (
        Annotated[
            Decimal,
            Field(
                title="Total Freight Cost Amount by Weight",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_value_charge: (
        Annotated[
            Decimal,
            Field(
                title="Total of Value Charge",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_cu_msmt_charge: (
        Annotated[
            Decimal,
            Field(
                title="Total of Customer Measurement Charge",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_delivery_charge: (
        Annotated[
            Decimal,
            Field(
                title="Total of Delivery Charge",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_vat: (
        Annotated[
            Decimal,
            Field(
                title="Total VAT Amount", max_digits=11, decimal_places=2, ge=0
            ),
        ]
        | None
    ) = None
    payment_terms: str = Field(title="Payment Terms of Waybill")
    notes: str | None = Field(
        title="Additional notes", default=None, max_length=500
    )
    received_at: str = Field(title="Receiving station", max_length=20)
    encoded_on: datetime


class WaybillCreate(WaybillBase):
    shipper_id: UUID
    consignee_id: UUID
    received_by_employee_id: UUID
    encoded_by_employee_id: UUID
    cargos: list[CargoCreate] = []
    manifest_id: None


class WaybillUpdate(BaseModel):
    shipper_id: UUID
    consignee_id: UUID
    origin_address: str | None = Field(
        title="Address of Shipper", default=None, max_length=100
    )
    destination_address: str | None = Field(
        title="Address of Consignee", default=None, max_length=100
    )
    total_amount: Annotated[
        Decimal,
        Field(
            title="Total Freight Cost Amount by Volume",
            max_digits=11,
            decimal_places=2,
            ge=0,
        ),
    ]
    total_weight_charge: (
        Annotated[
            Decimal,
            Field(
                title="Total Freight Cost Amount by Weight",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_value_charge: (
        Annotated[
            Decimal,
            Field(
                title="Total of Value Charge",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_cu_msmt_charge: (
        Annotated[
            Decimal,
            Field(
                title="Total of Customer Measurement Charge",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_delivery_charge: (
        Annotated[
            Decimal,
            Field(
                title="Total of Delivery Charge",
                max_digits=11,
                decimal_places=2,
                ge=0,
            ),
        ]
        | None
    ) = None
    total_vat: (
        Annotated[
            Decimal,
            Field(
                title="Total VAT Amount", max_digits=11, decimal_places=2, ge=0
            ),
        ]
        | None
    ) = None
    payment_terms: str = Field(title="Payment Terms of Waybill")
    notes: str | None = Field(
        title="Additional notes", default=None, max_length=500
    )
    cargos: list[CargoUpdate] = []


class Waybill(WaybillBase):
    id: UUID
    cargos: list[Cargo] = []
    shipper: Customer = Field(title="Shipper of Waybill")
    consignee: Customer = Field(title="Consignee of Waybill")
    received_by: Employee
    encoded_by: Employee
    status_logs: list["WaybillStatusLog"] = []
    manifest_id: UUID | None

    class Config:
        from_attributes = True


class WaybillStatusLogBase(BaseModel):
    status_current: str = Field(title="Status of Waybill", max_length=20)
    location: str = Field(title="Location of Waybill", max_length=20)
    notes: str | None = Field(title="Additional", default=None, max_length=20)


class WaybillStatusLogCreate(WaybillStatusLogBase):
    logged_by_employee_id: UUID
    waybill_id: UUID


class WaybillStatusLog(WaybillStatusLogBase):
    id: UUID
    logged_by: Employee
    waybill_id: UUID
    logged_on: datetime

    class Config:
        from_attributes = True


class HttpMessage(BaseModel):
    detail: str
