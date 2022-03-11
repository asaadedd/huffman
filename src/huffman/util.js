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

function getBinaryCodeForChar(char) {
    return char.charCodeAt(0).toString(2);
}

function sortByCharacterCountAsc(firstChar, secondChar) {
    return firstChar.count - secondChar.count;
}
