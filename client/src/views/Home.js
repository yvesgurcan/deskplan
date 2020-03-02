import React, { Fragment, useState, useMemo } from 'react';
import SearchBar from '../components/Home.SearchBar';
import ItemList from '../components/Home.ItemList';
import AddItem from '../components/Home.AddItem';

export default () => {
    const [openAddForm, setOpenAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('updatedAt');
    const [sortOrderModifier, setSortOrderModifier] = useState(1);
    const [limit, setLimit] = useState(50);

    const addItemComponent = useMemo(() => (openAddForm ? <AddItem /> : null), [
        openAddForm
    ]);

    return (
        <Fragment>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrderModifier={sortOrderModifier}
                setSortOrderModifier={setSortOrderModifier}
                openAddForm={openAddForm}
                setOpenAddForm={setOpenAddForm}
                limit={limit}
                setLimit={setLimit}
            />
            {addItemComponent}
            <ItemList
                searchTerm={searchTerm}
                sortBy={sortBy}
                sortOrderModifier={sortOrderModifier}
                limit={limit}
            />
        </Fragment>
    );
};
