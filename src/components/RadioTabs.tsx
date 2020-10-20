/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Box } from "theme-ui";
import { RadioTabsType } from "../common/interfaces";

export const RadioTabs: React.FC<RadioTabsType> = ({
  name,
  options,
  changeHandler,
}) => {
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
              marginLeft: i === 0 ? "0" : (theme) => `${theme.space[3]}px`,
            }}
          >
            <input
              type="radio"
              id={`${i}`}
              name={name}
              value={option}
              checked={checked === i}
              onChange={handleChange}
              sx={{
                opacity: 0,
                position: "absolute",
              }}
            />
            <label
              htmlFor={`${i}`}
              sx={{
                color: checked === i ? "primary" : "lightgrey",
                cursor: "pointer",
                transition: "all .1s ease-out",
                "&:hover": {
                  color: "primary",
                },
              }}
            >
              {option}
            </label>
          </div>
        );
      })}
    </Box>
  );
};
