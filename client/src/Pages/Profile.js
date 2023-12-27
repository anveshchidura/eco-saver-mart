import { useEffect, useState } from 'react';
import ProfileSection from '../components/Profile/ProfileSection';
import Wishlist from '../components/Profile/Wishlist/Wishlist';
import ActiveSells from '../components/Profile/Sells/ActiveSells';
import ArchivedSells from '../components/Profile/Sells/ArchivedSells';
import SellerProfile from '../components/Profile/SellerProfile';
import { getUserById } from '../services/userData';
import { Col, Row, Button } from 'react-bootstrap';

import '../components/Profile/Profile.css';

function Profile({ match, history }) {
    const [currentTab, setCurrentTab] = useState('active');
    const [user, setUser] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserById(match.params.id)
            .then(res => setUser(res.user))
            .catch(err => {
                console.error('Error fetching user data:', err);
            });
    }, [match.params.id]);

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <>
            {user.isMe ? (
                <>
                    <ProfileSection params={user} />
                    <div className="container">
                        <Row>
                            <Col lg={2} sm={12} id="aside">
                                <Button style={{ borderRadius: '25px' }} variant="dark" id="active-sells" onClick={() => handleTabChange('active')}>Active Sells</Button>{' '}
                                <Button style={{ borderRadius: '25px' }} variant="dark" id="archived-sells" onClick={() => handleTabChange('archived')}>Archived</Button>{' '}
                                <Button style={{ borderRadius: '25px' }} variant="dark" id="wishlist" onClick={() => handleTabChange('wishlist')}>Wishlist</Button>{' '}
                            </Col>
                            <Col lg={10} sm={12}>
                                {currentTab === 'active' && <ActiveSells params={user} />}
                                {currentTab === 'archived' && <ArchivedSells history={history} />}
                                {currentTab === 'wishlist' && <Wishlist />}
                            </Col>
                        </Row>
                    </div>
                </>
            ) : (
                <SellerProfile params={user} history={history} />
            )}
        </>
    );
}

export default Profile;
