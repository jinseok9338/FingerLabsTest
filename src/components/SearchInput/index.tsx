import { useState } from "react";
import { validateNumber } from "../../helper";

interface SearchInputProps {
  onChange: (s: string) => void;
}

const SearchInput = ({ onChange }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const [warning, setWarning] = useState("");
  const clearWarning = () => setWarning("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!validateNumber(newValue)) {
      setWarning("숫자를 입력하시오");
      return; // If it's not a valid number, return early
    }
    clearWarning();
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="mb-2 w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="숫자를 입력하시오"
        className="px-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" // TailwindCSS classes
      />
      {warning && <p className="text-red-500">{warning}</p>}
    </div>
  );
};

export default SearchInput;
