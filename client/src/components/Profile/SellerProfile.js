import { useState } from "react";
import ActiveSells from "./Sells/ActiveSells";
import { Col, Row, Button, Form, Modal } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { FaSellsy } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { createChatRoom } from "../../services/messagesData";

function UserInfo({ icon, text }) {
    return (
        <p>
            {icon} {text}
        </p>
    );
}

function SellerProfile({ params, history }) {
    const [isMessageModalVisible, setMessageModalVisibility] = useState(false);
    const [message, setMessage] = useState("");

    const toggleMessageModal = () => setMessageModalVisibility(!isMessageModalVisible);

    const onMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            await createChatRoom(params._id, message);
            history.push(`/messages`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div id="profile-head" className="container">
                <Row className="profile-row">
                    <Col lg={5} md={5} sm={12}>
                        <img id="avatar" alt="avatar" src={params.avatar} />
                        <Button variant="dark" className="cnts-btn mt-4" onClick={toggleMessageModal}>
                            <RiMessage3Fill />
                            Contact Seller
                        </Button>
                    </Col>
                    <Col lg={7} md={7} sm={12}>
                        <UserInfo icon={<BsFillPersonFill />} text={params.name} />
                        <UserInfo icon={<MdEmail />} text={params.email} />
                        <UserInfo icon={<MdPhoneAndroid />} text={params.phoneNumber} />
                        <UserInfo icon={<FaSellsy />} text={`${params.totalSells} sells in total`} />
                    </Col>
                </Row>
            </div>
            <ActiveSells params={params} />
            <Modal show={isMessageModalVisible} onHide={toggleMessageModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onMessageSubmit}>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                            />
                        </Form.Group>
                        <Button variant="dark" className="cnts-btn" type="submit">
                            Send
                        </Button>
                        <Button variant="secondary" className="cnts-btn" onClick={toggleMessageModal}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SellerProfile;
