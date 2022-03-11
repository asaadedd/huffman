export function getHuffmanTree(charactersInformation) {
    // slice(0) is used to make a copy of the charactersInformation array so that we don't overwrite it
    const huffmanTreeElementsArray = charactersInformation.slice(0);
    const huffmanTreeArray = parseLastTwoElements(huffmanTreeElementsArray);

    if (huffmanTreeArray.length !== 1) {
        return null;
    }

    return huffmanTreeArray[0];
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