import Select from "react-dropdown-select";
import { options, traitTypes } from "../../consts";
import { makeOptions } from "../../helper";

interface DropDownMenusProps {
  onChange: (title: traitTypes, values: string[]) => void;
}

function DropDownMenus({ onChange }: DropDownMenusProps) {
  const optionsMap = Object.entries(options).map((entry) => {
    const [key, value] = entry;
    return { title: key as traitTypes, options: makeOptions(value) };
  });

  return (
    <div className="mt-2 mb-2">
      {optionsMap.map((option) => (
        <>
          <h2 className="mb-1">{option.title}</h2>
          <Select
            clearable
            multi
            name="colors"
            options={option.options}
            className="basic-multi-select"
            values={[]}
            onChange={function (values: { value: string; label: string }[]) {
              const valuesString = values.map((value) => value.value);
              onChange(option.title, valuesString);
            }}
          />
        </>
      ))}
    </div>
  );
}

export default DropDownMenus;
