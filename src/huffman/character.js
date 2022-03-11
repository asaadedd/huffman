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

function getBinaryCodeForChar(char) {
    return char.charCodeAt(0).toString(2);
}

function sortByCharacterCountAsc(firstChar, secondChar) {
    return firstChar.count - secondChar.count;
}

