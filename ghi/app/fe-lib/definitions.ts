type IconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
  React.RefAttributes<SVGSVGElement>;

type IconProps = IconSVGProps & {
  title?: string;
  titleId?: string;
};

type Icon = React.FC<IconProps>;

export type CustomerField = {
  id: number;
  name: string;
};

export type LocationField = {
  id: number;
  name: string;
};

export type EmployeeField = {
  id: number;
  name: string;
};

export type DestinationField = {
  id: number;
  name: string;
};

export type CarrierField = {
  id: number;
  name: string;
};

export type SideNavItem = {
  title: string;
  path: string;
  icon?: Icon;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

// Employee
export interface EmployeeBase {
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
}

export interface EmployeeCreate extends EmployeeBase {
  local_office: string;
}

export interface Employee extends EmployeeBase {
  id: string;
}

// Customers
export interface CustomerBase {
  name: string;
  email: string;
  contact_no: string;
}

export interface CustomerCreate extends CustomerBase {
  nickname: string;
  address: string;
  city: string;
  country: string;
  rate_volume_charge: number;
  rate_weigh_charge: number;
  rate_value_charge: number;
  notes: string;
}

export interface Customer extends CustomerBase {
  id: string;
}

// Carrier
export interface CarrierBase {
  name: string;
  email: string;
  contact_no: string;
}

export interface Carrier extends CarrierBase {
  id: string;
  nickname: string;
  address: string;
  contact_person: string;
  notes: string;
}

// Containerization
export interface Containerization {
  id?: string;
  code: string;
  carrier_id: Carrier;
  created_date: Date;
}

// Waybill
export interface WaybillBase {
  number: number;
  destination: string;
  shipper: Customer;
  consignee: Customer;
  created_date: Date;
  received_by: Employee;
  received_at: number;
  encoded_by: Employee;
  encoded_on: Date;
  cargos: WaybillCargo[];
}

export interface WaybillCreate extends WaybillBase {
  origin_address: string;
  destination_address: string;
  total_amount: number;
  total_weight_charge: number;
  total_value_charge: number;
  total_cu_msmt_charge: number;
  total_delivery_charge: number;
  total_vat: number;
  payment_terms: string;
  notes: string;
  manifest_id: Manifest;
}

export interface Waybill extends WaybillBase {
  id: string;
}

// Cargo
export interface WaybillCargo {
  id?: string;
  waybill_id: Waybill;
  quantity: number;
  unit: string;
  description: string;
  declared_value: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  total_volume: number;
  charge_type: string;
  volume_charge: number;
  weight_charge: number;
  additional_charge: number;
}

// Manifest

export interface ManifestBase {
  number: number;
  destination: string;
}

export interface ManifestCreate extends ManifestBase {
  conatiner_id?: Containerization;
  total_volume?: number;
  total_weight?: number;
  checked_by: Employee;
  created_date: Date; //When the waybill is created (in person)
  encoded_by: Employee;
  encoded_on: Date; //When the waybill is entered into the website
}

export interface Manifest extends ManifestBase {
  id: string;
}
