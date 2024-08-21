
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/categoryListPage.css';

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await ApiService.getAllCategory();
                setCategories(response.categoryList || []);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Unable to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm)
    );

    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className="category-list">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <h2>Categories</h2>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <ul>
                        {filteredCategories.map((category) => (
                            <li key={category.id}>
                                <button 
                                    onClick={() => handleCategoryClick(category.id)}
                                    aria-label={`Go to ${category.name}`}
                                >
                                   
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryListPage;
