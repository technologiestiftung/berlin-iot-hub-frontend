interface Theme {
  space: number[];
  breakpoints: string[];
  fonts: any;
  fontSizes: number[];
  fontWeights: any;
  lineHeights: any;
  colors: any;
  text: any;
  layout: any;
  styles: any;
  cards: any;
}

const theme: Theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: ["768px", "1024px", "1408px"],
  fonts: {
    body:
      '"IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 16, 20, 24, 32, 48, 64, 72, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: "#2F2F2F",
    background: "#fff",
    primary: "#1E3791",
    secondary: "#E60032",
    muted: "#F9F9F9",
  },
  text: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
    },
    h1: {
      color: "primary",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "body",
      fontSize: 4,
    },
    h3: {
      color: "primary",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 0,
    },
  },
  layout: {
    container: {
      maxWidth: "1216px",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundImage: "url('/images/tsb-background.svg')",
      backgroundSize: "cover",
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 0,
      backgroundColor: "background",
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
    },
  },
};

export default theme;
