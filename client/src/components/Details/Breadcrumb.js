import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

function BreadcrumbNav({ params }) {
    const { category, _id, title } = params;

    const getCategoryPath = () => `/categories/${category}`;
    const getDetailsPath = () => `/categories/${category}/${_id}/details`;

    return (
        <Breadcrumb className="bread-box">
            <Breadcrumb.Item>
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {category && (
                <Breadcrumb.Item>
                    <Link to={getCategoryPath()}>{category}</Link>
                </Breadcrumb.Item>
            )}
            {title && (
                <Breadcrumb.Item>
                    <Link to={getDetailsPath()}>{title}</Link>
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
}

export default BreadcrumbNav;
