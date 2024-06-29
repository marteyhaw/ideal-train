const waybillsFields: string[][] = [
  ["date", "Date"],
  ["waybillNo", "Waybill No."],
  ["destination", "Destination"],
  ["cosignee", "Cosignee"],
  ["volume", "Volume"],
  ["status", "Status"],
];

const waybills: { [key: string]: string | number }[] = [
  {
    date: "02/15/2024",
    waybillNo: "AR-000001",
    destination: "CEBU",
    cosignee: "Customer 1",
    volume: 10,
    status: "Recieved",
  },
  {
    date: "02/24/2024",
    waybillNo: "AR-000002",
    destination: "CEBU",
    cosignee: "Customer 2",
    volume: 14,
    status: "In Transit",
  },
  {
    date: "02/28/2024",
    waybillNo: "AR-000003",
    destination: "BATTAAN",
    cosignee: "Customer 1",
    volume: 18,
    status: "Recieved",
  },
];

export default function WaybillsTable() {
  // const [waybills, setWaybills] = useState<
  //   { [key: string]: string | number }[]
  // >([]);

  // useEffect(() => {
  //   async function fetchWaybills() {
  //     try {
  //       const response = await fetch("http://localhost:8000/api/v1/waybills/");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setWaybills(data);
  //     } catch (error) {
  //       console.error("Failed to fetch customers:", error);
  //     }
  //   }

  //   fetchWaybills();
  // }, []);
  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        {waybills?.map((waybill) => (
          <div
            key={waybill.waybillNo}
            className="mb-2 w-full rounded-md bg-white p-4 hover:bg-gray-200"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <p>{waybill.date}</p>
                </div>
                <p className="text-sm text-gray-500">{waybill.cosignee}</p>
                <p className="text-sm text-gray-500">{waybill.destination}</p>
              </div>
              {waybill.waybillNo}
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p>Volume Rate: {waybill.volume}</p>
                <p>Value Charge: {waybill.status}</p>
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
            {waybillsFields.map((field, idx) => {
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
          {waybills?.map((waybill) => (
            <tr
              key={waybill.waybillNo}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100"
            >
              {waybillsFields.map((field, idx) => {
                return (
                  <td className="whitespace-nowrap px-3 py-3" key={idx}>
                    {waybill[field[0]]}
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
