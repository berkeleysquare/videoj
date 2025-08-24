import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from "@mui/icons-material/CancelOutlined";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// Styled components replacing withStyles HOC
const SearchBar = styled('div')({
  marginLeft: '5px',
  marginTop: '5px',
  marginRight: '20px',
  fontSize: '11px',
  color: '#ffffff',
});

const SearchTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: '18px',
    color: '#FFFFFF',
  },
  '& .MuiInputBase-root': {
    fontSize: '11px',
    color: '#FFFFFF',
  },
});

const SearchButton = styled(Button)({
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    color: '#FFFFFF',
  },
});

const StyledSearchIcon = styled(SearchIcon)({
  color: '#FFFFFF',
  marginTop: '20px',
});


const searcher = props =>{
  const {searchText, onChange, onClear} = props;

  return (
    <SearchBar>
      <StyledSearchIcon/>
      <SearchTextField 
        id="search-collection"
        name="searchtext"
        value={searchText}
        onChange={onChange}
      />
      <SearchButton aria-controls="Search" onClick={onClear}>
        <CancelIcon/>
      </SearchButton>
    </SearchBar>
  );
};

export default searcher;
