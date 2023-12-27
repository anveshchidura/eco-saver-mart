import { useState, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const socket = io();

function SubmitForm({ chatId }) {
    const [text, setText] = useState("");

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleMsgSubmit = (e) => {
        e.preventDefault();
        socket.emit('chat message', text);
        setText('');
    };

    return (
        <div className="chat-selected-footer col-lg-12">
            <Form onSubmit={handleMsgSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={handleInputChange}>
                        </Form.Control>
                        <InputGroup.Append>
                            <Button type="submit" variant="secondary">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}

export default SubmitForm;
