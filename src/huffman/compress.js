import {getBase64} from "./file";

export async function compressFile(file) {
    console.log(22, file);
    const fileText = await getBase64(file)
    console.log(11, fileText);
}