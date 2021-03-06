import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {getTextFromFile, saveFile} from "../huffman/file";
import {getTextFromBinary, getTextInBinary} from "../huffman/character";
import {useState} from "react";
import ShowMoreText from "react-show-more-text";
import {compressText} from "../huffman/compress";

function Compress() {
    const [binaryText, setBinaryText] = useState(null);
    const [huffmanCodeText, setHuffmanCodeText] = useState(null);
    const {register, formState: { errors }, handleSubmit} = useForm();

    const onSubmit = async (formValue) => {
        if (formValue.file?.[0]) {
            const file = formValue.file?.[0];
            const text = await getTextFromFile(file);
            const textInBinary = getTextInBinary(text);
            const textCompressed = compressText(text);
            saveFile(`${file.name.split('.')[0]}_encoded`, getTextFromBinary(textCompressed));

            setBinaryText({
                bitNumber: textInBinary.length,
                text: textInBinary
            });
            setHuffmanCodeText({
                bitNumber: textCompressed.length,
                text: textCompressed
            });
        }
    };
    return (
        <Container>
            <Form style={{ margin: "20px 100px" }} onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col lg="6">
                        <Form.Group controlId="file" className="mb-3">
                            <Form.Label>Fisierul de comprimat</Form.Label>
                            <input id="file" type="file" {...register("file", { required: true })} className="form-control" />
                            {errors.file && <div className="invalid-feedback" style={{display: "block"}}>Fisierul este obligatoriu.</div>}
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Button variant="primary" type="submit" style={{ marginTop: "25px"}}>
                            Comprima
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                {
                    binaryText && <Col lg="6">
                        <Card>
                            <Card.Body>
                                <Card.Title>Continut inainte de comprimare</Card.Title>
                                <Card.Text>
                                    <div>
                                        <span className="text-muted">Numar de biti : </span>
                                        <span>{binaryText.bitNumber}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted">Text in binar : </span>
                                        <ShowMoreText
                                            lines={2}
                                            more="Mai mult"
                                            less="Mai putin"
                                            anchorClass="my-anchor-css-class"
                                            expanded={false}
                                            width={280}
                                            truncatedEndingComponent={"... "}
                                        >{binaryText.text}</ShowMoreText>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                }
                {
                    huffmanCodeText && <Col lg="6">
                        <Card>
                            <Card.Body>
                                <Card.Title>Continut dupa de comprimare</Card.Title>
                                <Card.Text>
                                    <div>
                                        <span className="text-muted">Numar de biti : </span>
                                        <span>{huffmanCodeText.bitNumber}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted">Text in huffman : </span>
                                        <ShowMoreText
                                            lines={2}
                                            more="Mai mult"
                                            less="Mai putin"
                                            anchorClass="my-anchor-css-class"
                                            expanded={false}
                                            width={280}
                                            truncatedEndingComponent={"... "}
                                        >{huffmanCodeText.text}</ShowMoreText>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                }
            </Row>
        </Container>
    )
}

export default Compress