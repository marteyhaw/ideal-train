import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ children, className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={clsx(
        "appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
        className,
      )}
    />
  );
}
