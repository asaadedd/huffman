import {getTextFromFile} from "./file";
import {getCharactersInformationFromText} from "./util";
import {getCharMappingFromHuffmanTree, getHuffmanTree} from "./tree";

export async function compressFile(file) {
    const text = await getTextFromFile(file);
    const charactersInformation = getCharactersInformationFromText(text);
    const huffmanTree = getHuffmanTree(charactersInformation);
    const charactersMapping = getCharMappingFromHuffmanTree(huffmanTree);

    console.log(999, charactersMapping);

}

