const manifestsFields: string[][] = [
  ["date", "Date"],
  ["destination", "Destination"],
  ["carrierName", "Carrier Name"],
  ["containerCode", "Container Code"],
  ["waybillCount, Waybill Count"],
  ["volume", "Volume"],
  ["status", "Status"],
];

const manifests: { [key: string]: string | number }[] = [
  {
    date: "02/15/2024",
    destination: "CEBU",
    carrierName: "Customer 1",
    containerCode: "AR-000001",
    waybillCount: 3,
    volume: 10,
    status: "Recieved",
  },
  {
    date: "02/24/2024",
    destination: "CEBU",
    carrierName: "Customer 2",
    containerCode: "AR-000002",
    waybillCount: 3,
    volume: 14,
    status: "In Transit",
  },
  {
    date: "02/28/2024",
    destination: "BATTAAN",
    carrierName: "Customer 1",
    containerCode: "AR-000003",
    waybillCount: 3,
    volume: 18,
    status: "Recieved",
  },
];

export default function ManifestsTable() {
  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        {manifests?.map((manifest) => (
          <div
            key={manifest.containerCode}
            className="mb-2 w-full rounded-md bg-white p-4 hover:bg-gray-200"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <p>{manifest.date}</p>
                </div>
                <p className="text-sm text-gray-500">{manifest.carrierName}</p>
                <p className="text-sm text-gray-500">{manifest.destination}</p>
              </div>
              {manifest.containerCode}
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p>Volume Rate: {manifest.volume}</p>
                <p>Value Charge: {manifest.status}</p>
              </div>
              <div className="flex justify-end gap-2">
                <p className="text-blue-600">Edit</p>
                <p className="text-red-500">Delete</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Non-mobile view */}
      <table className="hidden w-full text-gray-900 md:table">
        <thead className="text-left text-sm font-normal bg-gray-500 text-white">
          <tr className="[&:first-child>th:first-child]:sm:pl-6 [&:first-child>th:first-child]:rounded-l-lg [&:first-child>th:last-child]:rounded-r-lg">
            {manifestsFields.map((field, idx) => {
              return (
                <th scope="col" className="px-4 py-5 font-medium" key={idx}>
                  {field[1]}
                </th>
              );
            })}
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {manifests?.map((manifest) => (
            <tr
              key={manifest.containerCode}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100"
            >
              {manifestsFields.map((field, idx) => {
                return (
                  <td className="whitespace-nowrap px-3 py-3" key={idx}>
                    {manifest[field[0]]}
                  </td>
                );
              })}
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <button className="border rounded px-1 text-blue-500 border-blue-500">
                    Edit
                  </button>
                  <button className="border rounded px-1 text-red-500 border-red-500">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
