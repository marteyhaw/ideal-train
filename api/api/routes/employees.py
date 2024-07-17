from uuid import UUID

import crud
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Employee])
def read_employees(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Get a list of employees.
    """
    return crud.get_employees(db, skip=skip, limit=limit)


@router.get("/{employee_id}", response_model=schemas.Employee)
def read_employee(employee_id: UUID, db: Session = Depends(get_db)):
    """
    Get an employee by their id.
    """
    db_employee = crud.get_employee_by_id(db, uuid=employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    return db_employee


@router.post("/", response_model=schemas.Employee)
def create_employee(
    employee: schemas.EmployeeCreate, db: Session = Depends(get_db)
):
    """
    Create an employee.
    """
    db_employee = crud.get_employee_by_first_last_name(
        db, first_name=employee.first_name, last_name=employee.last_name
    )
    if db_employee:
        raise HTTPException(
            status_code=400, detail="Employee already registered"
        )

    return crud.create_employee(db=db, employee=employee)


@router.patch("/{employee_id}", response_model=schemas.Employee)
def update_employee(
    employee_id: UUID,
    employee_update: schemas.EmployeeUpdate,
    db: Session = Depends(get_db),
):
    """
    Update an employee.
    """
    db_employee = crud.get_employee_by_id(db, uuid=employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    update_data = employee_update.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="Bad request")
    updated_employee = crud.update_employee(db, employee_id, update_data)

    return updated_employee
