"""create initial tables

Revision ID: f520230922a9
Revises:
Create Date: 2024-07-17 09:24:38.663198

"""

from collections.abc import Sequence
from typing import Union

import sqlalchemy as sa
from sqlalchemy.sql import text
from alembic import op
import uuid
import bcrypt

# revision identifiers, used by Alembic.
revision: str = "f520230922a9"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

# Default admin employee info and credentials
DEFAULT_ADMIN_EMPLOYEE_FIRST_NAME = "Admin"
DEFAULT_ADMIN_EMPLOYEE_LAST_NAME = "User"
DEFAULT_ADMIN_USERNAME = "admin"
DEFAULT_ADMIN_EMAIL = "admin@example.com"
DEFAULT_ADMIN_PASSWORD = "password"
DEFAULT_ADMIN_ROLES = "admin,encoder"


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "carriers",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=True),
        sa.Column("nickname", sa.String(length=20), nullable=True),
        sa.Column("address", sa.String(length=100), nullable=True),
        sa.Column("email", sa.String(length=50), nullable=True),
        sa.Column("contact_no", sa.String(length=20), nullable=True),
        sa.Column("notes", sa.String(length=500), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )
    op.create_index(
        op.f("ix_carriers_email"), "carriers", ["email"], unique=False
    )
    op.create_table(
        "customers",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("nickname", sa.String(length=20), nullable=True),
        sa.Column("address", sa.String(length=100), nullable=True),
        sa.Column("city", sa.String(length=50), nullable=True),
        sa.Column("country", sa.String(length=50), nullable=True),
        sa.Column("email", sa.String(length=50), nullable=True),
        sa.Column("contact_no", sa.String(length=50), nullable=True),
        sa.Column(
            "rate_volume_charge",
            sa.Numeric(precision=11, scale=2),
            nullable=True,
        ),
        sa.Column(
            "rate_weight_charge",
            sa.Numeric(precision=11, scale=2),
            nullable=True,
        ),
        sa.Column(
            "rate_value_charge",
            sa.Numeric(precision=11, scale=2),
            nullable=True,
        ),
        sa.Column("notes", sa.String(length=500), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_customers_address"), "customers", ["address"], unique=False
    )
    op.create_index(
        op.f("ix_customers_city"), "customers", ["city"], unique=False
    )
    op.create_index(
        op.f("ix_customers_contact_no"),
        "customers",
        ["contact_no"],
        unique=False,
    )
    op.create_index(
        op.f("ix_customers_country"), "customers", ["country"], unique=False
    )
    op.create_index(
        op.f("ix_customers_email"), "customers", ["email"], unique=False
    )
    op.create_index(
        op.f("ix_customers_name"), "customers", ["name"], unique=True
    )
    op.create_index(
        op.f("ix_customers_nickname"), "customers", ["nickname"], unique=True
    )
    op.create_table(
        "employees",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("last_name", sa.String(length=30), nullable=True),
        sa.Column("first_name", sa.String(length=50), nullable=True),
        sa.Column("middle_name", sa.String(length=50), nullable=True),
        sa.Column("email", sa.String(length=80), nullable=False),
        sa.Column("local_office", sa.String(length=20), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_employees_last_name"),
        "employees",
        ["last_name"],
        unique=False,
    )
    op.create_table(
        "locations",
        sa.Column("code", sa.String(length=10), nullable=False),
        sa.Column("description", sa.String(length=50), nullable=True),
        sa.PrimaryKeyConstraint("code"),
    )
    op.create_table(
        "containerizations",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("code", sa.String(length=20), nullable=True),
        sa.Column("container_date", sa.DateTime(timezone=True), nullable=True),
        sa.Column("carrier_id", sa.Uuid(), nullable=False),
        sa.ForeignKeyConstraint(
            ["carrier_id"],
            ["carriers.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_containerizations_container_date"),
        "containerizations",
        ["container_date"],
        unique=False,
    )
    op.create_table(
        "manifests",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("number", sa.Numeric(precision=12), nullable=True),
        sa.Column("destination", sa.String(length=20), nullable=True),
        sa.Column(
            "total_volume", sa.Numeric(precision=12, scale=6), nullable=True
        ),
        sa.Column(
            "total_weight", sa.Numeric(precision=12, scale=6), nullable=True
        ),
        sa.Column("created_date", sa.DateTime(timezone=True), nullable=True),
        sa.Column("notes", sa.String(length=500), nullable=True),
        sa.Column("encoded_on", sa.DateTime(timezone=True), nullable=True),
        sa.Column("checked_by_employee_id", sa.Uuid(), nullable=False),
        sa.Column("encoded_by_employee_id", sa.Uuid(), nullable=False),
        sa.Column("container_id", sa.Uuid(), nullable=True),
        sa.ForeignKeyConstraint(
            ["checked_by_employee_id"],
            ["employees.id"],
        ),
        sa.ForeignKeyConstraint(
            ["container_id"],
            ["containerizations.id"],
        ),
        sa.ForeignKeyConstraint(
            ["encoded_by_employee_id"],
            ["employees.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("number"),
    )
    op.create_index(
        op.f("ix_manifests_created_date"),
        "manifests",
        ["created_date"],
        unique=False,
    )
    op.create_table(
        "manifest_status_logs",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("status_current", sa.String(length=20), nullable=True),
        sa.Column("location", sa.String(length=50), nullable=True),
        sa.Column("logged_by_employee_id", sa.Uuid(), nullable=False),
        sa.Column("logged_on", sa.DateTime(timezone=True), nullable=True),
        sa.Column("manifest_id", sa.Uuid(), nullable=False),
        sa.Column("notes", sa.String(length=500), nullable=True),
        sa.ForeignKeyConstraint(
            ["logged_by_employee_id"],
            ["employees.id"],
        ),
        sa.ForeignKeyConstraint(
            ["manifest_id"],
            ["manifests.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "users",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("username", sa.String(length=50), nullable=False),
        sa.Column("email", sa.String(length=80), nullable=False),
        sa.Column("hashed_password", sa.String(), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=True),
        sa.Column("employee_id", sa.Uuid(), nullable=False),
        sa.Column("roles", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["employee_id"],
            ["employees.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("employee_id"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_index(
        op.f("ix_users_username"), "users", ["username"], unique=True
    )
    op.create_table(
        "waybills",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("number", sa.Numeric(precision=12), nullable=True),
        sa.Column("destination", sa.String(length=20), nullable=True),
        sa.Column("origin_address", sa.String(length=100), nullable=True),
        sa.Column("destination_address", sa.String(length=100), nullable=True),
        sa.Column("created_date", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "total_amount", sa.Numeric(precision=11, scale=2), nullable=True
        ),
        sa.Column(
            "total_weight_charge",
            sa.Numeric(precision=11, scale=2),
            nullable=True,
        ),
        sa.Column(
            "total_value_charge",
            sa.Numeric(precision=11, scale=2),
            nullable=True,
        ),
        sa.Column(
            "total_cu_msmt_charge",
            sa.Numeric(precision=11, scale=2),
            nullable=True,
        ),
        sa.Column(
            "total_delivery_charge",
            sa.Numeric(precision=11, scale=2),
            nullable=True,
        ),
        sa.Column(
            "total_vat", sa.Numeric(precision=11, scale=2), nullable=True
        ),
        sa.Column("payment_terms", sa.String(length=20), nullable=True),
        sa.Column("notes", sa.String(length=500), nullable=True),
        sa.Column("received_at", sa.String(length=20), nullable=True),
        sa.Column("received_by_employee_id", sa.Uuid(), nullable=False),
        sa.Column("encoded_by_employee_id", sa.Uuid(), nullable=False),
        sa.Column("encoded_on", sa.DateTime(timezone=True), nullable=True),
        sa.Column("shipper_id", sa.Uuid(), nullable=False),
        sa.Column("consignee_id", sa.Uuid(), nullable=False),
        sa.Column("manifest_id", sa.Uuid(), nullable=True),
        sa.ForeignKeyConstraint(
            ["consignee_id"],
            ["customers.id"],
        ),
        sa.ForeignKeyConstraint(
            ["encoded_by_employee_id"],
            ["employees.id"],
        ),
        sa.ForeignKeyConstraint(
            ["manifest_id"],
            ["manifests.id"],
        ),
        sa.ForeignKeyConstraint(
            ["received_by_employee_id"],
            ["employees.id"],
        ),
        sa.ForeignKeyConstraint(
            ["shipper_id"],
            ["customers.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("number"),
    )
    op.create_index(
        op.f("ix_waybills_created_date"),
        "waybills",
        ["created_date"],
        unique=False,
    )
    op.create_index(
        op.f("ix_waybills_destination"),
        "waybills",
        ["destination"],
        unique=False,
    )
    op.create_table(
        "cargos",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("quantity", sa.Numeric(precision=12), nullable=True),
        sa.Column("unit", sa.String(length=20), nullable=True),
        sa.Column("description", sa.String(length=100), nullable=True),
        sa.Column(
            "declared_value", sa.Numeric(precision=11, scale=2), nullable=False
        ),
        sa.Column("length", sa.Numeric(precision=12, scale=6), nullable=True),
        sa.Column("width", sa.Numeric(precision=12, scale=6), nullable=True),
        sa.Column("height", sa.Numeric(precision=12, scale=6), nullable=True),
        sa.Column("weight", sa.Numeric(precision=10, scale=4), nullable=True),
        sa.Column(
            "total_volume", sa.Numeric(precision=12, scale=6), nullable=True
        ),
        sa.Column("charge_type", sa.String(length=20), nullable=True),
        sa.Column(
            "volume_charge", sa.Numeric(precision=11, scale=2), nullable=True
        ),
        sa.Column(
            "weight_charge", sa.Numeric(precision=11, scale=2), nullable=True
        ),
        sa.Column(
            "additional_charge",
            sa.Numeric(precision=11, scale=2),
            nullable=True,
        ),
        sa.Column("waybill_id", sa.UUID(), nullable=True),
        sa.ForeignKeyConstraint(
            ["waybill_id"],
            ["waybills.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "waybill_status_logs",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("status_current", sa.String(length=20), nullable=True),
        sa.Column("location", sa.String(length=20), nullable=True),
        sa.Column("logged_by_employee_id", sa.Uuid(), nullable=False),
        sa.Column("logged_on", sa.DateTime(timezone=True), nullable=True),
        sa.Column("waybill_id", sa.UUID(), nullable=False),
        sa.Column("notes", sa.String(length=500), nullable=True),
        sa.ForeignKeyConstraint(
            ["logged_by_employee_id"],
            ["employees.id"],
        ),
        sa.ForeignKeyConstraint(
            ["waybill_id"],
            ["waybills.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    conn = op.get_bind()

    # Check if the admin employee exists
    existing_employee = conn.execute(
        text("SELECT id FROM employees WHERE email = :email"),
        {"email": DEFAULT_ADMIN_EMAIL},
    ).fetchone()

    if not existing_employee:
        employee_id = str(uuid.uuid4())
        conn.execute(
            text(
                "INSERT INTO employees (id, first_name, last_name, email, local_office, is_active) VALUES (:id, :first_name, :last_name, :email, 'HQ', :is_active)"
            ),
            {
                "id": employee_id,
                "first_name": DEFAULT_ADMIN_EMPLOYEE_FIRST_NAME,
                "last_name": DEFAULT_ADMIN_EMPLOYEE_LAST_NAME,
                "email": DEFAULT_ADMIN_EMAIL,
                "is_active": True,
            },
        )
    else:
        employee_id = existing_employee[0]

    existing_admin = conn.execute(
        text("SELECT id FROM users WHERE username = :username"),
        {"username": DEFAULT_ADMIN_USERNAME},
    ).fetchone()

    if not existing_admin:
        hashed_password = bcrypt.hashpw(
            DEFAULT_ADMIN_PASSWORD.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

        conn.execute(
            text(
                "INSERT INTO users (id, username, email, hashed_password, is_active, employee_id, roles) VALUES (:id, :username, :email, :hashed_password, :is_active, :employee_id, :roles)"
            ),
            {
                "id": str(uuid.uuid4()),
                "username": DEFAULT_ADMIN_USERNAME,
                "email": DEFAULT_ADMIN_EMAIL,
                "hashed_password": hashed_password,
                "is_active": True,
                "employee_id": employee_id,
                "roles": DEFAULT_ADMIN_ROLES,
            },
        )
    # ### end Alembic commands ###


def downgrade() -> None:
    op.execute("DELETE FROM users WHERE username = 'admin'")
    op.execute("DELETE FROM employees WHERE email = 'admin@example.com'")
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("waybill_status_logs")
    op.drop_table("cargos")
    op.drop_index(op.f("ix_waybills_destination"), table_name="waybills")
    op.drop_index(op.f("ix_waybills_created_date"), table_name="waybills")
    op.drop_table("waybills")
    op.drop_index(op.f("ix_users_username"), table_name="users")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
    op.drop_table("manifest_status_logs")
    op.drop_index(op.f("ix_manifests_created_date"), table_name="manifests")
    op.drop_table("manifests")
    op.drop_index(
        op.f("ix_containerizations_container_date"),
        table_name="containerizations",
    )
    op.drop_table("containerizations")
    op.drop_table("locations")
    op.drop_index(op.f("ix_employees_last_name"), table_name="employees")
    op.drop_table("employees")
    op.drop_index(op.f("ix_customers_nickname"), table_name="customers")
    op.drop_index(op.f("ix_customers_name"), table_name="customers")
    op.drop_index(op.f("ix_customers_email"), table_name="customers")
    op.drop_index(op.f("ix_customers_country"), table_name="customers")
    op.drop_index(op.f("ix_customers_contact_no"), table_name="customers")
    op.drop_index(op.f("ix_customers_city"), table_name="customers")
    op.drop_index(op.f("ix_customers_address"), table_name="customers")
    op.drop_table("customers")
    op.drop_index(op.f("ix_carriers_email"), table_name="carriers")
    op.drop_table("carriers")
    # ### end Alembic commands ###
