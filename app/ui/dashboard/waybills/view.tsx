"use client";

import { Label } from "@/app/ui/forms/label";

export default function ViewWaybill({ waybill }: { waybill: Waybill }) {
  return (
    <>
      <div className="w-full">
        <div className="w-1/3 mb-3">
          <Label htmlFor="waybill-no">Waybill No.</Label>
          <p>{waybill.waybillNumber}</p>
        </div>
        {/* Top Section */}
        <div className="flex flex-wrap -mx-3 mb-3">
          {/* Consignee & Address */}
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="consignee-address">Consignee</Label>
              <p>{waybill.cosignee}</p>
            </div>

            <div className="block mb-3">
              <Label htmlFor="consignee-address">Address</Label>
              <p>{waybill.cosigneeAddress}</p>
            </div>
          </div>

          {/* Destination & Date */}
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="date">Destination</Label>
              <p>{waybill.destination}</p>
            </div>
            <div className="block mb-3">
              <Label htmlFor="date">Date</Label>
              <p>{waybill.date}</p>
            </div>
          </div>
        </div>

        {/* Cargo List */}
        {waybill.cargos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Unit
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Volume
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Weight
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-3 text-left border-black"
                  >
                    Declared Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {waybill.cargos.map((cargo, index) => (
                  <tr className="border-b" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-black">
                      {cargo.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.length * cargo.width * cargo.height}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      {cargo.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-black">
                      PHP {cargo.declaredValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex w-full h-64 bg-gray-50 mb-3">
            <div className="flex items-center m-auto rounded-md border p-2 hover:bg-gray-100 ">
              <span>No Cargo Available</span>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="flex flex-wrap -mx-3 mb-3">
          {/* Shipper & Address */}
          <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="shipper-address">Shipper</Label>
              <p>{waybill.shipper}</p>
            </div>

            <div className="block mb-3">
              <Label htmlFor="shipper-address">Address</Label>
              <p>{waybill.shipperAddress}</p>
            </div>
          </div>

          {/* Received At & By */}
          <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
            <div className="block mb-3">
              <Label htmlFor="received">Recieved at</Label>
              <p>{waybill.receivedAt}</p>
            </div>
            <div className="block mb-3">
              <Label htmlFor="received">Recieved by</Label>
              <p>{waybill.receivedBy}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="float-right rounded-md border px-3 py-2 text-white transition-colors bg-green-500 hover:bg-green-600 ">
        <span>Edit Waybill</span>
      </button>
    </>
  );
}
