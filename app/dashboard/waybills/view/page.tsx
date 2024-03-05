import { roboto } from "@/app/ui/fonts";
import ViewWaybill from "@/app/ui/dashboard/waybills/view";

const MOCK_WAYBILL: Waybill = {
  waybillNumber: "WB-001234",
  cosignee: "John",
  cosigneeAddress: "123 Wallaby Way",
  destination: "Cebu",
  date: "Feburary 29, 2024",
  cargos: [
    {
      quantity: 5,
      unit: 53,
      description: "Glass containers",
      length: 8,
      width: 6,
      height: 6,
      weight: 38,
      declaredValue: 21.5,
    },
    {
      quantity: 30,
      unit: 15,
      description: "Chips",
      length: 8,
      width: 6,
      height: 6,
      weight: 24,
      declaredValue: 18.35,
    },
  ],
  shipper: "Rodriguez",
  shipperAddress: "583 Santana Ave",
  receivedAt: "Manila",
  receivedBy: "George",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        View Waybill
      </h1>
      <ViewWaybill waybill={MOCK_WAYBILL} />
    </main>
  );
}
