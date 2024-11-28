async function loadCSS(path, styleElement) {
    try {
        const req = await fetch(path);
        const css = await req.text();
        styleElement.textContent = css;
    } catch (error) {
        console.error(`Error loading CSS at ${path}:`, error);
    }
}

const generateId = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date;
};

export { loadCSS, generateId };
