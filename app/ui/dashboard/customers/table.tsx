const customerFields: string[][] = [
  ["name", "Name"],
  ["city", "City"],
  ["email", "Email"],
  ["contactNo", "Contact No."],
  ["volumeRate", "Volume Rate"],
  ["valueCharge", "Value Charge"],
];

const customers: { [key: string]: string | number }[] = [
  {
    name: "Cebu Customer",
    city: "CEBU",
    email: "cebcust@gmail.com",
    contactNo: "0321234567",
    volumeRate: 2400,
    valueCharge: 10.0,
  },
  {
    name: "Manila Customer",
    city: "MANILA",
    email: "mnlcust@gmail.com",
    contactNo: "0321234567",
    volumeRate: 2400,
    valueCharge: 10.0,
  },
  {
    name: "Iloilo Customer",
    city: "ILOILO",
    email: "iloilocust@gmail.com",
    contactNo: "0321234567",
    volumeRate: 2400,
    valueCharge: 10.0,
  },
];

export default function CustomersTable() {
  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        {customers?.map((customer) => (
          <div
            key={customer.name}
            className="mb-2 w-full rounded-md bg-white p-4 hover:bg-gray-200"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="mb-2 flex items-center">
                  <p>{customer.name}</p>
                </div>
                <p className="text-sm text-gray-500">{customer.contactNo}</p>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
              {customer.city}
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p>Volume Rate: {customer.volumeRate}</p>
                <p>Value Charge: {customer.valueCharge}</p>
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
            {customerFields.map((field, idx) => {
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
          {customers?.map((customer) => (
            <tr
              key={customer.name}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100"
            >
              {customerFields.map((field, idx) => {
                return (
                  <td className="whitespace-nowrap px-3 py-3" key={idx}>
                    {customer[field[0]]}
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
