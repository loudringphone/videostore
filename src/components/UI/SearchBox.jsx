// import React, { useState, useEffect, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setSearchQuery } from '../../redux/slices/searchQuerySlice'
// import { easeOut } from 'framer-motion';

// const SearchBox = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const dispatch = useDispatch();
//   const searchInputRef = useRef(null);

//   const handleSearch = (e) => {
//     if (e.keyCode === 13) {
//       e.target.blur();
//     }
//     setSearchTerm(e.target.value);


//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     dispatch(setSearchQuery(searchTerm));
//     searchInputRef.current.blur()
//     navigate(`/search?q=${searchTerm}`);
//   };

//   const location = useLocation()

//   useEffect(()=>{
//     if (!location.search) {
//       setSearchTerm('');
//     }
//   }, [location])







//   return (
//     <form onSubmit={handleSearchSubmit}>
//       <input
//         type="text"
//         placeholder="What are you looking for?"
//         value={searchTerm}
//         onChange={handleSearch}
//         ref={searchInputRef}
//       />
//       <button type="submit">
//         <i className="ri-search-line"></i>
//       </button>
//     </form>
//   );
// };

// export default SearchBox;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../redux/slices/searchQuerySlice';
import { addSearchQuery, clearSearchHistory } from '../../redux/slices/searchHistorySlice';
import '../../styles/search-box.css'

const SearchBox = ({onClick, onBlur}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const searchHistory = useSelector(state => state.searchHistory);

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchTerm));
    dispatch(addSearchQuery(searchTerm));
    searchInputRef.current.blur()
    navigate(`/search?q=${searchTerm}`);
  };

  const handleClearSearchHistory = () => {
    dispatch(clearSearchHistory());
  };

  const location = useLocation()

  useEffect(()=>{
    if (!location.search) {
      setSearchTerm('');
    }
  }, [location])

  const [historyStyle, setHistoryStyle] = useState({display: 'none'});
  const handleClick = () => {
    if (searchHistory && searchHistory.length > 0) {
        setHistoryStyle({display: 'flex'});
    }
  }
  const handleBlur = () => {
      setHistoryStyle({display: 'none'});
  }




  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="What are you looking for?"
        value={searchTerm}
        onChange={handleSearch}
        onClick={() => {
          onClick();
          handleClick();
        }}
        onFocus={() => {
          onClick();
          handleClick();
        }}
        onBlur={() => {
          onBlur();
          handleBlur();
        }}
        ref={searchInputRef}
      />
      <button type="submit">
        <i className="ri-search-line"></i>
      </button>
      {searchHistory && searchHistory.length > 0 && (
        <div className="search-history" style={historyStyle}>
          <div className='history-list'>
          <ul>
            {searchHistory.map((searchQuery, index) => (
              
              <li key={index}>
                {index > 0}
                <a href={`search?q=${searchQuery}`} title={searchQuery}>{searchQuery.length > 20 ? `${searchQuery.slice(0, 17)}...` : searchQuery}</a>
              </li>
              
            ))}
          </ul>
          </div>
          <button className='clear-history' onClick={handleClearSearchHistory} onTouchStart={handleClearSearchHistory}>clear history</button>
        </div>
      )}
    </form>
  );
};

export default SearchBox;
