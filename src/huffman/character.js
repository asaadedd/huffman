import {getCharacterFromHuffmanTree} from "./tree";

export function getTextInBinary(text) {
    const characters = text.split('');

    return characters.map((char) => getBinaryCodeForChar(char)).join('');
}

export function getTextFromBinary(binary) {
    let remainingBinaryText = binary.slice(16);
    let currentChar = getCharForBinaryCode(binary.slice(0, 16));
    let text = currentChar;

    while (remainingBinaryText.length) {
        currentChar = getCharForBinaryCode(remainingBinaryText.slice(0, 16));
        text = text + currentChar;
        remainingBinaryText = remainingBinaryText.slice(16);
    }

    return text;
}

export function getTextInHuffmanCode(text, mapping) {
    const characters = text.split('');

    return characters.map((char) => mapping.get(char)).join('');
}

export function getTextFromHuffmanCode(text, huffmanTree, mapping) {
    let char = getCharacterFromHuffmanTree(text, huffmanTree);
    let remainingText = text.slice(mapping.get(char));
    let decodedText = char;

    while(remainingText.length) {
        char = getCharacterFromHuffmanTree(remainingText, huffmanTree);
        remainingText = remainingText.slice(mapping.get(char));
        decodedText = decodedText + char;
    }

    return decodedText;
}

export function getBinaryCodeForChar(char) {
    let binary = char.charCodeAt(0).toString(2);
    while (binary.length < 16) {
        binary = `0${binary}`;
    }
    return binary;
}

export function get32BitsBinaryFromInt(number) {
    let binary = number.toString(2);
    while (binary.length < 32) {
        binary = `0${binary}`;
    }
    return binary;
}

export function getIntFrom32BitsBinary(binary) {
    return parseInt(binary, 2);
}

export function getCharForBinaryCode(binaryCode) {
    return String.fromCharCode(parseInt(binaryCode, 2));
}

export function sortByCharacterCountAsc(firstChar, secondChar) {
    return firstChar.count - secondChar.count;
}

