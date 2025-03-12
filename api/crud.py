from uuid import UUID

import schemas
from models import (
    Cargo,
    Carrier,
    Containerization,
    Customer,
    Employee,
    Location,
    Manifest,
    ManifestStatusLog,
    User,
    Waybill,
    WaybillStatusLog,
)
from sqlalchemy import DateTime, String, and_, cast, or_, select
from sqlalchemy.orm import InstrumentedAttribute, Session


# CARRIERS
def get_carrier_by_name(db: Session, name: str) -> Carrier | None:
    db_carrier = db.query(Carrier).filter(Carrier.name == name).first()
    if not db_carrier:
        return None

    return db_carrier


def get_carrier_by_id(db: Session, uuid: UUID) -> Carrier | None:
    return db.query(Carrier).filter(Carrier.id == uuid).first()


def get_carriers(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Carrier]:
    return db.query(Carrier).offset(skip).limit(limit).all()


def create_carrier(db: Session, carrier: schemas.CarrierCreate) -> Carrier:
    db_carrier = Carrier(**carrier.model_dump())
    db.add(db_carrier)
    db.commit()
    db.refresh(db_carrier)

    return db_carrier


# CONTAINERS
def get_container_by_id(db: Session, uuid: UUID) -> Containerization | None:
    return (
        db.query(Containerization).filter(Containerization.id == uuid).first()
    )


def get_container_by_exact_search(
    db: Session,
    search_filters,
) -> Containerization | None:

    clauses = []
    for filter in search_filters:
        if filter[1] != "":
            if filter[0] == "container_date":

                clauses.append(
                    cast(Containerization.container_date, DateTime)
                    == filter[1]
                )
            else:
                clauses.append(
                    cast(getattr(Containerization, filter[0]), String).like(
                        f"%{filter[1]}%"
                    )
                )
    stmt = select(Containerization).filter(and_(*clauses))

    return db.scalars(stmt).first()


def create_container(
    db: Session, containerization: schemas.ContainerizationCreate
) -> Containerization:
    db_container = Containerization(**containerization.model_dump())
    db.add(db_container)
    db.commit()
    db.refresh(db_container)

    return db_container


def update_container(
    db: Session,
    uuid: UUID,
    container_update_data: schemas.ContainerizationUpdate,
) -> Containerization:
    db_container = db.query(Containerization).filter(
        Containerization.id == uuid
    )
    db_container.first()
    db_container.update(
        container_update_data,
        synchronize_session=False,
    )
    db.commit()
    updated_container = db_container.first()

    return updated_container


# CUSTOMERS
def get_customers_by_filter_search(
    db: Session,
    search_filters,
    skip: int = 0,
    limit: int = 100,
) -> list[Customer] | None:
    clauses = [
        getattr(Customer, filter[0]).ilike(f"%{filter[1]}%")
        for filter in search_filters
        if filter[1] != ""
    ]
    stmt = select(Customer).filter(and_(*clauses)).offset(skip).limit(limit)

    return db.scalars(stmt)


def get_customers_by_loose_search(
    db: Session,
    search_filters,
    skip: int = 0,
    limit: int = 100,
) -> list[Customer] | None:
    clauses = [
        getattr(Customer, filter[0]).ilike(f"%{filter[1]}%")
        for filter in search_filters
        if filter[1] != ""
    ]
    stmt = select(Customer).filter(or_(*clauses)).offset(skip).limit(limit)

    return db.scalars(stmt)


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
    db_customer.update(
        customer_update_data,
        synchronize_session=False,
    )
    db.commit()
    updated_customer = db_customer.first()

    return updated_customer


# WAYBILLS
def get_waybills_by_filter_search(
    db: Session,
    select_table,
    search_filters,
    joins: list = [],
    skip: int = 0,
    limit: int = 100,
) -> list[Waybill] | None:

    stmt = select(select_table)
    for join in joins:
        stmt = stmt.join(join[0], join[1])

    clauses = []
    for filter in search_filters:
        search_argument = filter[2]
        if search_argument != "":
            attr_str = filter[1]

            if type(filter[0]) is tuple:
                table_attr, related_table = filter[0]

                if isinstance(table_attr, InstrumentedAttribute):
                    d = {}
                    d[attr_str] = search_argument
                    clause = table_attr.has(
                        getattr(related_table, attr_str).ilike(
                            f"%{search_argument}%"
                        )
                    )

            else:
                table = filter[0]
                clause = cast(getattr(table, attr_str), String).ilike(
                    f"%{search_argument}%"
                )
            clauses.append(clause)

    stmt = stmt.filter(and_(*clauses)).offset(skip).limit(limit)

    return db.scalars(stmt)


def get_waybills_by_loose_search(
    db: Session,
    select_table,
    search_filters,
    joins: list = [],
    skip: int = 0,
    limit: int = 100,
) -> list[Waybill] | None:
    clauses = []

    stmt = select(select_table)
    for join in joins:
        stmt = stmt.join(join[0], join[1])

    for filter in search_filters:
        search_argument = filter[2]
        if search_argument != "":
            attr_str = filter[1]

            if type(filter[0]) is tuple:
                table_attr, related_table = filter[0]

                if isinstance(table_attr, InstrumentedAttribute):
                    d = {}
                    d[attr_str] = search_argument
                    clause = table_attr.has(
                        getattr(related_table, attr_str).ilike(
                            f"%{search_argument}%"
                        )
                    )

            else:
                table = filter[0]
                clause = cast(getattr(table, attr_str), String).ilike(
                    f"%{search_argument}%"
                )
            clauses.append(clause)

    stmt = stmt.filter(or_(*clauses)).offset(skip).limit(limit)

    return db.scalars(stmt)


def get_waybill_by_id(db: Session, uuid: UUID) -> Waybill | None:
    return db.query(Waybill).filter(Waybill.id == uuid).first()


def get_waybill_by_number(db: Session, waybill_number: int) -> Waybill | None:
    return db.query(Waybill).filter(Waybill.number == waybill_number).first()


def get_waybills(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Waybill]:
    return db.query(Waybill).offset(skip).limit(limit).all()


async def create_waybill(
    db: Session,
    waybill: schemas.WaybillCreate,
) -> Waybill:
    waybill_cargos_input = waybill.cargos
    waybill.cargos = []
    db_waybill = Waybill(**waybill.model_dump())
    db.add(db_waybill)
    db.flush()
    for cargo in waybill_cargos_input:
        cargo.waybill_id = db_waybill.id
        db_cargo = Cargo(**cargo.model_dump())
        db.add(db_cargo)

    employee = get_employee_by_id(
        db=db, uuid=db_waybill.encoded_by_employee_id
    )
    waybill_status_log = WaybillStatusLog(
        status_current="RCVD",
        location=employee.local_office,
        logged_by_employee_id=employee.id,
        waybill_id=db_waybill.id,
    )
    db.add(waybill_status_log)

    db.commit()
    db.refresh(db_waybill)

    return db_waybill


async def update_waybill(
    db: Session,
    uuid: UUID,
    waybill_update_data: schemas.WaybillUpdate,
    new_cargo: list[schemas.CargoCreate],
) -> Waybill | None:
    for cargo in new_cargo:
        cargo_to_add = Cargo(**cargo.model_dump())
        cargo_to_add.waybill_id = uuid
        db.add(cargo_to_add)
    for cargo in waybill_update_data.cargos:
        cargo_to_update = db.query(Cargo).filter(Cargo.id == cargo.id)
        cargo_to_update.first()
        cargo_to_update.update(
            cargo.model_dump(),
            synchronize_session=False,
        )
    cargos_stmt = select(Cargo).filter(Cargo.waybill_id == uuid)
    cargos = db.scalars(cargos_stmt).all()
    delattr(waybill_update_data, "cargos")
    db_waybill = db.query(Waybill).filter(Waybill.id == uuid)
    db_waybill.first()
    db_waybill.update(
        waybill_update_data.model_dump(),
        synchronize_session=False,
    )
    db_upd_waybill = db_waybill.first()
    db_upd_waybill.cargos = cargos
    db.commit()
    db.refresh(db_upd_waybill)

    return db_upd_waybill


async def create_waybill_status_log(
    db: Session,
    waybill_status_log: schemas.WaybillStatusLogCreate,
) -> schemas.HttpMessage:

    db_waybill_status_log = WaybillStatusLog(**waybill_status_log.model_dump())
    db.add(db_waybill_status_log)
    db.commit()

    return {"detail": "Waybill status updated"}


# CARGO
def get_cargos(db: Session, skip: int = 0, limit: int = 100) -> list[Cargo]:
    return db.query(Cargo).offset(skip).limit(limit).all()


def get_cargo_by_id(db: Session, uuid: UUID) -> Cargo | None:
    return db.query(Cargo).filter(Cargo.id == uuid).first()


def create_cargo(
    db: Session,
    cargo: schemas.CargoCreate,
) -> Cargo:
    db_cargo = Cargo(**cargo.model_dump())
    db.add(db_cargo)
    db.commit()
    db.refresh(db_cargo)

    return db_cargo


def update_cargo(
    db: Session,
    uuid: UUID,
    cargo_update_data: schemas.CargoUpdate,
) -> Cargo:
    db_cargo = db.query(Cargo).filter(Cargo.id == uuid)
    db_cargo.first()
    db_cargo.update(
        cargo_update_data,
        synchronize_session=False,
    )
    db.commit()
    updated_cargo = db_cargo.first()

    return updated_cargo


# MANIFEST
def get_manifests(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Manifest]:
    return db.query(Manifest).offset(skip).limit(limit).all()


def get_manifest_by_id(db: Session, uuid: UUID) -> Manifest | None:
    return db.query(Manifest).filter(Manifest.id == uuid).first()


def get_manifest_by_number(
    db: Session, manifest_number: int
) -> Manifest | None:
    return (
        db.query(Manifest).filter(Manifest.number == manifest_number).first()
    )


async def create_manifest(
    db: Session,
    manifest: schemas.ManifestCreate,
    check_container_exists: bool,
    container_details: dict,
) -> Manifest | None:

    container_id = None
    if check_container_exists:
        search_filters = [(k, v) for k, v in container_details.items()]
        db_containerization = get_container_by_exact_search(
            db=db, search_filters=search_filters
        )
        if db_containerization is None:
            db_new_containerization = Containerization(**container_details)
            db.add(db_new_containerization)
            db.flush()
            container_id = db_new_containerization.id
        else:
            container_id = db_containerization.id

    manifest_waybills_input = manifest.waybills
    waybills_stmt = select(Waybill).filter(
        and_(
            Waybill.id.in_(manifest_waybills_input),
            Waybill.manifest_id.is_(None),
        )
    )
    waybills = db.scalars(waybills_stmt).all()
    if len(manifest_waybills_input) > len(waybills):
        return None
    employee = get_employee_by_id(db=db, uuid=manifest.encoded_by_employee_id)
    for waybill in waybills:
        waybill_status_log = WaybillStatusLog(
            status_current="LOAD",
            location=employee.local_office,
            logged_by_employee_id=employee.id,
            waybill_id=waybill.id,
        )
        db.add(waybill_status_log)
    manifest.waybills = waybills
    db_manifest = Manifest(**manifest.model_dump(), container_id=container_id)
    db.add(db_manifest)
    db.flush()
    manifest_status_log = ManifestStatusLog(
        status_current="LOAD",
        location=employee.local_office,
        logged_by_employee_id=employee.id,
        manifest_id=db_manifest.id,
    )
    db.add(manifest_status_log)
    db.commit()
    db.refresh(db_manifest)

    return db_manifest


async def update_manifest(
    db: Session,
    uuid: UUID,
    manifest: Manifest,
    manifest_update_data: schemas.ManifestUpdate,
    check_container_exists: bool,
    container_details: dict,
) -> Manifest | None:
    container_id = None
    if check_container_exists:
        search_filters = [(k, v) for k, v in container_details.items()]
        db_containerization = get_container_by_exact_search(
            db=db, search_filters=search_filters
        )
        if db_containerization is None:
            db_new_containerization = Containerization(**container_details)
            db.add(db_new_containerization)
            db.flush()
            container_id = db_new_containerization.id
        else:
            if manifest.container_id == db_containerization.id:
                container_id = manifest.container_id
            else:
                container_id = db_containerization.id

    waybills_stmt = select(Waybill).filter(
        and_(
            Waybill.id.in_(manifest_update_data.waybills),
            or_(Waybill.manifest_id.is_(None), Waybill.manifest_id == uuid),
        )
    )
    waybills = db.scalars(waybills_stmt).all()
    if len(manifest_update_data.waybills) > len(waybills):
        return None
    delattr(manifest_update_data, "waybills")
    db_manifest = db.query(Manifest).filter(Manifest.id == uuid)
    manifest_update_data_d = manifest_update_data.model_dump()
    manifest_update_data_d["container_id"] = container_id
    db_manifest.update(
        manifest_update_data_d,
        synchronize_session=False,
    )
    db_upd_manifest = db_manifest.first()
    db_upd_manifest.waybills = waybills
    db.commit()
    db.refresh(db_upd_manifest)
    return db_upd_manifest


async def create_manifest_status_log(
    db: Session,
    manifest_status_log: schemas.ManifestStatusLogCreate,
) -> schemas.HttpMessage:
    db_manifest_status_log = WaybillStatusLog(
        **manifest_status_log.model_dump()
    )
    db.add(db_manifest_status_log)

    waybills_stmt = select(Waybill).filter(
        Waybill.manifest_id == manifest_status_log.manifest_id
    )
    waybills = db.scalars(waybills_stmt).all()
    employee = get_employee_by_id(
        db=db, uuid=manifest_status_log.logged_by_employee_id
    )
    for waybill in waybills:
        waybill_status_log = WaybillStatusLog(
            status_current=manifest_status_log.status_current,
            location=employee.local_office,
            logged_by_employee_id=employee.id,
            waybill_id=waybill.id,
            notes=manifest_status_log.notes,
        )
        db.add(waybill_status_log)

    db.commit()

    return {"detail": "Manufest status updated"}


# EMPLOYEES
def get_employee_by_first_last_name(
    db: Session, first_name: str, last_name: str
) -> Employee | None:
    db_employee = (
        db.query(Employee)
        .filter(
            Employee.first_name == first_name, Employee.last_name == last_name
        )
        .first()
    )
    if not db_employee:
        return None

    return db_employee


def get_employee_by_id(db: Session, uuid: UUID) -> Employee | None:
    return db.query(Employee).filter(Employee.id == uuid).first()


def get_employees(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Employee]:
    return db.query(Employee).offset(skip).limit(limit).all()


def create_employee(db: Session, employee: schemas.EmployeeCreate) -> Employee:
    db_employee = Employee(**employee.model_dump())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)

    return db_employee


def update_employee(
    db: Session,
    uuid: UUID,
    employee_update_data: schemas.EmployeeUpdate,
) -> Employee:
    db_employee = db.query(Employee).filter(Employee.id == uuid)
    db_employee.first()
    db_employee.update(
        employee_update_data,
        synchronize_session=False,
    )
    db.commit()
    updated_employee = db_employee.first()

    return updated_employee


# LOCATION
def get_location_by_code(db: Session, code: str) -> Location | None:
    db_location = db.query(Location).filter(Location.code == code).first()
    if not db_location:
        return None

    return db_location


def get_locations(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Location]:
    return db.query(Location).offset(skip).limit(limit).all()


def create_location(db: Session, location: schemas.LocationCreate) -> Location:
    db_location = Location(**location.model_dump())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)

    return db_location


# USER
def update_user_roles(db: Session, user_id: UUID, new_roles: str):
    """
    Update a user's roles in the database.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None

    user.roles = new_roles
    db.commit()
    db.refresh(user)

    return user
