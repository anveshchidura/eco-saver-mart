import { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { RiDeviceRecoverFill } from 'react-icons/ri';
import { activateSell } from '../../services/productData';
import { GoLocation } from 'react-icons/go';

function DisabledCard({ params, history }) {
    const [isModalVisible, setModalVisibility] = useState(false);

    const toggleModal = () => setModalVisibility(prevState => !prevState);

    const handleActivateSell = (e) => {
        e.preventDefault();
        activateSell(params._id)
            .then(() => {
                history.push(`/categories/${params.category}/${params._id}/details`);
                toggleModal();
            })
            .catch(console.error);
    };

    return (
        <div className="disabled-card">
            <Card className='adde1'>
                <div className='image-box1'>
                    <Card.Img variant="top" src={params.image} />
                </div>
                <Card.Body>
                    <Card.Title>{params.title}</Card.Title>
                    <Card.Text>Posted Price: {params.price}$</Card.Text>
                    <Card.Text>
                        {params.saleFlag ?
                            `Sold Price: ${params.salePrice}$` :
                            `Not yet Sold `}
                        {!params.saleFlag && (
                            <span className="enable-icon" onClick={toggleModal}>
                                Make Active <RiDeviceRecoverFill />
                            </span>
                        )}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        <GoLocation /> {params.city}
                    </small>
                </Card.Footer>
            </Card>

            <Modal show={isModalVisible} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to make this item active?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    By clicking <strong>Make Active</strong>, this sell will change its status to <strong>Active</strong> and will be visible to everyone on the website.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleActivateSell}>
                        Make Active
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DisabledCard;
