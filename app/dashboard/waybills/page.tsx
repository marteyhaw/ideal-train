import { roboto } from "@/app/ui/fonts";
import { PlusIcon } from "@heroicons/react/24/outline";

const customers = [
  { id: 1, name: "Customer #1" },
  { id: 2, name: "Customer #2" },
  { id: 3, name: "Customer #3" },
];

const offices = [
  { id: 1, name: "City #1" },
  { id: 2, name: "City #2" },
  { id: 3, name: "City #3" },
];

const employees = [
  { id: 1, name: "Employee #1" },
  { id: 2, name: "Employee #2" },
  { id: 3, name: "Employee #3" },
];

export default async function Page() {
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Create Waybill
      </h1>
      <form>
        <div className="w-full">
          {/* Top Section */}
          <div className="flex flex-wrap -mx-3 mb-3">
            {/* Consignee & Address */}
            <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
              <div className="block mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="consignee"
                >
                  Consignee
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="consignee"
                    name="consignee"
                  >
                    <option value="" disabled>
                      Select a customer
                    </option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="block mb-3">
                <label
                  className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="consignee-address"
                >
                  Address
                </label>
                <textarea
                  className="appearance-none flex w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="consignee-address"
                  name="consignee-address"
                  rows={4}
                />
              </div>
            </div>

            {/* Destination & Date */}
            <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
              <div className="block mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="destination"
                >
                  Destination
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="destination"
                    name="destination"
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    {offices.map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="block mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  type="date"
                />
              </div>
            </div>
          </div>

          {/* Cargo List */}
          <div className="flex w-full h-64 bg-gray-50 mb-3">
            <button className="flex items-center m-auto rounded-md border p-2 hover:bg-gray-100 ">
              <PlusIcon className="w-5" />
              <span>Add to Cargo</span>
            </button>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-wrap -mx-3 mb-3">
            {/* Shipper & Address */}
            <div className="w-full md:w-2/3 px-3 mb-3 md:mb-0">
              <div className="block mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shipper"
                >
                  Shipper
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="shipper"
                    name="shipper"
                  >
                    <option value="" disabled>
                      Select a customer
                    </option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="block mb-3">
                <label
                  className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shipper-address"
                >
                  Address
                </label>
                <textarea
                  className="appearance-none flex w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="shipper-address"
                  name="shipper-address"
                  rows={4}
                />
              </div>
            </div>

            {/* Received At & By */}
            <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
              <div className="block mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="received-at"
                >
                  Received At
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="received-at"
                    name="received-at"
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    {offices.map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="block mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="received-by"
                >
                  Received By
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="received-by"
                    name="received-by"
                  >
                    <option value="" disabled>
                      Select an employee
                    </option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="float-right rounded-md border px-3 py-2 text-white transition-colors bg-green-500 hover:bg-green-600 ">
          <span>Create Waybill</span>
        </button>
      </form>
    </main>
  );
}
