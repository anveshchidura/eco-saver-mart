import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserActiveSells } from '../../../services/userData';

import './Sells.css';

function ActiveSells({ params }) {
    const [state, setState] = useState({ products: [], loading: true });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getUserActiveSells(params._id);
                setState({ products: res.sells, loading: false });
            } catch (err) {
                console.error(err);
                setState(prev => ({ ...prev, loading: false }));
            }
        };

        window.scrollTo(0, 0);
        if (params._id) {
            fetchProducts();
        }

        // Cleanup (if needed)
        return () => {
            // cleanup actions
        };
    }, [params._id]);

    return (
        <>
            {!state.loading ? (
                <>
                    <h1 className="heading">Active Sells</h1>
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

export default ActiveSells;
