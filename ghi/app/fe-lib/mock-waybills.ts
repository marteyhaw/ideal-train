// interface Carrier {
//   id?: number;
//   name: string;
//   nickname: string;
//   address: string;
//   email: string;
//   contact_no: string;
//   contact_person: string;
//   notes: string;
// }

// interface Containerization {
//   id?: number;
//   code: string;
//   carrier_id: Carrier;
//   created_date: Date;
// }

// interface Manifest {
//   id?: number;
//   number: number;
//   destination: string;
//   conatiner_id: Containerization;
//   total_volume: number;
//   total_weight: number;
//   checked_by: Employee;
//   created_date: Date;
//   encoded_by: Employee;
//   encoded_on: Date;
// }

// interface WaybillCargo {
//   id?: number;
//   quantity: number;
//   unit: number;
//   description: string;
//   length: number;
//   width: number;
//   height: number;
//   weight: number;
//   declaredValue: number;
//   total_volume: number;
//   charge_type: string;
//   volume_charge: number;
//   weight_charge: number;
//   additional_charge: number;
// }

// interface Waybill {
//   id?: number;
//   number: number;
//   destination: string;
//   shipper: Customer;
//   consignee: Customer;
//   origin_address: string;
//   destination_address: string;
//   created_date: Date;
//   total_amount: number;
//   total_weight_charge: number;
//   total_value_charge: number;
//   total_cu_msmt_charge: number;
//   total_delivery_charge: number;
//   total_vat: number;
//   payment_terms: string;
//   notes: string;
//   manifest_id: Manifest;
//   received_by: Employee;
//   received_at: number;
//   encoded_by: Employee;
//   encoded_on: Date;
//   cargos: WaybillCargo[];
// }

// interface Customer {
//   id?: number;
//   name: string;
//   nickname: string;
//   address: string;
//   city: string;
//   country: string;
//   email: string;
//   contact_no: string;
//   rate_volume_charge: number;
//   rate_weigh_charge: number;
//   rate_value_charge: number;
//   notes: string;
// };

// type Employee = {
//   id?: number;
//   last_name: string;
//   first_name: string;
//   middle_name: string;
//   email: string;
//   local_office: string;
// };
