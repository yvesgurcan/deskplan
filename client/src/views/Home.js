import React, { Fragment, useState, useMemo } from 'react';
import SearchBar from '../components/Home.SearchBar';
import ItemList from '../components/Home.ItemList';
import AddItem from '../components/Home.AddItem';

export default ({ offline }) => {
    const [openAddForm, setOpenAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('updatedAt');
    const [sortOrderModifier, setSortOrderModifier] = useState(1);
    const [limit, setLimit] = useState(20);

    const addItemComponent = useMemo(
        () => openAddForm && <AddItem offline={offline} />,
        [openAddForm, offline]
    );

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
                offline={offline}
            />
            {addItemComponent}
            <ItemList
                searchTerm={searchTerm}
                sortBy={sortBy}
                sortOrderModifier={sortOrderModifier}
                limit={limit}
                offline={offline}
            />
        </Fragment>
    );
};
