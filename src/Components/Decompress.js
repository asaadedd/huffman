import {useState} from "react";
import {useForm} from "react-hook-form";
import {getTextFromFile, saveFile} from "../huffman/file";
import {getTextInBinary} from "../huffman/character";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import {decompressText} from "../huffman/decompress";

function Decompress() {
    const [text, setText] = useState(null);
    const {register, formState: { errors }, handleSubmit} = useForm();

    const onSubmit = async (formValue) => {
        if (formValue.file?.[0]) {
            const file = formValue.file?.[0];
            const text = await getTextFromFile(file);
            const textInBinary = getTextInBinary(text);
            const textCompressed = decompressText(textInBinary);
            saveFile(`${file.name.split('.')[0]}_decoded`, textCompressed);

            setText({
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
                            <Form.Label>Fisierul de decomprimat</Form.Label>
                            <input id="file" type="file" {...register("file", { required: true })} className="form-control" />
                            {errors.file && <div className="invalid-feedback" style={{display: "block"}}>Fisierul este obligatoriu.</div>}
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Button variant="primary" type="submit" style={{ marginTop: "25px"}}>
                            Decomprima
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                {
                    text && <Card>
                        <Card.Body>
                            <Card.Title>Continut inainte de comprimare</Card.Title>
                            <Card.Text>
                                <div>
                                    <span className="text-muted">Text : </span>
                                    <ShowMoreText
                                        lines={2}
                                        more="Mai mult"
                                        less="Mai putin"
                                        anchorClass="my-anchor-css-class"
                                        expanded={false}
                                        width={280}
                                        truncatedEndingComponent={"... "}
                                    >{text.text}</ShowMoreText>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                }
            </Row>
        </Container>
    )
}

export default Decompress