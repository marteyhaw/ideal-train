from fastapi import APIRouter

from api.routes import customers, waybills

api_router = APIRouter()
api_router.include_router(
    customers.router, prefix="/customers", tags=["customers"]
)
api_router.include_router(
    waybills.router, prefix="/waybills", tags=["waybills"]
)
