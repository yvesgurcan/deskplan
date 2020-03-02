import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faArrowDown,
    faArrowUp,
    faPlus,
    faMinus
} from '@fortawesome/free-solid-svg-icons';
import { SORT_OPTIONS, LIMIT_OPTIONS } from '../util';
import Dropdown from './Shared.Dropdown';
import TextInput from './Shared.TextInput';
import FormGroup from './Shared.FormGroup';
import FormButton from './Shared.FormButton';

export default ({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrderModifier,
    setSortOrderModifier,
    openAddForm,
    setOpenAddForm,
    limit,
    setLimit
}) => {
    const searchComponent = useMemo(
        () => (
            <FormGroup>
                <FontAwesomeIcon icon={faSearch} />{' '}
                <TextInput
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                />
            </FormGroup>
        ),
        [searchTerm]
    );

    const sortByComponent = useMemo(
        () => (
            <FormGroup>
                Sort:{' '}
                <Dropdown
                    value={sortBy}
                    options={SORT_OPTIONS}
                    onChange={event => setSortBy(event.target.value)}
                />
            </FormGroup>
        ),
        [sortBy]
    );

    const limitComponent = useMemo(
        () => (
            <FormGroup>
                Per page:{' '}
                <Dropdown
                    value={limit}
                    options={LIMIT_OPTIONS}
                    onChange={event => setLimit(parseInt(event.target.value))}
                />
            </FormGroup>
        ),
        [limit]
    );

    const sortOrderComponent = useMemo(
        () => (
            <FormButton
                onClick={() => setSortOrderModifier(sortOrderModifier * -1)}
            >
                {sortOrderModifier === 1 ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                )}
            </FormButton>
        ),
        [sortOrderModifier]
    );

    const openAddComponent = useMemo(
        () => (
            <FormButton onClick={() => setOpenAddForm(!openAddForm)}>
                {openAddForm ? (
                    <FontAwesomeIcon icon={faMinus} />
                ) : (
                    <FontAwesomeIcon icon={faPlus} />
                )}
            </FormButton>
        ),
        [openAddForm]
    );

    return (
        <SearchBar>
            {searchComponent}
            {sortByComponent}
            <SecondaryFilters>
                {limitComponent}
                {sortOrderComponent}
                {openAddComponent}
            </SecondaryFilters>
        </SearchBar>
    );
};

const SearchBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    background: linear-gradient(rgb(85, 85, 85), rgb(60, 60, 60));
    padding: 1rem;
    border-top: 1px solid black;
`;

const SecondaryFilters = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
