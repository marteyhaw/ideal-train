# Database Model

## Table of Contents

- [Entity Diagram](#entity-diagram)
- [Model Specifications](#model-specifications)
  - [Cargo](#cargo)
  - [Carrier](#carrier)
  - [Containerization](#containerization)
  - [Customer](#customer)
  - [Employee](#employee)
  - [Location](#location)
  - [Manifest](#manifest)
  - [Manifest Status Log](#manifest-status-log)
  - [Payment Terms](#payment-terms)
  - [Waybill](#waybill)
  - [Waybill Status Log](#waybill-status-log)

## Entity Diagram

```mermaid
classDiagram
class Cargo{
  id
  waybill_id
  quantity
  unit
  description
  declared_value
  length
  width
  height
  weight
  total_volume
  charge_type
  volume_charge
  weight_charge
  additional_charge
}
class Carrier{
  id
  name
  nickname
  address
  email
  contact_no
  contact_person
  notes
}
class Containerization{
  id
  code
  carrier_id
  created_date
}
class Customer{
  id
  name
  nickname
  address
  city
  country
  email
  contact_no
  rate_volume_charge
  rate_weight_charge
  rate_value_charge
  notes
}
class Employee{
  id
  last_name
  first_name
  middle_name
  email
  local_office
}
class Location{
  code
  description
}
class Manifest{
  id
  destination
  container_id
  total_volume
  total_weight
  checked_by
  created_date
  encoded_by
  encoded_on
}
class ManifestStatusLog{
  id
  manifest_id
  status_datetime
  status_current
  location
  logged_by
  logged_on
}
class PaymentTerms{
  code
  description
}
class Waybill{
  id
  number
  shipper
  consigneee
  destination
  origin_address
  destination_address
  created_date
  total_amount
  total_weight_charge
  total_value_charge
  total_cu_msmt_charge
  total_delivery_charge
  total_vat
  payment_terms
  notes
  manifest_id
  received_by
  received_at
  encoded_by
  encoded_on
}
class WaybillStatusLog{
  id
  waybill_id
  status_datetime
  status_current
  location
  logged_by
  logged_on
}
Waybill --> Employee : encoded by
Manifest --> Employee : encoded by
WaybillStatusLog --> Employee : logged by
ManifestStatusLog --> Employee : logged by
Carrier <-- Containerization : transported by
Containerization <--* Manifest : 1..*
Manifest <--* ManifestStatusLog : 1..*
Manifest <--* Waybill : 1..*
Waybill <--* WaybillStatusLog : 1..*
Waybill <--* Cargo : 1..*
Customer <-- Waybill : shipper
Customer <-- Waybill : consignee
Location <-- Waybill : destination
PaymentTerms <-- Waybill : payment_terms
Manifest --> Location : destination
```

## Model Specifications

### Cargo

- id- ID, Auto Generated
- waybill_id- ID, Foreign Key[Waybill], Required
- quantity- Integer[12], Required
- unit- String[20], Required
- description- String[100], Required
- declared_value- Decimal[11.2], Required
- length- Decimal[12.6], Optional
- width- Decimal[12.6], Optional
- height- Decimal[12.6], Optional
- weight- Decimal[10.4], Optional
- total_volume- Decimal[12.6], Optional
- charge_type- String[20], Optional
- volume_charge- Decimal[11.2], Optional
- weight_charge- Decimal[11.2], Optional
- additional_charge- Decimal[11.2], Optional

### Carrier

- id - ID, Auto Generated
- name - String[50], Required, Unique
- nickname - String[20], Optional
- address - String[100], Optional
- email - String[50], Unique, Optional
- contact_no - String[20], Optional
- contact_person - String[50], Optional
- notes - String[500], Optional

### Containerization

- id - ID, Auto Generated
- code - String[20], Required
- carrier_id - Integer[12], FK[Carrier], Required
- created_date - DateTime, Required

### Customer

- id - ID, Auto Generated
- name - String[50], Unique
- nickname - String[20], Unique, Optional
- address - String[100], Optional
- city - String[50], Optional
- country - String[50], Optional
- email - String[50], Optional
- contact_no - String[50], Optional
- rate_volume_charge - Decimal[11.2], Optional
- rate_weight_charge - Decimal[11.2], Optional
- rate_value_charge - Decimal[11.2], Optional
- notes - String[500], Optional

### Employee

- id - ID, Auto Generated
- last_name - String[30], Required
- first_name - String[50], Required
- middle_name - String[30], Optional
- email - String[80], Required
- local_office - String[20], Required

### Location

- code - ID
- description - String[50], Required

### Manifest

- id - ID, Auto Generated
- number - Integer[12], Unique, Required
- destination - String[20], Required
- container_id - ID, Foreign Key[Containerization], Optional
- total_volume - Decimal[12.6], Optional
- total_weight - Decimal[12,6], Optional
- checked_by - ID, Foriegn Key[Employee], Required
- created_date - DateTime, Required
- encoded_by - ID, Foriegn Key[Employee], Required
- encoded_on - DateTime, Required

### Manifest Status Log

- id - ID, Auto Generated
- manifest_id - ID, Foreign Key[Manifest], Required
- status_datetime - DateTime, Required
- status_current - String[20], Required
- location - String[50], Required
- logged_by - ID, Foreign Key[Employee], Required
- logged_on - DateTime, Required

### Payment Terms

- code - ID
- description - String[50], Required

### Waybill

- id - ID, Auto Generated
- number - Integer[12], Unique, Required
- shipper - Integer[12], Foreign Key[Customer], Required
- consigneee - Integer[12], Foreign Key[Customer], Required
- destination - String[20], Required
- origin_address - String[100], Optional
- destination_address - String[100], Optional
- created_date - DateTime, Required
- total_amount - Decimal[11.2], Optional
- total_weight_charge - Decimal[11.2], Optional
- total_value_charge - Decimal[11.2], Optional
- total_cu_msmt_charge - Decimal[11.2], Optional
- total_delivery_charge - Decimal[11.2], Optional
- total_vat - Decimal[11.2], Optional
- payment_terms - String[20], Optional
- notes - String[500], Optional
- manifest_id - Integer[12], Foreign Key[Manifest], Optional
- received_by - ID, Foreign Key[Employee], Required
- received_at - String[20], Required
- encoded_by - ID, Foreign Key[Employee], Required
- encoded_on - DateTime, Required

### Waybill Status Log

- id - ID, Auto Generated
- waybill_id - ID, Foreign Key[Waybill], Required
- status_datetime - DateTime, Required
- status_current - String[20], Required
- location - String[50], Required
- logged_by - ID, Foreign Key[Employee], Required
- logged_on - DateTime, Required
