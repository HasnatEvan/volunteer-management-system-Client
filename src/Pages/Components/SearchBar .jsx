import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Debounce delay of 500ms

        return () => clearTimeout(timer); // Clean up the timer on component unmount or searchTerm change
    }, [searchTerm]);

    // Call onSearch only when debouncedSearchTerm changes
    useEffect(() => {
        if (debouncedSearchTerm) {
            onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, onSearch]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search by post title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
        </div>
    );
};

export default SearchBar;
