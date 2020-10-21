interface Heading {
  fontFamily: string;
  lineHeight: string;
  fontWeight?: string;
  fontSize?: number;
  color?: string;
}

export interface Theme {
  space: number[];
  breakpoints: string[];
  fonts: {
    body: string;
    heading: string;
    monospace: string;
  };
  fontSizes: number[];
  fontWeights: {
    body: number;
    heading: number;
    bold: number;
  };
  lineHeights: {
    body: number;
    heading: number;
  };
  colors: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    mediumgrey: string;
    lightgrey: string;
    muted: string;
  };
  text: {
    heading: Heading;
    h1: Heading;
    h2: Heading;
    h3: Heading;
    h4: Heading;
    h5: Heading;
    h6: Heading;
  };
  layout: {
    container: {
      maxWidth: string;
    };
  };
  styles: {
    root: {
      fontFamily: string;
      lineHeight: string;
      fontWeight: string;
      minWidth: string;
      minHeight: string;
      backgroundImage: string;
      backgroundSize: string;
    };
    p: {
      color: string;
      fontFamily: string;
      fontWeight: string;
      lineHeight: string;
    };
    pre: {
      fontFamily: string;
      overflowX: string;
      code: {
        color: string;
      };
    };
    code: {
      fontFamily: string;
      fontSize: string;
    };
    table: {
      width: string;
      borderCollapse: string;
      borderSpacing: number;
    };
    th: {
      textAlign: string;
      borderBottomStyle: string;
    };
    td: {
      textAlign: string;
      borderBottomStyle: string;
    };
    img: {
      maxWidth: string;
    };
  };
  cards: {
    primary: {
      padding: number;
      borderRadius: number;
      backgroundColor: string;
      boxShadow: string;
    };
  };
  buttons: {
    primary: {
      color: string;
      bg: string;
      "&:hover": {
        bg: string;
      };
    };
    secondary: {
      color: string;
      bg: string;
    };
    text: {
      color: string;
      bg: string;
      fontWeight: string;
      p: number;
      "&:hover": {
        cursor: string;
      };
      "&:focus": {
        bg: string;
        outline: string;
      };
    };
  };
}

export interface ProjectType {
  id: string;
  title: string;
  city: string;
  description: string;
  devices?: Array<DeviceType>;
}

export interface DeviceType {
  description: string;
  id: number;
  latitude: number;
  longitude: number;
  ttnAppId: string;
  ttnDeviceId: string;
  records?: Array<RecordType>;
}

export interface RecordType {
  id: number;
  deviceId: number;
  recordedAt: string;
  value: number;
}

export interface DataTableType {
  data: Array<RecordType> | undefined;
  title: string | undefined;
}

export interface SummaryType {
  title: string;
  description: string;
  noOfDevices: number;
}

export interface DateValueType {
  date: Date;
  value: number;
}

export interface LineGraphType {
  width: number;
  height: number;
  data: Array<DateValueType>;
}

export interface RadioTabsType {
  name: string;
  options: Array<string>;
  changeHandler: (selected: string) => void;
}

export interface IconButtonType {
  value: string;
  iconSource: string;
  clickHandler?: (event: React.ChangeEvent<any>) => void;
}
