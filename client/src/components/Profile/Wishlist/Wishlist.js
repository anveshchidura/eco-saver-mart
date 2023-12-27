import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserWishlist } from '../../../services/userData';

import './Wishlist.css';

function Wishlist() {
    const [state, setState] = useState({ products: [], loading: true });

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await getUserWishlist();
                setState({ products: res.wishlist, loading: false }); // Remove filter if API already filters active items
            } catch (err) {
                console.error(err);
                setState(prev => ({ ...prev, loading: false }));
            }
        };

        window.scrollTo(0, 0);
        fetchWishlist();
    }, []);

    return (
        <>
            {!state.loading ? (
                <>
                    <h1 className="heading">Wishlist</h1>
                    {state.products.length > 0 ? (
                        <Row>
                            {state.products.map(product => (
                                <Col xs={12} md={6} lg={4} key={product._id.toString()}>
                                    <ProductCard params={product} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p className="nothing-to-show">Nothing to show</p>
                    )}
                </>
            ) : (
                <Spinner animation="border" />
            )}
        </>
    );
}

export default Wishlist;
