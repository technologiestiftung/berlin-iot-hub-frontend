/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Box } from "theme-ui";

export const RadioTabs: React.FC<{
  name: string;
  options: Array<string>;
  changeHandler: (selected: string) => void;
}> = ({ name, options, changeHandler }) => {
  const [checked, setChecked] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(options.indexOf(event.target.value));
    changeHandler(event.target.value);
  };

  return (
    <Box>
      {options.map((option: string, i: number) => {
        return (
          <div
            key={i}
            sx={{
              display: "inline-block",
            }}
          >
            <input
              type="radio"
              id={`${i}`}
              name={name}
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
