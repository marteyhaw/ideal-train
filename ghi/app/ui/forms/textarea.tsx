import clsx from "clsx";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <textarea
      {...rest}
      className={clsx(
        "appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
        className,
      )}
    />
  );
}
