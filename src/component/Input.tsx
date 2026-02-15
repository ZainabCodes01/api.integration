
import { forwardRef } from "react";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", placeholder, error, ...rest }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          className="border border-gray-300 p-2 rounded w-full "
          {...rest}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
