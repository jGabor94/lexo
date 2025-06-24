import {
    PaletteColor,
    SimplePaletteColorOptions
} from "@mui/material/styles";

declare module "@mui/material/styles" {

    interface Palette {
        button: PaletteColor;

    }

    interface PaletteOptions {
        button: SimplePaletteColorOptions;

    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        button: true;
    }
}