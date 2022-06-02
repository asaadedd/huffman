import {
    get32BitsBinaryFromInt,
    getBinaryCodeForChar,
    getTextInHuffmanCode, sortByCharacterCountAsc
} from "./character";
import {encodeHuffmanTree, getHuffmanTree} from "./tree";

export function compressText(text) {
    const charactersInformation = getCharactersInformationFromText(text);
    const huffmanTree = getHuffmanTree(charactersInformation);
    const charactersMapping = getCharMappingFromHuffmanTree(huffmanTree);
    const textInHuffman = getTextInHuffmanCode(text, charactersMapping);
    const encodedTree = encodeHuffmanTree(huffmanTree);
    const numberOfTree = get32BitsBinaryFromInt(encodedTree.length);

    return numberOfTree + encodedTree + textInHuffman;
}

function getCharactersInformationFromText(textFile) {
    const characters = textFile.split('');
    const characterMapping = new Map();

    characters.forEach((char) => {
        if (characterMapping.has(char)) {
            const currentCharacterInformation = characterMapping.get(char);
            characterMapping.set(char, {
                ...currentCharacterInformation,
                count: currentCharacterInformation.count + 1
            });
        } else {
            characterMapping.set(char, {
                character: char,
                count: 1,
                binaryCode: getBinaryCodeForChar(char)
            });
        }
    });

    const characterMappingArray = Array.from(characterMapping.values());

    return characterMappingArray.sort(sortByCharacterCountAsc);
}

function getCharMappingFromHuffmanTree(huffmanTree) {
    const mapping = new Map();

    addCharacterToMap(mapping, huffmanTree);

    return mapping;
}

function addCharacterToMap(mapping, element) {
    if (element.character) {
        mapping.set(element.character, element.huffmanCode);
    } else {
        if (element.left) {
            addCharacterToMap(mapping, element.left);
        }
        if (element.right) {
            addCharacterToMap(mapping, element.right);
        }
    }
}