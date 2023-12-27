import { useState, useEffect } from 'react';
import { Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import { getSpecific, editProduct } from '../services/productData';

import '../components/Edit/Edit.css'

function Edit({ match, history }) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const productId = match.params.id;

    useEffect(() => {
        window.scrollTo(0, 0);
        getSpecific(productId)
            .then(res => setProduct(res))
            .catch(err => console.log(err));
    }, [productId])

    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value });
        if (e.target.files) {
            setProduct({ ...product, image: e.target.files[0] })
        }
    }


    const onSubmitHandler = (e) => {
        //TODO: Rewrite this 
        e.preventDefault();
        let { _id, title, quantity, price, originalPrice, description, city, category, image, flexibility, address1, address2, state, zipcode, expiryDate } = product;
        let obj = { title, quantity, price, originalPrice, description, city, category, flexibility, address1, address2, state, zipcode, expiryDate }
        setLoading(true);
        if (typeof image == 'object') {
            getBase64(image)
                .then((data) => {
                    obj['image'] = data;
                    editProduct(_id, obj)
                        .then(res => {
                            if (!res.error) {
                                history.push(`/categories/${category}/${_id}/details`)
                            } else {
                                setLoading(false);
                                setError(res.error);
                                setAlertShow(true);
                            }
                        })
                        .catch(err => console.error('edit product err: ', err))
                })
                .catch(err => console.log('base64 error: ', err));
        } else {
            editProduct(_id, obj)
                .then(res => {
                    if (!res.error) {
                        history.push(`/categories/${category}/${_id}/details`)
                    } else {
                        setLoading(false);
                        setError(res.error);
                        setAlertShow(true);
                    }
                })
                .catch(err => console.error('edit product err: ', err))
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <>
            <SimpleSider />
            <div className='container box-here'>
                <h1 className="heading">Edit product</h1>
                <Form onSubmit={onSubmitHandler}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" value={product.title} onChange={onChangeHandler} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Quantity" name="quantity" value={product.quantity} onChange={onChangeHandler} required />
                        </Form.Group>

                    </Form.Row>
                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" defaultValue={product.description} onChange={onChangeHandler} required />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Price" name="price" value={product.price} onChange={onChangeHandler} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Original Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="originalPrice" name="originalPrice" value={product.originalPrice} onChange={onChangeHandler} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Price Flexibility</Form.Label>
                            <Form.Control as="select" value={product.flexibility} name="flexibility" onChange={onChangeHandler} required >
                                <option>Choose...</option>
                                <option>Fixed</option>
                                <option>Negotiable</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control name="address1" placeholder="Sofia" value={product.address1} onChange={onChangeHandler} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control name="address2" placeholder="Sofia" value={product.address2} onChange={onChangeHandler} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" placeholder="Sofia" value={product.city} onChange={onChangeHandler} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={product.stateName} name="stateName" onChange={onChangeHandler} required >
                                <option value="">N/A</option>
                                <option value="AK">Alaska</option>
                                <option value="AL">Alabama</option>
                                <option value="AR">Arkansas</option>
                                <option value="AZ">Arizona</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DC">District of Columbia</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="IA">Iowa</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MD">Maryland</option>
                                <option value="ME">Maine</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MO">Missouri</option>
                                <option value="MS">Mississippi</option>
                                <option value="MT">Montana</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="NE">Nebraska</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NV">Nevada</option>
                                <option value="NY">New York</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VA">Virginia</option>
                                <option value="VT">Vermont</option>
                                <option value="WA">Washington</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WV">West Virginia</option>
                                <option value="WY">Wyoming</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control name="zipcode" placeholder="Sofia" value={product.zipcode} onChange={onChangeHandler} required />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>


                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={product.category} name="category" onChange={onChangeHandler} required >
                                <option>Choose...</option>
                                <option>Food</option>
                                <option>Dairy</option>
                                <option>Others</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridImage" >
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="image" type="file" onChange={onChangeHandler} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Sell By Date</Form.Label>
                            <Form.Control name="expiryDate" placeholder="Expiration Date" value={product.expiryDate} onChange={onChangeHandler} required />
                        </Form.Group>
                    </Form.Row>
                    {loading ?
                        <Button className="col-lg-12" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button className="col-lg-12" variant="dark" type="submit">Update product</Button>
                    }
                </Form>
            </div>
        </>
    )
}

export default Edit;