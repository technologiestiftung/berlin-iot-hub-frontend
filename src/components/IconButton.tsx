/** @jsx jsx */
import React from "react";
import { jsx, Box, Button, Image } from "theme-ui";

const handleDownload = () => {
  console.log("Download");
};

export const IconButton: React.FC<{
  value: string;
  iconSource: string;
  clickHandler?: (event: React.ChangeEvent<any>) => void;
}> = ({ value, iconSource }) => {
  return (
    <Button
      variant="text"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={handleDownload}
    >
      <Box
        bg="secondary"
        mr={2}
        sx={{
          display: "inline-block",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
        }}
      >
        <Image
          src={iconSource}
          alt="Download-Icon"
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>
      {value}
    </Button>
  );
};
