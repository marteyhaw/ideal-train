import clsx from "clsx";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ children, className, ...rest }: LabelProps) {
  return (
    <label
      {...rest}
      className={clsx(
        "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
        className,
      )}
    >
      {children}
    </label>
  );
}
