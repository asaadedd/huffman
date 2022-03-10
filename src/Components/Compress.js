import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {compressFile} from "../huffman/compress";

function Compress() {
    const {register, formState: { errors }, handleSubmit, reset} = useForm();

    const onSubmit = (formValue) => {
        if (formValue.file?.[0]) {
            console.log(999);
            compressFile(formValue.file[0]);
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
        </Container>
    )
}

export default Compress