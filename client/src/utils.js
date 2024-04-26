const lightenColor = (color, percent) => {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.substring(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    };

    // Convert RGB to hex
    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const [r, g, b] = hexToRgb(color);
    const newR = Math.min(255, r + (255 - r) * percent);
    const newG = Math.min(255, g + (255 - g) * percent);
    const newB = Math.min(255, b + (255 - b) * percent);
    return rgbToHex(newR, newG, newB);
};

export default lightenColor