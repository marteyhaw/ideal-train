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
    email: Mapped[str | None] = mapped_column(
        String(50), unique=True, index=True
    )
    contact_no: Mapped[str | None] = mapped_column(String(50), index=True)
    rate_volume_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    rate_weigh_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    rate_value_charge: Mapped[float | None] = mapped_column(Numeric(11, 2))
    notes: Mapped[str | None] = mapped_column(String(500))
    is_active: Mapped[bool | None] = mapped_column(Boolean, default=True)

    waybill_shipper: Mapped[list["Waybill"]] = relationship(
        back_populates="shipper", foreign_keys="Waybill.shipper_id"
    )
    waybill_consignee: Mapped[list["Waybill"]] = relationship(
        back_populates="consignee", foreign_keys="Waybill.consignee_id"
    )


class Waybill(Base):
    __tablename__ = "waybills"

    id: Mapped[uuid.UUID] = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    number: Mapped[int] = Column(Numeric(12), unique=True)
    destination: Mapped[str] = Column(String(20), index=True)
    waybill_date: Mapped[datetime.datetime] = Column(DateTime, index=True)
    total_amount: Mapped[float] = Column(Numeric(11, 2))
    total_weight_charge: Mapped[float | None] = Column(Numeric(11, 2))
    total_value_charge: Mapped[float | None] = Column(Numeric(11, 2))
    total_cu_msmt_charge: Mapped[float | None] = Column(Numeric(11, 2))
    total_delivery_charge: Mapped[float | None] = Column(Numeric(11, 2))
    total_vat: Mapped[float | None] = Column(Numeric(11, 2))
    payment_terms: Mapped[str | None] = Column(String(20))
    notes: Mapped[str | None] = Column(String(500))
    received_by: Mapped[str] = Column(String(20))
    received_at: Mapped[str] = Column(String(20))
    encoded_by: Mapped[str] = Column(String(20))
    encoded_on: Mapped[datetime.datetime] = Column(
        DateTime, server_default=func.now()
    )

    shipper_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("customers.id"))
    shipper: Mapped["Customer"] = relationship(
        back_populates="waybill_shipper", foreign_keys=shipper_id
    )

    consignee_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("customers.id"))
    consignee: Mapped["Customer"] = relationship(
        back_populates="waybill_consignee", foreign_keys=consignee_id
    )
