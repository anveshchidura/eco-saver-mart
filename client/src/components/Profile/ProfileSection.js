import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { FaSellsy } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";

function ProfileSection({ params }) {
    return (
        <div id="profile-head">
            <div className="container">
                <Row className="profile-row">
                    <Col lg={5} md={5} sm={12} className="relative">
                        <img id="avatar" alt="avatar" src={params.avatar} />
                        <br />
                        <Link to={`/profile/${params._id}/edit`} className="btn btn-dark">
                            Edit Profile
                        </Link>
                    </Col>
                    <Col lg={7} md={7} sm={12}>
                        <p>
                            <BsFillPersonFill /> {params.name}
                        </p>
                        <p>
                            <MdEmail /> {params.email}
                        </p>
                        <p>
                            <MdPhoneAndroid /> {params.phoneNumber}
                        </p>
                        <p>
                            <FaSellsy /> {params.totalSells} sells in total
                        </p>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ProfileSection;
