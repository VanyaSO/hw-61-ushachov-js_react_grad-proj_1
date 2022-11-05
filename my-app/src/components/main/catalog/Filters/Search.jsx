import * as React from 'react';
import {memo} from "react";
import PropTypes from "prop-types";
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    padding:'0 10px',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.55),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        width: '100%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width:"100%",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            '&:focus': {
                width: '100%',
            },
        },
    },
}));

const SearchApp = memo((props) => {

    const {titleSearchValue, handleChangeSearchFilter,} = props

    const onChangeTitle = (event) =>{
        handleChangeSearchFilter(event.target.value);
    }

    return (
        <Toolbar>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={titleSearchValue}
                    onChange={onChangeTitle}
                />
            </Search>
        </Toolbar>
    );
})

SearchApp.prototype = {
    titleSearchValue: PropTypes.string,
    handleChangeSearchFilter: PropTypes.func,
}

export default SearchApp;