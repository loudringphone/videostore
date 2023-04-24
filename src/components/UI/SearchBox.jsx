import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { easeOut } from 'framer-motion';

const SearchBox = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
    setSearchTerm(e.target.value);


  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchInputRef.current.blur()
    navigate(`/search?q=${searchTerm}`);
  };

  const location = useLocation()

  useEffect(()=>{
    if (!location.search) {
      setSearchTerm('');
    }
  }, [location])







  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="What are you looking for?"
        value={searchTerm}
        onChange={handleSearch}
        ref={searchInputRef}
      />
      <button type="submit">
        <i className="ri-search-line"></i>
      </button>
    </form>
  );
};

export default SearchBox;