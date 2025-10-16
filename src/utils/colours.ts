/*
 See assets/palette.svg and ColourScheme.md for reference
 */

export const colours = {
    "russianViolet": "#0b043a",
    "blueCrayola": "#3672ff",
    "isabelline": "#f2eee7",
    "babyPowder": "#f9f8f5",
    "chocolateCosmos": "#630618",
};

export const colours_OKLCH = {
    "russianViolet": 'oklch(0.1776 0.0971 276.94)',
    "blueCrayola": 'oklch(0.596 0.2193 263.65)',
    "isabelline": 'oklch(0.9503 0.0103 81.79)',
    "babyPowder": 'oklch(0.9791 0.0041 91.45)',
    "chocolateCosmos": 'oklch(0.3208 0.1225 19.15)'
}


export function injectColours() {
    const root = document.documentElement;
    Object.entries(colours_OKLCH).forEach(([name, value]) => {
        root.style.setProperty(`--${name}`, value);
    });
}