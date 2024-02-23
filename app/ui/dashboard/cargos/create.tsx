"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CargoItem {
  quantity: number | "";
  unit: string;
  description: string;
  length: number | "";
  width: number | "";
  height: number | "";
  weight: number | "";
  declaredValue: number | "";
}

export default function CreateCargos() {
  const router = useRouter();
  const [cargoItems, setCargoItems] = useState<CargoItem[]>([
    {
      quantity: "",
      unit: "",
      description: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      declaredValue: "",
    },
  ]);

  const addCargoItem = () => {
    const newCargoItem: CargoItem = {
      quantity: "",
      unit: "",
      description: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      declaredValue: "",
    };
    setCargoItems([...cargoItems, newCargoItem]);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const updatedCargoItems = cargoItems.map((item, i) => {
      if (index === i) {
        return { ...item, [event.target.name]: event.target.value };
      }
      return item;
    });
    setCargoItems(updatedCargoItems);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      className="fixed inset-0 z-10 w-screen overflow-y-auto"
      onClick={handleClose}
    >
      <div className="bg-black bg-opacity-50 h-full w-full">
        <div
          className="relative top-1/4 mx-auto p-5 border w-2/3 md:w-2/3 shadow-lg rounded-md bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Add to Cargo Pop-up</p>
            <div className="cursor-pointer z-50" onClick={handleClose}>
              <span>X</span>
            </div>
          </div>
          {/* Form */}
          {cargoItems.map((item, index) => (
            <div>
              <div key={index} className="grid grid-cols-3 gap-4">
                {/* QUANTITY */}
                <div className="flex flex-col">
                  <label htmlFor={`quantity-${index}`} className="mb-2">
                    QUANTITY
                  </label>
                  <input
                    id={`quantity-${index}`}
                    name="quantity"
                    type="number"
                    placeholder="Qty."
                    className="border p-2"
                    value={item.quantity}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                {/* UNIT */}
                <div className="flex flex-col">
                  <label htmlFor={`unit-${index}`} className="mb-2">
                    UNIT
                  </label>
                  <input
                    id={`unit-${index}`}
                    name="unit"
                    type="text"
                    placeholder="Unit"
                    className="border p-2"
                    value={item.unit}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col col-span-3 md:col-span-1">
                  <label htmlFor={`description-${index}`} className="mb-2">
                    DESCRIPTION
                  </label>
                  <textarea
                    id={`description-${index}`}
                    name="description"
                    placeholder="Description"
                    className="border p-2"
                    value={item.description}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>

              {/* NEXT ROW: VOLUME WEIGHT DECLARED VALUE */}
              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                {/* VOLUME */}
                <div>
                  <label htmlFor="volume" className="mb-2">
                    VOLUME
                  </label>
                  <div className="grid grid-cols-3 gap-2 col-span-3 md:col-span-1">
                    <div className="flex flex-col">
                      <input
                        id={`length-${index}`}
                        name="length"
                        type="number"
                        placeholder="Length"
                        className="border p-2"
                        value={item.length}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <span className="text-center mt-1">m.</span>
                    </div>
                    <div className="flex flex-col">
                      <input
                        id={`width-${index}`}
                        name="width"
                        type="number"
                        placeholder="Width"
                        className="border p-2"
                        value={item.width}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <span className="text-center mt-1">m.</span>
                    </div>
                    <div className="flex flex-col">
                      <input
                        id={`height-${index}`}
                        name="height"
                        type="number"
                        placeholder="Height"
                        className="border p-2"
                        value={item.height}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <span className="text-center mt-1">m.</span>
                    </div>
                  </div>
                </div>

                {/* WEIGHT */}
                <div>
                  <label htmlFor={`weight-${index}`} className="mb-2">
                    WEIGHT
                  </label>
                  <div className="flex flex-col col-span-3 md:col-span-1">
                    <input
                      id={`weight-${index}`}
                      name="weight"
                      type="number"
                      placeholder="Weight"
                      className="border p-2"
                      value={item.weight}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <span className="text-center mt-1">kg.</span>
                  </div>
                </div>

                {/* DECLARED VALUE */}
                <div>
                  <label htmlFor={`declaredValue-${index}`} className="mb-2">
                    DECLARED VALUE
                  </label>
                  <div className="flex flex-col col-span-3 md:col-span-1x">
                    <input
                      id={`declaredValue-${index}`}
                      name="declaredValue"
                      type="number"
                      placeholder="0.00"
                      className="border p-2"
                      value={item.declaredValue}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <span className="text-center text-sm mt-1">PHP</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Code in logic that duplicates another form below when the plusicon is pressed */}
          <div className="flex justify-center mb-4">
            <button
              onClick={addCargoItem}
              className="rounded-full bg-blue-500 text-white p-4"
            >
              <PlusIcon className="w-5" />
            </button>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleClose}
              className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
            >
              Cancel
            </button>
            <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
              Add Cargo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
