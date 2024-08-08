# Module Specifications

## Table of Contents

### [General Terms](#general-terms)

- [Payment Terms](#payment-terms)
- [Status](#status)

### [API List](#api-list)

- [Customer APIs](#customer-apis)
- [Manifest APIs](#manifest-apis)
- [Manifest Status Log APIs](#manifest-status-log-apis)
- [Waybill APIs](#waybill-apis)
- [Waybill Status Log APIs](#waybill-status-log-apis)

### [Modules](#modules)

- [Customer Module](#customer-module)
  - [Create Customer](#create-customer)
  - [Search Customer](#search-customer)
  - [View and Edit Customer](#view-and-edit-customer)
- [Manifest Module](#manifest-module)
  - [Create Manifest](#create-manifest)
  - [Search Manifest](#search-manifest)
  - [View and Edit Manifest](#view-and-edit-manifest)
- [Waybill Module](#waybill-module)
  - [Create Waybill](#create-waybill)
  - [Search Waybill](#search-waybill)
  - [View and Edit Waybill](#view-and-editwaybill)

---

## General Terms

### Payment Terms

| Code |       Term       | Desription                                          |
| :--- | :--------------: | :-------------------------------------------------- |
| ACC  |     Account      | Statement of Account is generated after term period |
| COD  | Cash on Delivery | Payment is made on delivery completion              |
| PPD  |     Prepaid      | Payment is made upfront                             |

### Status

| Code |     Term     | Desription                                                                                                               | Location    |
| :--- | :----------: | :----------------------------------------------------------------------------------------------------------------------- | :---------- |
| RCVD |   Received   | Shipper drops off cargo and Waybill is created                                                                           | Origin      |
| LOAD |    Loaded    | Cargo is loaded into containerization and Waybill is added to Manifest                                                   | Origin      |
| TRNS |  In Transit  | Containerized cargos/waybill has departed receiving facility and is in transit to destination                            | Origin      |
| ARVD |   Arrived    | Containerized cargos/waybill has arrived at destination port/unloading yard                                              | Destination |
| FRDV | For Delivery | Containerized cargos/waybill has been unloaded from container and is ready for unload at branch or straight for delivery | Destination |
| DVRD |  Delivered   | Cargo has been delivered and Waybill is marked as delivered                                                              | Destination |

---

## API List

## Customer APIs

### Create Customer API

- POST /api/v1/customers/

### Get Customer API

- GET /api/v1/customers/{customer_id}

### Get Customer List API

- GET /api/v1/customers/

  - If search string is passed as a parameter, retrieve only the Customers that
    match the search criteria. Refer to the following table for the
    corresponding search logic per field:

    | Field    |    Criteria    |
    | :------- | :------------: |
    | Name     | Wildcard Regex |
    | Nickname | Wildcard Regex |
    | Address  | Wildcard Regex |
    | Email    | Wildcard Regex |

### Update Customer API

- PATCH /api/v1/customers/{customer_id}

---

## Manifest APIs

---

## Manifest Status Log APIs

---

## Waybill APIs

### Create Waybill API

- POST /api/v1/waybills/

  - Creates Waybill, accompanying Cargo entries, and initial WaybillStatusLog
    entry as an atomic database transaction.
  - WaybillStatusLog default values:

    | Label            | Field           | Details                         |
    | :--------------- | :-------------- | :------------------------------ |
    | Waybill ID       | waybill_id      | Generated Waybill ID (UUID)     |
    | Status Date Time | status_datetime | Current Date Time               |
    | Current Status   | status_current  | "RCVD", see [Status](#status)   |
    | Location         | location        | Encoder's Employee.local_office |
    | Logged By        | logged_by       | Encoder's Employee.id           |
    | Logged On        | logged_on       | Current Date Time               |

    Sample:

    ```json
    {
      "waybill_id": "061270b7-b4ed-4431-b37d-7350577499ec",
      "status_datetime": "2024-05-24 19:35:41.414540",
      "status_current": "RCVD",
      "location": "MNL",
      "logged_by": "9bd0895d-a287-44ba-b2b0-dc6c15d035c8",
      "logged_on": "2024-05-24 19:35:41.414540"
    }
    ```

### Get Waybill API

### Get Waybill List API

### Update Waybill API

---

### Waybill Status Log APIs

---

## Modules

## Customer Module

### Create Customer

#### Description

Adds a new customer to the database

#### Prerequisites

- None

#### Users

- Encoder

#### Validation Requirements

| Field          | Mandatory | Restrictions                  |
| :------------- | :-------: | :---------------------------- |
| Name           |     Y     | Max Length 50; _Unique_       |
| Nickname       |     N     | Max Length 20; _Unique_       |
| Street Address |     N     | Max Length 100                |
| Contact No     |     N     | Max Length 50; Phone No Regex |
| City           |     N     | Max Length 50                 |
| Email Address  |     N     | Max Length 50; Email Regex    |
| Volume charge  |     N     | Decimal 11.2                  |
| Weight Charge  |     N     | Decimal 11.2                  |
| Value Charge   |     N     | Decimal 11.2                  |
| Notes          |     N     | Max Length 500                |

#### APIs

1. [POST /api/v1/customers/](#create-customer)

#### Supporting Features

- N/A

---

### Search Customer

#### Description

Show list of customers based on search query

#### Prerequisites

- None

#### Users

- Encoder

#### Validation Requirements

| Field      | Mandatory | Restrictions |
| :--------- | :-------: | :----------- |
| Search Bar |     N     | N/A          |

#### APIs

1. [GET /api/v1/customers/](#get-customer-list-api)

- Pass Search Bar string as a parameter

#### Supporting Features

- N/A

---

### View and Edit Customer

#### Description

View specific customer and update details

#### Prerequisites

- None

#### Users

- Encoder

#### Validation Requirements

| Field          | Mandatory | Restrictions                  |
| :------------- | :-------: | :---------------------------- |
| Name           | READ ONLY |                               |
| Nickname       |     N     | Max Length 20; _Unique_       |
| Street Address |     N     | Max Length 100                |
| Contact No     |     N     | Max Length 50; Phone No Regex |
| City           |     N     | Max Length 50                 |
| Country        |     N     | Max Length 50                 |
| Email Address  |     N     | Max Length 50; Email Regex    |
| Volume charge  |     N     | Decimal 11.2                  |
| Weight Charge  |     N     | Decimal 11.2                  |
| Value Charge   |     N     | Decimal 11.2                  |
| Notes          |     N     | Max Length 500                |

#### APIs

1. GET /api/v1/customers/{customer_id}
2. PATCH /api/v1/customers/{customer_id}

#### Supporting Features

- N/A

---

## Manifest Module

### Create Manifest

#### Description

Adds a new manifest to the database

#### Prerequisites

- Waybill

#### Users

- Encoder

#### Validation Requirements

| Field          | Mandatory | Restrictions     |
| :------------- | :-------: | :--------------- |
| Destination    |     Y     | Lookup: Location |
| Carrier        |     N     | Lookup: Carrier  |
| Date           |     Y     |                  |
| Container Code |     N     | Max Length 20    |
| Checked By     |     Y     | Lookup: Employee |

#### APIs

1. GET /api/v1/waybills/
2. POST /api/v1/manifests/

#### Supporting Features

- Fetch all Waybills (with necessary fields only) that do not have an associated
  Manifest for Waybill selection

---

### Search Manifest

#### Description

Show list of manifests based on search query

#### Prerequisites

- None

#### Users

- Encoder

#### Validation Requirements

| Field      | Mandatory | Restrictions |
| :--------- | :-------: | :----------- |
| Search Bar |     N     | N/A          |

#### APIs

1. GET /api/v1/customers/

#### Supporting Features

- Search string refers to select Manifest fields with corresponding search
  logic:

| Field        |                Criteria                 |
| :----------- | :-------------------------------------: |
| Date         |                  Equal                  |
| Manifest No. |             Wildcard Regex              |
| Destination  |                  Equal                  |
| Code         | Wildcard Regex on Containerization.Code |

---

### View and Edit Manifest

#### Description

View specific manifest and update details

#### Prerequisites

- Waybill

#### Users

- Encoder

#### Validation Requirements

| Field          | Mandatory | Restrictions     |
| :------------- | :-------: | :--------------- |
| Destination    |     Y     | Lookup: Location |
| Carrier        |     N     | Lookup: Carrier  |
| Date           |     Y     |                  |
| Container Code |     N     | Max Length 20    |
| Checked By     |     Y     | Lookup: Employee |

#### APIs

1. GET /api/v1/waybills/
2. POST /api/v1/manifests/

#### Supporting Features

- Fetch all Waybills (with necessary fields only) that do not have an associated
  Manifest for Waybill selection.

---

## Waybill Module

### Create Waybill

#### Description

Adds a new waybill to the database

#### Prerequisites

- Customer (at least one entry)
- Employee (at least one entry)
- Location (at least one entry)

#### Users

- Encoder

#### Validation Requirements

| Field               | Mandatory | Restrictions                                                                                                   |
| :------------------ | :-------: | :------------------------------------------------------------------------------------------------------------- |
| Waybill No.         |     Y     | Max Length: 12; _Unique_                                                                                       |
| Account Type        |     Y     | Dropdown based on [Payment Terms](#payment-terms)                                                              |
| Consignee           |     Y     | Dropdown based on Customer (label: nickname/name, value: id)                                                   |
| Destination         |     Y     | Dropdown based on Location (label: description, value: code)                                                   |
| Address (Consignee) |     N     | Max Length 100                                                                                                 |
| Date                |     Y     |                                                                                                                |
| Shipper             |     Y     | Dropdown based on Customer (label: nickname/name, value: id)                                                   |
| Received at         |     Y     | Dropdown based on Location (label: description, value: code); default value is Encoder's Employee local office |
| Address (Shipper)   |     Y     | Max Length 100                                                                                                 |
| Received by         |     Y     | Dropdown based on Employee (label: full name, value: id)                                                       |
| Volume Charge       |     N     | Decimal 11.25                                                                                                  |
| Value Charge        |     N     | Decimal 11.25                                                                                                  |
| Misc Charge         |     N     | Decimal 11.25                                                                                                  |
| Weight Charge       |     N     | Decimal 11.25                                                                                                  |
| Delivery Charge     |     N     | Decimal 11.25                                                                                                  |
| Value-added Tax     |     N     | Decimal 11.25                                                                                                  |
| Notes               |     N     | Max Length 500                                                                                                 |

#### APIs

1. [POST /api/v1/waybills/](#create-waybill-api)

#### Supporting Features

- N/A

---

### Search Waybill

Show list of waybills based on search query

#### Prerequisites

- None

#### Users

- Encoder

#### Validation Requirements

| Field      | Mandatory | Restrictions |
| :--------- | :-------: | :----------- |
| Search Bar |     N     | N/A          |

#### APIs

1. GET /api/v1/waybills/

#### Supporting Features

- Search string refers to select Waybill fields with corresponding search logic:

| Field       |                 Criteria                 |
| :---------- | :--------------------------------------: |
| Date        |                  Equal                   |
| Waybill No. |              Wildcard Regex              |
| Destination |                  Equal                   |
| Consignee   | Wildcard Regex on Customer.name/nickname |
| Shipper     | Wildcard Regex on Customer.name/nickname |

---

### View and Edit Waybill

#### Description

View specific waybill and update details

#### Prerequisites

- Customer
- Employee
- Location

#### Users

- Encoder

#### Validation Requirements

| Field               | Mandatory | Restrictions                                                                                                   |
| :------------------ | :-------: | :------------------------------------------------------------------------------------------------------------- |
| Waybill No.         | READ ONLY |                                                                                                                |
| Account Type        |     Y     | Dropdown based on [Payment Terms](#payment-terms)                                                              |
| Consignee           |     Y     | Dropdown based on Customer (label: nickname/name, value: id)                                                   |
| Destination         |     Y     | Dropdown based on Location (label: description, value: code)                                                   |
| Address (Consignee) |     N     | Max Length 100                                                                                                 |
| Date                |     Y     |                                                                                                                |
| Shipper             |     Y     | Dropdown based on Customer (label: nickname/name, value: id)                                                   |
| Received at         |     Y     | Dropdown based on Location (label: description, value: code); default value is Encoder's Employee local office |
| Address (Shipper)   |     Y     | Max Length 100                                                                                                 |
| Received by         |     Y     | Dropdown based on Employee (label: full name, value: id)                                                       |
| Volume Charge       |     N     | Decimal 11.2                                                                                                   |
| Value Charge        |     N     | Decimal 11.2                                                                                                   |
| Misc Charge         |     N     | Decimal 11.2                                                                                                   |
| Weight Charge       |     N     | Decimal 11.2                                                                                                   |
| Delivery Charge     |     N     | Decimal 11.2                                                                                                   |
| Value-added Tax     |     N     | Decimal 11.2                                                                                                   |
| Notes               |     N     | Max Length 500                                                                                                 |

#### APIs

1. GET /api/v1/waybills/{waybill_id}
2. PATCH /api/v1/waybills/{waybill_id}

#### Supporting Features

- Fetch all Customers (with necessary fields only) for Consignee and Shipper
  dropdowns

---
