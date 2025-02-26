import os
import sys
from uuid import uuid4

import pytest
from core.database import Base, SessionLocal
from fastapi.testclient import TestClient
from main import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + "/.."))

# Create an in-memory SQLite database for tests
TEST_DATABASE_URI = "sqlite:///./sql_app.db"
test_engine = create_engine(
    TEST_DATABASE_URI, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=test_engine
)


# Ensure tables are created before running tests
@pytest.fixture(scope="function")
def test_db():
    """Creates a new database session for testing and ensures tables exist."""
    Base.metadata.create_all(bind=test_engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=test_engine)


# Override FastAPI’s database dependency to use the test DB
@pytest.fixture(scope="function")
def client(test_db):
    """FastAPI test client that uses the test database session."""

    def override_get_db():
        yield test_db

    app.dependency_overrides[SessionLocal] = override_get_db
    test_client = TestClient(app)
    yield test_client
    app.dependency_overrides.clear()


# Sample test customer data
TEST_CUSTOMER = {
    "name": "Test Customer",
    "nickname": "Test Nickname",
    "email": "test@example.com",
    "address": "123 Test St",
    "city": "Test City",
    "country": "PH",
    "contact_no": "09123456789",
    "rate_volume_charge": float(100.50),  # Convert Decimal to float
    "rate_weight_charge": float(50.25),
    "rate_value_charge": float(10.00),
    "notes": "This is a test customer.",
    "is_active": True,
}


@pytest.fixture
def create_test_customer(client):
    """Fixture to create a test customer and return its ID."""
    response = client.post("/api/v1/customers/", json=TEST_CUSTOMER)
    assert response.status_code == 200
    return response.json()["id"]


# ✅ Test Customer Creation
def test_create_customer_success(client):
    response = client.post("/api/v1/customers/", json=TEST_CUSTOMER)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == TEST_CUSTOMER["name"]
    assert data["nickname"] == TEST_CUSTOMER["nickname"]
    assert data["email"] == TEST_CUSTOMER["email"]


# ❌ Test Creating Customer Without Name (Should Fail)
def test_create_customer_without_name(client):
    invalid_customer = TEST_CUSTOMER.copy()
    del invalid_customer["name"]
    response = client.post("/api/v1/customers/", json=invalid_customer)
    assert response.status_code == 422
    assert "detail" in response.json()


# ❌ Test Creating Customer Without Nickname (Should Fail)
def test_create_customer_without_nickname(client):
    invalid_customer = TEST_CUSTOMER.copy()
    del invalid_customer["nickname"]
    response = client.post("/api/v1/customers/", json=invalid_customer)
    assert response.status_code == 422
    assert "detail" in response.json()


# ✅ Test Updating Customer
def test_update_customer_success(client, create_test_customer):
    customer_id = create_test_customer
    update_data = {
        "email": "updated@example.com",
    }
    response = client.patch(
        f"/api/v1/customers/{customer_id}", json=update_data
    )
    assert response.status_code == 200
    assert response.json()["email"] == "updated@example.com"


# ✅ Test Updating Customer Without Modifying Nickname
def test_update_customer_without_nickname(client, create_test_customer):
    customer_id = create_test_customer
    update_data = {
        "city": "New Test City",
    }
    response = client.patch(
        f"/api/v1/customers/{customer_id}", json=update_data
    )
    assert response.status_code == 200  # ✅ Success
    assert response.json()["city"] == "New Test City"


# ❌ Test Updating Non-Existent Customer (Should Fail)
def test_update_non_existent_customer(client):
    fake_id = str(uuid4())
    update_data = {"email": "doesnotexist@example.com"}
    response = client.patch(f"/api/v1/customers/{fake_id}", json=update_data)
    assert response.status_code == 404


# ✅ Test Retrieving a Customer
def test_get_customer(client, create_test_customer):
    customer_id = create_test_customer
    response = client.get(f"/api/v1/customers/{customer_id}")
    assert response.status_code == 200
    assert response.json()["id"] == customer_id


# ❌ Test Getting Non-Existent Customer (Should Fail)
def test_get_non_existent_customer(client):
    fake_id = str(uuid4())
    response = client.get(f"/api/v1/customers/{fake_id}")
    assert response.status_code == 404
