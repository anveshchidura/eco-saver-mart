import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Image,
    Tabs,
    Tab,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { wishProduct } from "../../../services/productData";

function Information_of_Product({ params }) {
    const [wish, setWish] = useState(params.isWished);

    useEffect(() => {
        setWish(params.isWished);
    }, [params.isWished]);

    const onHearthClick = () => {
        wishProduct(params._id)
            .then(() => {
                setWish(!wish);
            })
            .catch((err) => console.log(err));
    };

    const discountPercent = params.originalPrice
        ? ((params.originalPrice - params.price) / params.originalPrice) * 100
        : 0;

    const formatPrice = (price) => (price !== undefined ? price.toFixed(2) : "");

    const getAddress = (address) => address || "";

    return (
        <>
            <div className="image-box">
                <Image className="col-lg-12" src={params.image} rounded />
            </div>
            <Row>
                <Col lg={10}>
                    <h1 className="product-info-heading">{params.title}</h1>
                    <Row className="content-loc1">
                        <Col md={2} className="main-price">
                            <div>
                                {"$"}
                                {formatPrice(params.price)}
                            </div>
                            {discountPercent !== 0 && (
                                <div className="org-price-content">
                                    {"$"}
                                    {formatPrice(params.originalPrice)}
                                </div>
                            )}
                        </Col>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <Col md={3}>
                            {discountPercent !== 0 && (
                                <div className="discount-box1">
                                    {discountPercent.toFixed(2)}% off
                                </div>
                            )}
                        </Col>
                        <Col md={5} className="price-point1">
                            <div
                                className={
                                    params.flexibility === "Fixed" ? "fxd-prc" : "ngo-prc"
                                }
                            >
                                {params.flexibility || "Negotiable"}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={2}>
                    <span id="heartIconDetails" onClick={onHearthClick}>
                        {params.isAuth && (
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip>
                                        {wish ? "Remove from Wishlist" : "Add to Wishlist"}
                                    </Tooltip>
                                }
                            >
                                {wish ? <BsHeartFill /> : <BsHeart />}
                            </OverlayTrigger>
                        )}
                    </span>
                </Col>
            </Row>
            <div id="detailsCardText" className="col-lg-12">
                <Tabs defaultActiveKey="details" transition={false}>
                    <Tab eventKey="details" title="Details" className="p-3">
                        <p>
                            <strong>Qty:</strong> {params.quantity}
                        </p>
                        <p>
                            <strong>Price Per Unit:</strong> {"$"}
                            {formatPrice(params.price / params.quantity)}
                        </p>
                        <div className="desc-box">
                            <p>{params.description}</p>
                        </div>
                        <hr />
                        <p className="text-muted">Product listed at {params.addedAt}</p>
                    </Tab>
                    <Tab eventKey="details1" title="Store Address" className="p-3">
                        {`${getAddress(params.address1)} ${getAddress(params.address2)} ${params.city
                            } ${params.stateName} ${params.zipcode}`}
                        <hr />
                        <p className="text-muted">Product listed at {params.addedAt}</p>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

export default Information_of_Product;
