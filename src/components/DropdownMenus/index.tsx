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
      {optionsMap.map((option, index) => (
        <div key={option.title + index}>
          <h2 className="mb-1">{option.title}</h2>
          <Select
            clearable
            multi
            placeholder={`${option.title}을 선택하시오`}
            name="colors"
            options={option.options}
            className="basic-multi-select"
            values={[]}
            onChange={function (values: { value: string; label: string }[]) {
              const valuesString = values.map((value) => value.value);
              onChange(option.title, valuesString);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default DropDownMenus;
