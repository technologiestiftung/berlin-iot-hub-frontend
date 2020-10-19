/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Box } from "theme-ui";

export const RadioTabs: React.FC<{
  options: Array<string>;
  changeHandler: (selected: string) => void;
}> = ({ options, changeHandler }) => {
  const [checked, setChecked] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(options.indexOf(event.target.value));
    changeHandler(event.target.value);
  };

  return (
    <Box>
      {options.map((option: string, i: number) => {
        return (
          <div key={i}>
            <input
              type="radio"
              id={`${i}`}
              name="options"
              value={option}
              checked={checked === i}
              onChange={handleChange}
            />
            <label htmlFor={`${i}`}>{option}</label>
          </div>
        );
      })}
    </Box>
  );
};
