import datetime
import uuid

from core.database import Base
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Numeric,
    String,
    types,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func


class Cargo(Base):
    __tablename__ = "cargos"

    id: Mapped[uuid.UUID] = mapped_column(
        types.Uuid, primary_key=True, default=uuid.uuid4
    )
    quantity: Mapped[int] = Column(Numeric(12))
    unit: Mapped[str] = Column(String(20))
    description: Mapped[str] = Column(String(100))
    declared_value: Mapped[float] = mapped_column(Numeric(11, 2))
    length: Mapped[float | None] = mapped_column(Numeric(12, 6))
    width: Mapped[float | None] = mapped_column(Numeric(12, 6))
    height: Mapped[float | None] = mapped_column(Numeric(12, 6))
    weight: Mapped[float | None] = mapped_column(Numeric(10, 4))
    total_volume: Mapped[float | None] = mapped_column(Numeric(12, 6))
    charge_type: Mapped[str | None] = Column(String(20))
    volume_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    weight_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    additional_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    waybill_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("waybills.id")
    )
    waybill: Mapped["Waybill"] = relationship(
        back_populates="cargos", foreign_keys=waybill_id
    )


class Carrier(Base):
    __tablename__ = "carriers"

    id: Mapped[uuid.UUID] = mapped_column(
        types.Uuid, primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = Column(String(50), unique=True)
    nickname: Mapped[str | None] = Column(String(20))
    address: Mapped[str | None] = Column(String(100))
    email: Mapped[str | None] = mapped_column(String(50), index=True)
    contact_no: Mapped[str | None] = Column(String(20))
    notes: Mapped[str | None] = Column(String(500))
    is_active: Mapped[bool | None] = mapped_column(Boolean, default=True)
    containerizations: Mapped[list["Containerization"]] = relationship(
        back_populates="carrier", foreign_keys="Containerization.carrier_id"
    )


class Containerization(Base):
    __tablename__ = "containerizations"

    id: Mapped[uuid.UUID] = mapped_column(
        types.Uuid, primary_key=True, default=uuid.uuid4
    )
    code: Mapped[str] = Column(String(20))
    container_date: Mapped[datetime.datetime] = Column(
        DateTime(timezone=True), index=True
    )
    manifests: Mapped[list["Manifest"]] = relationship(
        back_populates="containerization",
        foreign_keys="Manifest.container_id",
    )
    carrier_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("carriers.id"))
    carrier: Mapped["Carrier"] = relationship(
        back_populates="containerizations", foreign_keys=carrier_id
    )


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[uuid.UUID] = mapped_column(
        types.Uuid, primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    nickname: Mapped[str | None] = mapped_column(
        String(20), unique=True, index=True
    )
    address: Mapped[str | None] = mapped_column(String(100), index=True)
    city: Mapped[str | None] = mapped_column(String(50), index=True)
    country: Mapped[str | None] = mapped_column(String(50), index=True)
    email: Mapped[str | None] = mapped_column(String(50), index=True)
    contact_no: Mapped[str | None] = mapped_column(String(50), index=True)
    rate_volume_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    rate_weight_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    rate_value_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    notes: Mapped[str | None] = mapped_column(String(500))
    is_active: Mapped[bool | None] = mapped_column(Boolean, default=True)
    waybill_shipper: Mapped[list["Waybill"]] = relationship(
        back_populates="shipper", foreign_keys="Waybill.shipper_id"
    )
    waybill_consignee: Mapped[list["Waybill"]] = relationship(
        back_populates="consignee", foreign_keys="Waybill.consignee_id"
    )


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[uuid.UUID] = mapped_column(
        types.Uuid, primary_key=True, default=uuid.uuid4
    )
    last_name: Mapped[str] = Column(String(30), index=True)
    first_name: Mapped[str] = Column(String(50))
    middle_name: Mapped[str | None] = Column(String(50))
    email: Mapped[str] = mapped_column(String(80))
    local_office: Mapped[str] = Column(String(20))
    is_active: Mapped[bool | None] = mapped_column(Boolean, default=True)
    manifests_checked: Mapped[list["Manifest"]] = relationship(
        back_populates="checked_by",
        foreign_keys="Manifest.checked_by_employee_id",
    )
    manifests_encoded: Mapped[list["Manifest"]] = relationship(
        back_populates="encoded_by",
        foreign_keys="Manifest.encoded_by_employee_id",
    )
    manifest_status_logs_logged: Mapped[list["ManifestStatusLog"]] = (
        relationship(
            back_populates="logged_by",
            foreign_keys="ManifestStatusLog.logged_by_employee_id",
        )
    )
    waybills_received: Mapped[list["Waybill"]] = relationship(
        back_populates="received_by",
        foreign_keys="Waybill.received_by_employee_id",
    )
    waybills_encoded: Mapped[list["Waybill"]] = relationship(
        back_populates="encoded_by",
        foreign_keys="Waybill.encoded_by_employee_id",
    )
    waybill_status_logs_logged: Mapped[list["WaybillStatusLog"]] = (
        relationship(
            back_populates="logged_by",
            foreign_keys="WaybillStatusLog.logged_by_employee_id",
        )
    )


class Location(Base):
    __tablename__ = "locations"

    code: Mapped[str] = Column(String(10), primary_key=True)
    description: Mapped[str] = Column(String(50))


class Manifest(Base):
    __tablename__ = "manifests"

    id: Mapped[uuid.UUID] = mapped_column(
        types.Uuid, primary_key=True, default=uuid.uuid4
    )
    number: Mapped[int] = Column(Numeric(12), unique=True)
    destination: Mapped[str] = Column(String(20))
    total_volume: Mapped[float | None] = mapped_column(Numeric(12, 6))
    total_weight: Mapped[float | None] = mapped_column(Numeric(12, 6))
    created_date: Mapped[datetime.datetime] = Column(
        DateTime(timezone=True), index=True
    )
    notes: Mapped[str | None] = Column(String(500))
    encoded_on: Mapped[datetime.datetime] = Column(
        DateTime(timezone=True), default=func.now()
    )
    checked_by_employee_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("employees.id")
    )
    checked_by: Mapped["Employee"] = relationship(
        back_populates="manifests_checked", foreign_keys=checked_by_employee_id
    )
    encoded_by_employee_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("employees.id")
    )
    encoded_by: Mapped["Employee"] = relationship(
        back_populates="manifests_encoded", foreign_keys=encoded_by_employee_id
    )
    container_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("containerizations.id")
    )
    containerization: Mapped[Containerization | None] = relationship(
        back_populates="manifests", foreign_keys=container_id
    )
    status_logs: Mapped[list["ManifestStatusLog"]] = relationship(
        back_populates="manifest", foreign_keys="ManifestStatusLog.manifest_id"
    )
    waybills: Mapped[list["Waybill"]] = relationship(
        back_populates="manifest", foreign_keys="Waybill.manifest_id"
    )


class ManifestStatusLog(Base):
    __tablename__ = "manifest_status_logs"

    id: Mapped[uuid.UUID] = mapped_column(
        types.Uuid, primary_key=True, default=uuid.uuid4
    )
    status_current: Mapped[str] = Column(String(20))
    location: Mapped[str] = Column(String(50))
    logged_by_employee_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("employees.id")
    )
    logged_by: Mapped["Employee"] = relationship(
        back_populates="manifest_status_logs_logged",
        foreign_keys=logged_by_employee_id,
    )
    logged_on: Mapped[datetime.datetime] = Column(
        DateTime(timezone=True), default=func.now()
    )
    manifest_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("manifests.id"))
    manifest: Mapped["Manifest"] = relationship(
        back_populates="status_logs", foreign_keys=manifest_id
    )
    notes: Mapped[str | None] = Column(String(500))


class Waybill(Base):
    __tablename__ = "waybills"

    id: Mapped[uuid.UUID] = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    number: Mapped[int] = Column(Numeric(12), unique=True)
    destination: Mapped[str] = Column(String(20), index=True)
    origin_address: Mapped[str | None] = Column(String(100))
    destination_address: Mapped[str | None] = Column(String(100))
    created_date: Mapped[datetime.datetime] = Column(
        DateTime(timezone=True), index=True
    )
    total_amount: Mapped[float | None] = Column(Numeric(11, 2))
    total_weight_charge: Mapped[float | None] = Column(Numeric(11, 2))
    total_value_charge: Mapped[float | None] = Column(Numeric(11, 2))
    total_cu_msmt_charge: Mapped[float | None] = Column(Numeric(11, 2))
    total_delivery_charge: Mapped[float | None] = Column(Numeric(11, 2))
    total_vat: Mapped[float | None] = Column(Numeric(11, 2))
    payment_terms: Mapped[str | None] = Column(String(20))
    notes: Mapped[str | None] = Column(String(500))
    received_at: Mapped[str] = Column(String(20))

    received_by_employee_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("employees.id")
    )
    received_by: Mapped["Employee"] = relationship(
        back_populates="waybills_received",
        foreign_keys=received_by_employee_id,
    )
    encoded_by_employee_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("employees.id")
    )
    encoded_by: Mapped["Employee"] = relationship(
        back_populates="waybills_encoded", foreign_keys=encoded_by_employee_id
    )
    encoded_on: Mapped[datetime.datetime] = Column(
        DateTime(timezone=True), default=func.now()
    )
    cargos: Mapped[list["Cargo"]] = relationship(
        back_populates="waybill", foreign_keys="Cargo.waybill_id"
    )
    status_logs: Mapped[list["WaybillStatusLog"]] = relationship(
        back_populates="waybill", foreign_keys="WaybillStatusLog.waybill_id"
    )
    shipper_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("customers.id"))
    shipper: Mapped["Customer"] = relationship(
        back_populates="waybill_shipper", foreign_keys=shipper_id
    )
    consignee_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("customers.id"))
    consignee: Mapped["Customer"] = relationship(
        back_populates="waybill_consignee", foreign_keys=consignee_id
    )
    manifest_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("manifests.id")
    )
    manifest: Mapped["Manifest"] = relationship(
        back_populates="waybills", foreign_keys=manifest_id
    )


class WaybillStatusLog(Base):
    __tablename__ = "waybill_status_logs"

    id: Mapped[uuid.UUID] = mapped_column(
        types.Uuid, primary_key=True, default=uuid.uuid4
    )
    status_current: Mapped[str] = Column(String(20))
    location: Mapped[str] = Column(String(20))
    logged_by_employee_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("employees.id")
    )
    logged_by: Mapped["Employee"] = relationship(
        back_populates="waybill_status_logs_logged",
        foreign_keys=logged_by_employee_id,
    )
    logged_on: Mapped[datetime.datetime] = Column(
        DateTime(timezone=True), default=func.now()
    )
    waybill_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("waybills.id"))
    waybill: Mapped["Waybill"] = relationship(
        back_populates="status_logs", foreign_keys=waybill_id
    )
    notes: Mapped[str | None] = Column(String(500))
