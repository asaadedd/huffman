export function getCharMappingFromHuffmanTree(huffmanTree) {
    const mapping = new Map();

    addCharacterToMap(mapping, huffmanTree);

    return mapping;
}

export function getCharactersInformationFromText(textFile) {
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

export function getTextInBinary(text) {
    const characters = text.split('');

    return characters.map((char) => getBinaryCodeForChar(char)).join('');
}

export function getTextInHuffmanCode(text, mapping) {
    const characters = text.split('');

    return characters.map((char) => mapping.get(char)).join('');

}

export function getBinaryCodeForChar(char) {
    let binary = char.charCodeAt(0).toString(2);
    while (binary.length < 16) {
        binary = `0${binary}`;
    }
    return binary;
}

export function getCharForBinaryCode(binaryCode) {
    return String.fromCharCode(parseInt(binaryCode, 2));
}

export function popLastCharacter(text) {
    const char = text[text.length - 1];

    text = text.slice(0, -1);

    return char;
}

export function popLastNCharacter(text, numberOfChar) {
    const char = text[text.length - numberOfChar];

    text = text.slice(0, -numberOfChar);

    return char;
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

function sortByCharacterCountAsc(firstChar, secondChar) {
    return firstChar.count - secondChar.count;
}

