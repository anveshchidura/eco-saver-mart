import {
    Card,
    Row,
    Col,
   // Tabs,
    //Tab,
   // Image,
   // OverlayTrigger,
    //Tooltip,
} from "react-bootstrap";
import { GoLocation } from "react-icons/go";

// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Moment from "react-moment";

function ProductCard({ params }) {
    console.log(params);
    const discount_percent =
        ((params.originalPrice - params.price) / params.originalPrice) * 100;
    // discount_percent = discount_percent.toFixed();
    return (
        <Card className="card-design shadow">
            <Link to={`/categories/${params.category}/${params._id}/details`}>
                <div>
                    <Row>
                        <Col md={3}>
                            <img
                                className="userImg"
                                src={params.created_user_avatar}
                                alt="user-avatar"
                            />
                        </Col>
                        <Col md={9}>
                            <Row className="name-part">
                                <span className="userName">{params.created_user_name}</span>
                            </Row>
                            <Row className="time-part">
                                <Moment format="D MMM YYYY  HH:mm">{params.addedAt}</Moment>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Card.Img className="image-box" variant="top" src={params.image} />
                <Card.Title></Card.Title>
                <Card.Body>
                    {/* <Row> */}
                    <Row>
                        <Col md={12}>
                            <Card.Title>{params.title}</Card.Title>
                        </Col>
                    </Row>

                    <Row className="content-loc">
                        <Col className="main-price">
                            {discount_percent === 0 ? (
                                <>
                                    <div>
                                        {"$"}
                                        {params.price.toFixed(2)}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        {"$"}
                                        {params.price.toFixed(2)}
                                    </div>
                                </>
                            )}
                        </Col>
                        <Col>
                            {discount_percent === 0 ? (
                                <>
                                    <div className="blank-box bg-danger badge  bg-danger">
                                        <span className=" font-weight-bold">
                                            - {discount_percent.toFixed(1)}
                                        </span>{" "}
                                        {"% "}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="discount-box bg-danger badge bg-danger">
                                        <span className=" font-weight-bold">
                                            - {discount_percent.toFixed(1)}
                                        </span>{" "}
                                        {"% "}
                                    </div>
                                </>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card.Text>
                                <GoLocation /> {params.city}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col className="">
                            {params.flexibility === "Fixed" ? (
                                <div className="fxd-prc">Fixed</div>
                            ) : (
                                <div className="ngo-prc">Negotiable</div>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default ProductCard;
