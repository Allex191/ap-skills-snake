import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    gameScale: number;
    colors: {
      primary: string;
      secondary: string;
      uIBackgroundColor: string;
    };
  }
}
