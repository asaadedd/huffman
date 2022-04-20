export function getTextFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export function saveFile(name, file) {
    const aElement = document.createElement('a');
    aElement.href = window.URL.createObjectURL(new Blob([file], { type: 'text/plain' }));
    aElement.download = `${name}.txt`;
    aElement.click();
}