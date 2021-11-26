import { FormEvent, useState, useEffect } from "react";
import './GameCard.css'
import { Container, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';

type QuestionData = {
    question: string;
    answer: string;
};

const GameCard = () => {

    const [isCorrect, setIsCorrect] = useState(false);
    const [answer, setAnswer] = useState("");
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [data, setData] = useState<QuestionData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jservice.io/api/random")
            .then(res => res.json())
            .then(res => {
                const q:QuestionData = {
                    question : res[0].question && res[0].question,
                    answer : res[0].answer && res[0].answer
                }
                setData(q)
                setLoading(false);
                setAnswer("");
            })
            .catch((err) => { 
                console.error("Error occured while fetching the question: ",err);
            })

    }, [isCorrect])

    const checkAnswer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (answer === data?.answer) {
            setMsg("Good! Your answer is correct");
            setIsCorrect(!isCorrect);
            setShow(true);
        } else {
            setMsg("OOPS! Your answer is wrong. Correct answer is "+data?.answer);
            setIsCorrect(!isCorrect);
            setShow(true);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }


    return (
        <Container>
                    <Card className="text-center">
                        <Card.Header className="display-3">Trivia Game</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <span className="text-secondary mx-2">Question:</span>
                                {loading && 
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading Question...
                                    </span>
                                </Spinner>}{data?.question}
                            </Card.Title>
                            <Card.Text>
                                <Form onSubmit={checkAnswer}>
                                    <Form.Group className="m-3" controlId="formAnswer">
                                        <Form.Control type="text" placeholder="Enter Answer" value={answer} onChange={handleChange} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" disabled={!answer}>
                                        Submit
                                    </Button>
                                    <Alert className="mt-3" variant="dark" show={show}>{msg}</Alert>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
        </Container>
    )
}

export default GameCard;
