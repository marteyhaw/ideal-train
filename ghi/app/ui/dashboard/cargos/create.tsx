"use client";

import { Label } from "../../forms/label";
import { Input } from "../../forms/input";
import { TextArea } from "../../forms/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCargo } from "../waybills/cargo-context";

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

  const { handleCargoSubmit } = useCargo();

  const [cargoItem, setCargoItem] = useState<CargoItem>({
    quantity: "",
    unit: "",
    description: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    declaredValue: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCargoItem({ ...cargoItem, [name]: value });
  };

  const handleSubmit = () => {
    // Convert string values to numbers where necessary and submit the cargo
    const submittedCargo = {
      ...cargoItem,
      quantity: cargoItem.quantity ? Number(cargoItem.quantity) : 0,
      length: cargoItem.length ? Number(cargoItem.length) : 0,
      width: cargoItem.width ? Number(cargoItem.width) : 0,
      height: cargoItem.height ? Number(cargoItem.height) : 0,
      weight: cargoItem.weight ? Number(cargoItem.weight) : 0,
      declaredValue: cargoItem.declaredValue
        ? Number(cargoItem.declaredValue)
        : 0,
    };

    handleCargoSubmit(submittedCargo); // Submit the cargo item
    router.back(); // Close the modal and go back
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
          <div className="grid grid-cols-3 gap-4">
            {/* QUANTITY */}
            <div className="flex flex-col">
              <Label htmlFor="quantity" className="mb-2">
                QUANTITY
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Qty."
                className="border p-2"
                value={cargoItem.quantity}
                onChange={handleChange}
              />
            </div>

            {/* UNIT */}
            <div className="flex flex-col">
              <Label htmlFor="unit" className="mb-2">
                UNIT
              </Label>
              <Input
                id="unit"
                name="unit"
                type="text"
                placeholder="Unit"
                className="border p-2"
                value={cargoItem.unit}
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col col-span-3 md:col-span-1">
              <Label htmlFor="description" className="mb-2">
                DESCRIPTION
              </Label>
              <TextArea
                id="description"
                name="description"
                placeholder="Description"
                className="border p-2"
                value={cargoItem.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* NEXT ROW: VOLUME WEIGHT DECLARED VALUE */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* VOLUME */}
            <div>
              <Label htmlFor="volume" className="mb-2">
                VOLUME
              </Label>
              <div className="grid grid-cols-3 gap-2 col-span-3 md:col-span-1">
                <div className="flex flex-col">
                  <Input
                    id="length"
                    name="length"
                    type="number"
                    placeholder="Length"
                    className="border p-2"
                    value={cargoItem.length}
                    onChange={handleChange}
                  />
                  <span className="text-center mt-1">m.</span>
                </div>
                <div className="flex flex-col">
                  <Input
                    id="width"
                    name="width"
                    type="number"
                    placeholder="Width"
                    className="border p-2"
                    value={cargoItem.width}
                    onChange={handleChange}
                  />
                  <span className="text-center mt-1">m.</span>
                </div>
                <div className="flex flex-col">
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="Height"
                    className="border p-2"
                    value={cargoItem.height}
                    onChange={handleChange}
                  />
                  <span className="text-center mt-1">m.</span>
                </div>
              </div>
            </div>

            {/* WEIGHT */}
            <div>
              <Label htmlFor="weight" className="mb-2">
                WEIGHT
              </Label>
              <div className="flex flex-col col-span-3 md:col-span-1">
                <Input
                  id="weifght"
                  name="weight"
                  type="number"
                  placeholder="Weight"
                  className="border p-2"
                  value={cargoItem.weight}
                  onChange={handleChange}
                />
                <span className="text-center mt-1">kg.</span>
              </div>
            </div>

            {/* DECLARED VALUE */}
            <div>
              <Label htmlFor="declaredValue" className="mb-2">
                DECLARED VALUE
              </Label>
              <div className="flex flex-col col-span-3 md:col-span-1x">
                <Input
                  id="declaredValue"
                  name="declaredValue"
                  type="number"
                  placeholder="0.00"
                  className="border p-2"
                  value={cargoItem.declaredValue}
                  onChange={handleChange}
                />
                <span className="text-center text-sm mt-1">PHP</span>
              </div>
            </div>
          </div>

          {/* Code in logic that duplicates another form below when the plusicon is pressed */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleClose}
              className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
            >
              Add Cargo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
