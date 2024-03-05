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
  waybillNumber: string;
  cosignee: string;
  cosigneeAddress: string;
  destination: string;
  date: string;
  cargos: WaybillCargo[];
  shipper: string;
  shipperAddress: string;
  receivedAt: string;
  receivedBy: string;
}
