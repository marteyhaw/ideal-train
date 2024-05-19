# Module Specifications

## Table of Contents

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

1. POST /api/v1/customers/

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

1. GET /api/v1/customers/

#### Supporting Features

- Search string refers to Customer fields, including name, nickname, address,
  and email.

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

- Search string refers to Manifest fields, including name, nickname, address,
  and email.

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

- Customer

#### Users

- Encoder

#### Validation Requirements

| Field               | Mandatory | Restrictions             |
| :------------------ | :-------: | :----------------------- |
| Waybill No.         |     Y     | Max Length: 12; _Unique_ |
| Account Type        |     Y     | Lookup: PaymentTerms     |
| Consignee           |     Y     | Lookup: Customers        |
| Destination         |     Y     | Lookup: Location         |
| Address (Consignee) |     N     | Max Length 100           |
| Date                |     Y     |                          |
| Shipper             |     Y     | Lookup: Customers        |
| Received at         |     Y     | Lookup: Location         |
| Address (Shipper)   |     Y     | Max Length 100           |
| Received by         |     Y     | Lookup: Employee         |
| Volume Charge       |     N     | Decimal 11.25            |
| Value Charge        |     N     | Decimal 11.25            |
| Misc Charge         |     N     | Decimal 11.25            |
| Weight Charge       |     N     | Decimal 11.25            |
| Delivery Charge     |     N     | Decimal 11.25            |
| Value-added Tax     |     N     | Decimal 11.25            |
| Notes               |     N     | Max Length 500           |

#### APIs

1. GET /api/v1/customers/

#### Supporting Features

- Fetch all Customers (with necessary fields only) for Consignee and Shipper
  dropdowns.

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

- Search string refers to Waybill select fields with corresponding search logic:

| Field       |            Criteria             |
| :---------- | :-----------------------------: |
| Date        |              Equal              |
| Waybill No. |         Wildcard Regex          |
| Destination |              Equal              |
| Consignee   | Wildcard Regex on Customer Name |
| Shipper     | Wildcard Regex on Customer Name |

---

### View and Edit Waybill

#### Description

View specific waybill and update details

#### Prerequisites

- Customer

#### Users

- Encoder

#### Validation Requirements

| Field               | Mandatory | Restrictions         |
| :------------------ | :-------: | :------------------- |
| Waybill No.         | READ ONLY |                      |
| Account Type        |     Y     | Lookup: PaymentTerms |
| Consignee           |     Y     | Lookup: Customers    |
| Destination         |     Y     | Lookup: Location     |
| Address (Consignee) |     N     | Max Length 100       |
| Date                |     Y     |                      |
| Shipper             |     Y     | Lookup: Customers    |
| Received at         |     Y     | Lookup: Location     |
| Address (Shipper)   |     Y     | Max Length 100       |
| Received by         |     Y     | Lookup: Employee     |
| Volume Charge       |     N     | Decimal 11.25        |
| Value Charge        |     N     | Decimal 11.25        |
| Misc Charge         |     N     | Decimal 11.25        |
| Weight Charge       |     N     | Decimal 11.25        |
| Delivery Charge     |     N     | Decimal 11.25        |
| Value-added Tax     |     N     | Decimal 11.25        |
| Notes               |     N     | Max Length 500       |

#### APIs

1. GET /api/v1/waybills/{waybill_id}
2. PATCH /api/v1/waybills/{waybill_id}

#### Supporting Features

- Fetch all Customers (with necessary fields only) for Consignee and Shipper
  dropdowns

---
