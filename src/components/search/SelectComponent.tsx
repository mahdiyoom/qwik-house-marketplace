import type { PropFunction} from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

interface SelectProps {
  options: any[];
  value: any;
  onChange: PropFunction<() => void>;
  placeholder: string;
}

export const SelectComponent = component$(
  ({ options, value, onChange, placeholder }: SelectProps) => {
    return (
      <select value={value} onChange$={onChange} placeholder={placeholder}>
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.value}
          </option>
        ))}
      </select>
    );
  }
);
