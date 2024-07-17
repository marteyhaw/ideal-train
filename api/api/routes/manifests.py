from uuid import UUID

import crud
import schemas
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Manifest])
def read_manifests(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Get a list of manifests.
    """
    return crud.get_manifests(db, skip=skip, limit=limit)


@router.get("/{manifest_id}", response_model=schemas.Manifest)
def read_manifest(manifest_id: UUID, db: Session = Depends(get_db)):
    """
    Get a manifest by its id.
    """
    db_manifest = crud.get_manifest_by_id(db, uuid=manifest_id)
    if db_manifest is None:
        raise HTTPException(status_code=404, detail="Manifest not found")

    return db_manifest


@router.post("/", response_model=schemas.Manifest)
async def create_manifest(
    manifest: schemas.ManifestCreate, db: Session = Depends(get_db)
):
    """
    Create a manifest.
    """
    container_headers = ["code", "carrier_id", "container_date"]
    container_details = {k: getattr(manifest, k) for k in container_headers}
    [delattr(manifest, k) for k in container_headers]
    all_container_details_provided = all(container_details.values())
    if not all_container_details_provided:
        if any(container_details.values()):
            incomplete_fields = ", ".join(
                container_headers[:-2] + [" or ".join(container_headers[-2:])]
            )
            raise HTTPException(
                status_code=400,
                detail=f"Missing {incomplete_fields}",
            )

    db_existing_manifest = crud.get_manifest_by_number(
        db, manifest_number=manifest.number
    )
    if db_existing_manifest:
        raise HTTPException(
            status_code=400,
            detail="There is an existing manifest with that number",
        )
    db_checker = crud.get_employee_by_id(
        db, uuid=manifest.checked_by_employee_id
    )
    if not db_checker:
        raise HTTPException(status_code=400, detail="Invalid checker")
    db_encoder = crud.get_employee_by_id(
        db, uuid=manifest.encoded_by_employee_id
    )
    if not db_encoder:
        raise HTTPException(status_code=400, detail="Invalid encoder")
    try:
        db_manifest = await crud.create_manifest(
            db,
            manifest=manifest,
            check_container_exists=all_container_details_provided,
            container_details=container_details,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"{e}")
    if db_manifest is None:
        raise HTTPException(status_code=400, detail="Bad request")

    return db_manifest


@router.patch("/{manifest_id}", response_model=schemas.Manifest)
async def update_manifest(
    manifest_id: UUID,
    manifest_update: schemas.ManifestUpdate,
    db: Session = Depends(get_db),
):
    """
    Update a manifest.
    """
    container_headers = ["code", "carrier_id", "container_date"]
    container_details = {
        k: getattr(manifest_update, k) for k in container_headers
    }
    [delattr(manifest_update, k) for k in container_headers]
    all_container_details_provided = all(container_details.values())
    if not all_container_details_provided:
        if any(container_details.values()):
            incomplete_fields = ", ".join(
                container_headers[:-2] + [" or ".join(container_headers[-2:])]
            )
            raise HTTPException(
                status_code=400,
                detail=f"Missing {incomplete_fields}",
            )
    db_manifest = crud.get_manifest_by_id(db, uuid=manifest_id)
    if db_manifest is None:
        raise HTTPException(status_code=404, detail="Manifest not found")
    updated_manifest = await crud.update_manifest(
        db,
        uuid=manifest_id,
        manifest=db_manifest,
        manifest_update_data=manifest_update,
        check_container_exists=all_container_details_provided,
        container_details=container_details,
    )
    if not updated_manifest:
        raise HTTPException(status_code=400, detail="Bad request")

    return updated_manifest


@router.post("/update_status")
async def update_manifest_status(
    manifest_status_log: schemas.ManifestStatusLogCreate,
    db: Session = Depends(get_db),
):
    """
    Update a manifest's status.
    """
    db_manifest = crud.get_manifest_by_id(
        db, uuid=manifest_status_log.manifest_id
    )
    if not db_manifest:
        raise HTTPException(status_code=400, detail="Invalid manifest")
    db_encoder = crud.get_employee_by_id(
        db, uuid=manifest_status_log.logged_by_employee_id
    )
    if not db_encoder:
        raise HTTPException(status_code=400, detail="Invalid encoder")
    httpmessage = await crud.create_manifest_status_log(
        db, manifest_status_log
    )
    if not httpmessage:
        raise HTTPException(status_code=400, detail="DB error")

    return httpmessage
