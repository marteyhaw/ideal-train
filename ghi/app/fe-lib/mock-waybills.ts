interface WaybillCargo {
  quantity: number;
  unit: number;
  description: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  declaredValue: number;
}

interface Waybill {
  waybillNo: string;
  consignee: string;
  consigneeAddress: string;
  destination: string;
  date: string;
  cargos: WaybillCargo[];
  shipper: string;
  shipperAddress: string;
  receivedAt: string;
  receivedBy: string;
  volumeCharge: number;
  valueCharge: number;
  miscCharge: number;
  weightCharge: number;
  deliveryCharge: number;
  valueAddedTax: number;
}

type Customer = {
  name: string;
  nickname: string;
  address: string;
  city: string;
  country: string;
  email: string;
  contact_no: string;
  rate_volume_charge: number;
  rate_weigh_charge: number;
  rate_value_charge: number;
  notes: string;
};
