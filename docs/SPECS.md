# Module Specifications

## Table of Contents

- [Customer Module](#customer-module)
  - [Create Customer](#create-customer)
  - [Search Customer](#search-customer)
  - [View Customer](#view-customer)
- [Manifest Module](#manifest-module)
  - [Create Manifest](#create-manifest)
  - [Search Manifest](#search-manifest)
  - [View Manifest](#view-manifest)
- [Waybill Module](#waybill-module)
  - [Create Waybill](#create-waybill)
  - [Search Waybill](#search-waybill)
  - [View Waybill](#view-waybill)

## Customer Module

### Create Customer

#### Description

&nbsp;&nbsp;Adds a new customer to the database

#### Prerequisites

&nbsp;&nbsp;None

#### Users

&nbsp;&nbsp;Encoder

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

### Search Customer

#### Description

&nbsp;&nbsp;Show list of customers based on search query

#### Prerequisites

&nbsp;&nbsp;None

#### Users

&nbsp;&nbsp;Encoder

#### Validation Requirements

| Field      | Mandatory | Restrictions |
| :--------- | :-------: | :----------- |
| Search Bar |     N     | N/A          |

### View Customer

#### Description

&nbsp;&nbsp;View specific customer and update details

#### Prerequisites

&nbsp;&nbsp;None

#### Users

&nbsp;&nbsp;Encoder

#### Validation Requirements

| Field          | Mandatory | Restrictions                  |
| :------------- | :-------: | :---------------------------- |
| Name           | READ ONLY |                               |
| Nickname       |     N     | Max Length 20; _Unique_       |
| Street Address |     N     | Max Length 100                |
| Contact No     |     N     | Max Length 50; Phone No Regex |
| City           |     N     | Max Length 50                 |
| Email Address  |     N     | Max Length 50; Email Regex    |
| Volume charge  |     N     | Decimal 11.2                  |
| Weight Charge  |     N     | Decimal 11.2                  |
| Value Charge   |     N     | Decimal 11.2                  |
| Notes          |     N     | Max Length 500                |

## Manifest Module

### Create Manifest

### Search Manifest

### View Manifest

## Waybill Module

### Create Waybill

### Search Waybill

### View Waybill
