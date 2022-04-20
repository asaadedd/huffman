import {getBinaryCodeForChar, getCharForBinaryCode} from "./character";

export function getHuffmanTree(charactersInformation) {
    const huffmanTreeElementsArray = charactersInformation.slice(0);
    const huffmanTreeArray = parseLastTwoElements(huffmanTreeElementsArray);

    if (huffmanTreeArray.length !== 1) {
        return null;
    }

    return huffmanTreeArray[0];
}

export function getCharacterFromHuffmanTree(text, tree) {
    let currentChar = text[0];
    let remainingText = text.slice(1);
    let currentTreeNode = tree;

    while (!currentTreeNode.character) {
        if (currentChar === '0') {
            currentTreeNode = currentTreeNode.left;
        } else {
            currentTreeNode = currentTreeNode.right;
        }
        currentChar = remainingText[0];
        remainingText = remainingText.slice(1);
    }

    return currentTreeNode.character;
}

export function encodeHuffmanTree(huffmanTree) {
    const isLeafNode = !!huffmanTree.character;
    if (isLeafNode) {
        return `0${getBinaryCodeForChar(huffmanTree.character)}`;
    } else {
        return `1${encodeHuffmanTree(huffmanTree.left)}${encodeHuffmanTree(huffmanTree.right)}`;
    }
}

export function decodeHuffmanTree(encodeDef, lastHuffmanCode) {
    const encodedHuffmanTree = encodeDef.code;
    const currentChar = encodedHuffmanTree[0];

    encodeDef.code = encodedHuffmanTree.slice(1);

    if (currentChar === '0') {
        const characterInBinary = encodeDef.code.slice(0, 16);
        encodeDef.code = encodeDef.code.slice(16);

        return {
            character: getCharForBinaryCode(characterInBinary),
            binaryCode: characterInBinary,
            huffmanCode: lastHuffmanCode
        };
    } else if (currentChar === '1') {
        const left = decodeHuffmanTree(encodeDef, `${lastHuffmanCode || ''}0`);
        const right = decodeHuffmanTree(encodeDef, `${lastHuffmanCode || ''}1`);
        return {
            character: '',
            left,
            right,
            huffmanCode: lastHuffmanCode
        };
    }
}

function parseLastTwoElements(huffmanArray) {
    if (huffmanArray.length >= 2) {
        const leftSideChar = huffmanArray.pop();
        const rightSideChar = huffmanArray.pop();

        updateHuffmanCode(leftSideChar, '0');
        updateHuffmanCode(rightSideChar, '1');

        const parentChar = {
            character: '',
            count: leftSideChar.count + rightSideChar.count,
            huffmanCode: '',
            left: leftSideChar,
            right: rightSideChar,
        };
        const indexOfCharWithBiggerCount = huffmanArray.findIndex((char) => char.count > parentChar.count);
        const indexOfParentChar = indexOfCharWithBiggerCount + 1;

        addToArrayAtIndex(huffmanArray, indexOfParentChar, parentChar);

        return parseLastTwoElements(huffmanArray);
    } else {
        return huffmanArray;
    }
}

function updateHuffmanCode(characterInformation, newHuffmanCode) {
    characterInformation.huffmanCode = newHuffmanCode;

    if (characterInformation.left) {
        updateHuffmanCode(characterInformation.left, `${newHuffmanCode}0`);
    }

    if (characterInformation.right) {
        updateHuffmanCode(characterInformation.right, `${newHuffmanCode}1`);
    }
}

function addToArrayAtIndex(array, index, element) {
    array.splice(index, 0, element);
}