import { useEffect, useState } from 'react';
import DisabledCard from '../../DisabledProductCard/DisabledCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserArchivedSells } from '../../../services/userData';

import './Sells.css';
import '../../DisabledProductCard/DisabledCard.css';

function ArchivedSells({ history }) {
    const [state, setState] = useState({ products: [], loading: true });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getUserArchivedSells();
                setState({ products: res.sells, loading: false });
            } catch (err) {
                console.error(err);
                setState(prev => ({ ...prev, loading: false }));
            }
        };

        window.scrollTo(0, 0);
        fetchProducts();

        // Cleanup (if needed)
        return () => {
            // cleanup actions
        };
    }, []);

    return (
        <>
            {!state.loading ? (
                <>
                    <h1 className="heading">Archive</h1>
                    {state.products.length > 0 ? (
                        <Row>
                            {state.products.map(product => (
                                <Col xs={12} md={6} lg={4} key={product._id.toString()}>
                                    <DisabledCard params={product} history={history} />
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

export default ArchivedSells;
