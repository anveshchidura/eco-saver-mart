import { useState } from 'react';
import React, { useRef } from 'react';

import { Button, Modal, Form, OverlayTrigger, Tooltip, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdArchive } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { archiveSell, confirmProductSell } from '../../../services/productData';
import { createChatRoom } from '../../../services/messagesData'
import emailjs from '@emailjs/browser';

import './Aside.css';


function Aside({ params, history }) {
    const [showMsg, setShowMdg] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [confirmSell, setConfirmSell] = useState(false);
    const [donate, setDonate] = useState(false);

    const [message, setMessage] = useState("");
    const [salePrice, setSalePrice] = useState("");

    const handleClose = () => setShowMdg(false);
    const handleShow = () => setShowMdg(true);


    const handleCloseArchive = () => setShowArchive(false);
    const handleShowArchive = () => setShowArchive(true);
    const handleCloseConfirmSell = () => setConfirmSell(false);
    const handleShowConfirmSell = () => setConfirmSell(true);
    const handleCloseDonate = () => setDonate(false);
    const handleShowDonate = () => setDonate(true);
    const form = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        archiveSell(params._id)
            .then(res => {
                setShowArchive(false);
                history.push(`/profile/${params.seller}`);
            })
            .catch(err => console.log(err))
    }

    const handleMsgChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }
    const onMsgSent = (e) => {
        e.preventDefault();
        createChatRoom(params.sellerId, message)
            .then((res) => {
                history.push(`/messages/${res.messageId}`)
            })
            .catch(err => console.log(err))
    }
    const onConfirmSale = (e) => {
        e.preventDefault();
        let obj = { salePrice };
        confirmProductSell(params._id, obj)
            .then(res => {
                if (!res.error) {
                    console.log("sell confirmed");
                    history.push(`/profile/${params.seller}`);
                } else {
                    console.log("entered else lloop");
                }
            })
            .catch(err => console.error('edit product err: ', err))
    }

    const handleSalesPrice = (e) => {
        e.preventDefault();
        setSalePrice(e.target.value)

    }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_coq4xq3', 'template_ijzw5cw', form.current, 'oKBkQX-fqWoF0Khz5')
            .then((result) => {
                console.log(result.text);
                handleCloseDonate();
            }, (error) => {
                console.log(error.text);
            });
        archiveSell(params._id)
            .then(res => {
                setShowArchive(false);
                history.push(`/profile/${params.seller}`);
            })
            .catch(err => console.log(err))
    };
    return (
        <aside>
            <div className="product-details-seller">
                <div id="priceLabel" className="col-lg-12">
                    <h4 id="product-price-heading">Product Price </h4>
                    {params.isSeller &&
                        <>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Edit the selling</Tooltip>}>
                                <span id="edit-icon">
                                    <Link to={`/categories/${params.category}/${params._id}/edit`}><GrEdit /></Link>
                                </span>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Archive</Tooltip>}>
                                <span id="archive-icon" onClick={handleShowArchive}>
                                    <MdArchive />
                                </span>
                            </OverlayTrigger>
                            <Button variant="dark" className="col-lg-6 cs-btn" id="btnContact" onClick={handleShowConfirmSell} >Confirm Sell</Button>
                            <Button variant="dark" className="col-lg-6 d-btn" id="btnContact" onClick={handleShowDonate} >Donate</Button>

                        </>
                    }
                    {params.price && <h1 id="price-heading">{(params.price).toFixed(2)}$</h1>}
                </div>
                {params.isAuth ? (<>
                    {!params.isSeller &&
                        <Button variant="dark" className="cnts-btn col-lg-10" id="btnContact" onClick={handleShow}>
                            <RiMessage3Fill />Contact Seller
                        </Button>
                    }
                    <Link to={`/profile/${params.sellerId}`}>
                        <Col lg={12}>
                            <img id="avatar" src={params.avatar} alt="user-avatar" />
                        </Col>
                        <Col lg={12}>
                            <p><BsFillPersonFill /> {params.name}</p>
                            <p><MdEmail /> {params.email}</p>
                            <p><MdPhoneAndroid /> {params.phoneNumber}</p>
                            <p><FaSellsy /> {params.createdSells} sells in total</p>
                        </Col>
                    </Link>
                </>) : (
                    <p id="guest-msg"><Link to="/auth/login">Sign In</Link> now to contact the seller!</p>
                )}
            </div>
            <Modal show={showMsg} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" className='cnts-btn' name="textarea" onChange={handleMsgChange} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" className='cnts-btn' onClick={onMsgSent}>Send</Button>
                    <Button variant="secondary" className='cnts-btn' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showArchive} onHide={handleCloseArchive}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to archive this item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        By clicking <strong>Archive</strong>, this sell will change
                        it's status to <strong>Archived</strong>,
                        which means that no one but you will be able see it.
                        You may want to change the status to <strong>Actived</strong> if you have
                        sold the item or you don't want to sell it anymore.
                    </p>

                    Don't worry, you can unarchive it at any time from Profile - Sells!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseArchive}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Archive
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={confirmSell} onHide={handleCloseConfirmSell}>
                <Modal.Header closeButton>
                    <Modal.Title>Please confirm the details of the sale?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Sale Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter Sale Price" name="salePrice" required onChange={handleSalesPrice} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='cnts-btn' onClick={handleCloseConfirmSell}>
                        Close
                    </Button>
                    <Button variant="success" className='cnts-btn' onClick={onConfirmSale}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={donate} onHide={handleCloseDonate}>
                <Modal.Header closeButton>
                    <Modal.Title>Donate for the cause</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="alert alert-success">
                        <strong>Congratulations on your charity!</strong> <br></br><i>You are contributing to the environment by saving <strong>{params.title}</strong> from going to waste /Landfill.</i>
                    </div>
                    <Form ref={form} onSubmit={sendEmail}>
                        <Form.Label>Donation Item</Form.Label>
                        <Form.Control type="text" name="donationName" value={params.title} />

                        <Form.Label>Email</Form.Label>
                        {/* <Form.Control type="email" name="email" /> */}
                        <Form.Control as="select" type="email" name="email" required >
                            <option>Choose...</option>
                            <option>SJSUFoodpantry@gmail.com</option>
                            <option>chinnu21798@gmail.com</option>
                            <option>marthas_kitchen@gmail.com</option>
                            <option>the_health_trust@gmail.com</option>
                            <option>the_health_trust@gmail.com</option>
                            <option>hope_center@gmail.com</option>
                            <option>lords_pantry@gmail.com</option>
                            <option>second_harvest_FoodPantry@gmail.com</option>
                            <option>pushyachandra.leburu@sjsu.edu</option>
                        </Form.Control>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" name="subject" value={"Donation from " + params.name} />
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text" name="contactNum" value={params.phoneNumber} />
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" name="message" />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='cnts-btn' onClick={handleCloseDonate}>
                        Close
                    </Button>
                    <Button variant="success" className='cnts-btn' onClick={sendEmail}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </aside>
    )
}

export default Aside;