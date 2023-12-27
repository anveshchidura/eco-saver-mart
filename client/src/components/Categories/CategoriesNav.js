import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css';

function CategoriesNav() {
    const categories = [
        { path: "/categories/all", label: "All", id: "all" },
        { path: "/categories/Food", label: "Food", id: "Food" },
        { path: "/categories/Dairy", label: "Dairy", id: "Dairy" },
        { path: "/categories/Others", label: "Others", id: "Others" },
    ];

    return (
        <div className="container" id="categories">
            {categories.map((category) => (
                <Link to={category.path} key={category.id}>
                    <Button className="rounded-btns" variant="dark" id={category.id}>
                        {category.icon}{category.label}
                    </Button>{' '}
                </Link>
            ))}
        </div>
    );
}

export default CategoriesNav;
