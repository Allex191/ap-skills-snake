import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    uIItemsScale: number;
    colors: {
      primary: string;
      secondary: string;
      uIBackground: string;
      optionsBorder: string;
      buttonStart: string;
    };
  }
}
