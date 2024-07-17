from fastapi import APIRouter

from api.routes import (
    cargos,
    carriers,
    customers,
    employees,
    manifests,
    waybills,
)

api_router = APIRouter()
api_router.include_router(cargos.router, prefix="/cargos", tags=["cargos"])
api_router.include_router(
    carriers.router, prefix="/carriers", tags=["carriers"]
)
api_router.include_router(
    customers.router, prefix="/customers", tags=["customers"]
)
api_router.include_router(
    employees.router, prefix="/employees", tags=["employees"]
)
api_router.include_router(
    manifests.router, prefix="/manifests", tags=["manifests"]
)
api_router.include_router(
    waybills.router, prefix="/waybills", tags=["waybills"]
)
