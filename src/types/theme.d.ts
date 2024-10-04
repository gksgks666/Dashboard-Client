// 기존 mui 라이브러리에 create.palette.d.ts에 없는 값들을 직접 추가해준다. (0,50,100, ...)

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    alt: string;
  }
  interface PaletteColor {
    0?: string;
    10?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }
  interface SimplePaletteColorOptions {
    0?: string;
    10?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }
}
