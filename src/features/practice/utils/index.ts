export function isTouchDevice() {
    return ("ontouchstart" in window || navigator.maxTouchPoints > 0);
}

export const shuffle = <T extends any[]>(array: T): T => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
