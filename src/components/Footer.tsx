/** @jsx jsx */
import React from "react";
import { jsx, Link } from "theme-ui";

export const Footer: React.FC = () => {
  return (
    <footer
      sx={{
        bg: "background",
        p: 4,
        mt: 6,
        display: "flex",
        justifyContent: "flex-end",
        "> a": {
          color: "mediumgrey",
          textDecoration: "none",
          "&:hover": {
            color: "text",
          },
        },
      }}
    >
      <Link
        href="https://www.technologiestiftung-berlin.de/de/impressum/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Impressum
      </Link>
      <Link
        href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
        target="_blank"
        rel="noopener noreferrer"
        ml={3}
      >
        Datenschutz
      </Link>
    </footer>
  );
};
