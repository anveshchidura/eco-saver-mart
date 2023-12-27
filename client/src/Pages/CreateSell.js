import { Component } from "react";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { createProduct } from "../services/productData";
import SimpleSider from "../components/Siders/SimpleSider";
import "../components/CreateSell/CreateSell.css";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            quantity: "",
            price: "",
            originalPrice: "",
            flexibility: "",
            address1: "",
            address2: "",
            stateName: "",
            zipcode: "",
            expiryDate: "",
            description: "",
            city: "",
            category: "",
            image: "",
            loading: false,
            alertShow: false,
            errors: [],
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.files) {
            this.setState({ image: e.target.files[0] });
        }
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let {
            title,
            quantity,
            price,
            originalPrice,
            description,
            city,
            category,
            image,
            flexibility,
            address1,
            address2,
            stateName,
            zipcode,
            expiryDate,
        } = this.state;
        let obj = {
            title,
            quantity,
            price,
            originalPrice,
            description,
            city,
            category,
            flexibility,
            address1,
            address2,
            stateName,
            zipcode,
            expiryDate,
        };
        this.setState({ loading: true });
        this.getBase64(image)
            .then((data) => {
                obj["image"] = data;
                createProduct(obj)
                    .then((res) => {
                        if (res.error) {
                            this.setState({ loading: false });
                            this.setState({ errors: res.error });
                            this.setState({ alertShow: true });
                        } else {
                            this.props.history.push(
                                `/categories/${category}/${res.productId}/details`
                            );
                        }
                    })
                    .catch((err) => console.error("Creating product err: ", err));
            })
            .catch((err) => console.error("Converting to base64 err: ", err));
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    render() {
        return (
            <>
                <div className="container box-here">
                    <h1 className="heading">Add a Product</h1>
                    <Form onSubmit={this.onSubmitHandler}>
                        {this.state.alertShow && (
                            <Alert
                                variant="danger"
                                onClose={() => this.setState({ alertShow: false })}
                                dismissible
                            >
                                <p>{this.state.errors}</p>
                            </Alert>
                        )}
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="What are you selling? Enter Title, Brand etc.."
                                    name="title"
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter Quantity (Single Item/Multiple Item)"
                                    name="quantity"
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridDescription.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Tell shoppers about your listing by describing the Brand, Condition, Material, and any other noteworthy details."
                                required
                                onChange={this.onChangeHandler}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Price ($ USD)</Form.Label>

                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                    name="price"
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Original Price ($ USD)</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    placeholder="Original Price"
                                    name="originalPrice"
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>Price Flexibility</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue="Choose..."
                                    name="flexibility"
                                    required
                                    onChange={this.onChangeHandler}
                                >
                                    <option>Choose...</option>
                                    <option>Fixed</option>
                                    <option>Negotiable</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                    name="address1"
                                    placeholder="Enter your address details"
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control
                                    name="address2"
                                    placeholder="Enter your address details"
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    name="city"
                                    placeholder="San Jose"
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue="Choose..."
                                    name="stateName"
                                    required
                                    onChange={this.onChangeHandler}
                                >
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
                                <Form.Control
                                    name="zipcode"
                                    placeholder="San Jose"
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue="Choose..."
                                    name="category"
                                    required
                                    onChange={this.onChangeHandler}
                                >
                                    <option>Choose...</option>
                                    <option>Food</option>
                                    <option>Dairy</option>
                                    <option>Others</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridImage">
                                <Form.Label>Upload product Image</Form.Label>
                                <Form.Control
                                    name="image"
                                    type="file"
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridImage">
                                <Form.Label>Sell by Date</Form.Label>
                                <Form.Control
                                    name="expiryDate"
                                    type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                        </Form.Row>
                        {this.state.loading ? (
                            <Button className="col-lg-12" variant="dark" disabled>
                                Please wait... <Spinner animation="border" />
                            </Button>
                        ) : (
                            <Button className="col-lg-12" variant="dark" type="submit">
                                Add product
                            </Button>
                        )}
                    </Form>
                </div>
            </>
        );
    }
}

export default AddProduct;
