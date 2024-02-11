import clsx from "clsx";
import { Label } from "@/app/ui/forms/label";

type OptionField = {
  id: number;
  name: string;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  selectOptions: OptionField[];
}

export function Select({
  className,
  id,
  label,
  selectOptions,
  ...rest
}: SelectProps) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <select
          {...rest}
          className={clsx(
            "block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
            className,
          )}
          id={id}
        >
          <option value="" disabled>
            Select a {label.toLowerCase()}
          </option>
          {selectOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
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
    </>
  );
}
