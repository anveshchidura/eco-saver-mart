import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoriesNav from "../components/Categories/CategoriesNav";
import ProductCard from "../components/ProductCard/ProductCard";
import { Col, Spinner, Dropdown } from "react-bootstrap";
import { getAll } from "../services/productData";
import {
    BiSortDown,
    BiSort,
    BiDownArrowAlt,
    BiUpArrowAlt,
    BiSortUp,
} from "react-icons/bi";
import "../components/Siders/SearchSider.css";
import "../components/Categories/Categories.css";
import "../components/ProductCard/ProductCard.css";

function Categories({ match }) {
    let currentCategory = match.params.category;
    const [products, setProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("oldest");

    useEffect(() => {
        setPage(1);
        setLoading(true);
        setQuery("");
        getAll(1, currentCategory, query)
            .then((res) => {
                setProduct(res.products);
                setLoading(false);
                setPage((page) => page + 1);
                setQuery("");
            })
            .catch((err) => console.log(err));
    }, [currentCategory, setProduct]);

    const searchFunc = (e) => {
        setLoading(true);

        getAll(1, currentCategory, e.target.value)
            .then((res) => {
                setProduct(res.products);
                setLoading(false);
                setPage((page) => page + 1);
                //setQuery("");
            })
            .catch((err) => console.log(err));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        searchFunc(e);
    };

    return (
        <>
            <div id="sider">
                <input
                    className="col-lg-6 search-bar"
                    type="text"
                    placeholder="Search..."
                    name="search"
                    value={query}
                    onChange={handleSearch}
                />
            </div>
            <CategoriesNav />
            <div className="container">
                <Dropdown id="dropdown-sort">
                    <Dropdown.Toggle
                        className="sort-btn"
                        variant="light"
                        id="dropdown-basic"
                    >
                        Sort <BiSort />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-btn">
                        <Dropdown.Item
                            className="dropdown-btn-items"
                            onClick={() => {
                                setSort("oldest");
                            }}
                        >
                            Oldest <BiDownArrowAlt />
                        </Dropdown.Item>
                        <Dropdown.Item
                            className="dropdown-btn-items"
                            onClick={() => {
                                setSort("newest");
                            }}
                        >
                            Newest <BiUpArrowAlt />
                        </Dropdown.Item>
                        <Dropdown.Item
                            className="dropdown-btn-items"
                            onClick={() => {
                                setSort("lowerPrice");
                            }}
                        >
                            Price <BiSortDown />
                        </Dropdown.Item>
                        <Dropdown.Item
                            className="dropdown-btn-items"
                            onClick={() => {
                                setSort("biggerPrice");
                            }}
                        >
                            Price <BiSortUp />{" "}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br />
                {!loading ? (
                    <div
                        dataLength={products.length}
                        next={() => {
                            if (query === "") {
                                getAll(page, currentCategory).then((res) => {
                                    setProduct([...products, ...res.products]);
                                    setPage(page + 1);
                                });
                            }
                        }}
                        hasMore={() => {
                            if (products.length > 0) {
                                return true;
                            }
                            return false;
                        }}
                        className="row"
                    >
                        {products
                            .sort((a, b) => {
                                if (sort === "oldest") {
                                    return a.addedAt.localeCompare(b.addedAt);
                                }
                                if (sort === "newest") {
                                    return b.addedAt.localeCompare(a.addedAt);
                                }
                                if (sort === "lowerPrice") {
                                    return b.price - a.price;
                                }
                                if (sort === "biggerPrice") {
                                    return a.price - b.price;
                                }
                            })
                            .map((x) => (
                                <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                    <ProductCard params={x} />
                                </Col>
                            ))}
                    </div>
                ) : (
                    <div className="spinner">
                        <Spinner animation="border" />
                    </div>
                )}
            </div>
        </>
    );
}

export default Categories;
