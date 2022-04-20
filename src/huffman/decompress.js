import {getIntFrom32BitsBinary, getTextFromHuffmanCode} from "./character";
import {decodeHuffmanTree} from "./tree";

export function decompressText(text) {
    const length = getHuffmanTreeLength(text);
    const encodedHuffmanTree = text.slice(32, 32 + length);
    const huffmanTree = decodeHuffmanTree({ code: encodedHuffmanTree });
    const charMapping = getHuffmanTreeMappingFromChar(huffmanTree);

    return getTextFromHuffmanCode(text.slice(32 + length), huffmanTree, charMapping);
}

function getHuffmanTreeLength(text) {
    const lengthInBinary = text.slice(0, 32);

    return getIntFrom32BitsBinary(lengthInBinary);
}

function getHuffmanTreeMappingFromChar(huffmanTree) {
    const mapping = new Map();

    addCharacterToMap(mapping, huffmanTree);

    return mapping;
}

function addCharacterToMap(mapping, element) {
    if (element.character) {
        mapping.set(element.character, element.huffmanCode.length);
    } else {
        if (element.left) {
            addCharacterToMap(mapping, element.left);
        }
        if (element.right) {
            addCharacterToMap(mapping, element.right);
        }
    }
}