import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/slices/searchQuerySlice'

const SearchBox = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchTerm));
    navigate(`/search?q=${searchTerm.split(' ').join('+')}`);
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
      />
      <button type="submit">
        <i className="ri-search-line"></i>
      </button>
    </form>
  );
};

export default SearchBox;