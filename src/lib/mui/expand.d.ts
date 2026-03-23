import {
    PaletteColor,
    SimplePaletteColorOptions
} from "@mui/material/styles";

type TailwindColor = Partial<{
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
}>

declare module "@mui/material/styles" {

    interface Palette {
        button: PaletteColor;
        muted: PaletteColor;
        emerald: TailwindColor;
        amber: TailwindColor;
        cyan: TailwindColor;
        red: TailwindColor;
        violet: TailwindColor;
    }

    interface PaletteOptions {
        button: SimplePaletteColorOptions;
        muted: SimplePaletteColorOptions;
        emerald: TailwindColor;
        amber: TailwindColor;
        cyan: TailwindColor;
        red: TailwindColor;
        violet: TailwindColor;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        button: true;
        muted: true;
        emerald: true;
        amber: true;
        cyan: true;
        red: true;
        violet: true;
    }
}

declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
        button: true;
        muted: true;
        emerald: true;
        amber: true;
        cyan: true;
        red: true;
        violet: true;
    }
}

