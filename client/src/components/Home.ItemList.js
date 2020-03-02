import React, { Fragment, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    GET_ITEMS,
    ADD_ITEM,
    ADD_STARTER_ITEMS,
    DELETE_ITEM
} from '../queries/items';

import Error from './Shared.Error';
import Item from './Shared.Item';
import Button from './Shared.Button';
import Dropdown from './Shared.Dropdown';
import TextInput from './Shared.TextInput';

const SORT_OPTIONS = [
    {
        text: 'Updated',
        value: 'updatedAt'
    },
    {
        text: 'Created',
        value: 'createdAt'
    },
    {
        text: 'Name',
        value: 'name'
    },
    {
        text: 'Quantity',
        value: 'quantity'
    }
];

export default () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [sortBy, setSortBy] = useState('updatedAt');
    const [sortOrderModifier, setSortOrderModifier] = useState(1);

    const { loading, error, data: { items = [] } = {} } = useQuery(GET_ITEMS, {
        fetchPolicy: 'cache-and-network'
    });

    const [addItem, { error: addItemError = [] }] = useMutation(ADD_ITEM, {
        update(cache, { data: { addItem } }) {
            if (addItem) {
                const { items } = cache.readQuery({ query: GET_ITEMS });
                cache.writeQuery({
                    query: GET_ITEMS,
                    data: { items: items.concat([addItem]) }
                });
            }
        }
    });

    const [addStarterItems, { error: addStarterItemsError = [] }] = useMutation(
        ADD_STARTER_ITEMS,
        {
            update(cache, { data: { addStarterItems } }) {
                if (addStarterItems) {
                    const { items } = cache.readQuery({ query: GET_ITEMS });
                    cache.writeQuery({
                        query: GET_ITEMS,
                        data: { items: items.concat(addStarterItems) }
                    });
                }
            }
        }
    );

    const [deleteItem, { error: deleteItemError = [] }] = useMutation(
        DELETE_ITEM,
        {
            update(cache, { data: { deleteItem } }) {
                if (deleteItem) {
                    const { items } = cache.readQuery({ query: GET_ITEMS });
                    cache.writeQuery({
                        query: GET_ITEMS,
                        data: {
                            items: items.filter(item => item.id !== deleteItem)
                        }
                    });
                }
            }
        }
    );

    useEffect(() => {
        if (items) {
            let searchedItems = [...items];
            if (searchTerm) {
                const lowerSearchterm = searchTerm.toLowerCase();
                searchedItems = searchedItems.filter(item =>
                    item.name.toLowerCase().includes(lowerSearchterm)
                );
            }

            const updatedItems = [...searchedItems].sort((a, b) => {
                let propertyA = a[sortBy];
                let propertyB = b[sortBy];

                if (sortBy === 'name') {
                    propertyA = propertyA.toLowerCase();
                    propertyB = propertyB.toLowerCase();
                }

                if (propertyA > propertyB) {
                    return 1 * sortOrderModifier;
                } else if (propertyA < propertyB) {
                    return -1 * sortOrderModifier;
                }

                return 0;
            });
            setFilteredItems(updatedItems);
        }
    }, [items, searchTerm, sortBy, sortOrderModifier]);

    const searchComponent = useMemo(
        () => (
            <Search>
                <Title>Your inventory</Title>
                <FilterFunctionalities>
                    <div>
                        🔎{' '}
                        <SearchInput
                            placeholder="Search"
                            value={searchTerm}
                            onChange={event =>
                                setSearchTerm(event.target.value)
                            }
                        />
                    </div>
                    <Sort>Sort:</Sort>
                    <Dropdown
                        value={sortBy}
                        options={SORT_OPTIONS}
                        onChange={event => setSortBy(event.target.value)}
                    />
                    <SortOrder
                        onClick={() =>
                            setSortOrderModifier(sortOrderModifier * -1)
                        }
                    >
                        {sortOrderModifier === 1 ? '▼' : '▲'}
                    </SortOrder>
                </FilterFunctionalities>
            </Search>
        ),
        [searchTerm, sortBy, sortOrderModifier]
    );

    return (
        <ItemContainer>
            {searchComponent}
            <Search>
                {error ? <Error error={error} /> : <div />}
                <div>
                    {filteredItems.length}{' '}
                    {filteredItems.length < 2 ? 'item' : 'items'}
                </div>
            </Search>
            {loading & (items && items.length === 0) ? (
                <Loading>Loading...</Loading>
            ) : searchTerm && filteredItems && filteredItems.length === 0 ? (
                <NothingFound>
                    No item found for "{searchTerm}". 😥
                </NothingFound>
            ) : items && items.length > 0 ? (
                <Fragment>
                    <Results>
                        <Error error={deleteItemError} />
                        {filteredItems.map(item => (
                            <Item
                                key={item.id}
                                item={item}
                                addItem={addItem}
                                deleteItem={deleteItem}
                            />
                        ))}
                    </Results>
                </Fragment>
            ) : error ? null : (
                <Fragment>
                    <Error error={addStarterItemsError} />
                    <StarterPrompt>
                        <p>
                            Looks like you don't have any items in your
                            inventory yet. Would you like to start with some
                            typical office items?
                        </p>
                        <Button onClick={addStarterItems}>
                            Create starter items
                        </Button>
                    </StarterPrompt>
                </Fragment>
            )}
        </ItemContainer>
    );
};

const Search = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FilterFunctionalities = styled.div`
    display: flex;
    align-items: center;
`;

const Sort = styled.div`
    margin: 0.5rem;
`;

const SortOrder = styled(Button)`
    margin-left: 0.5rem;
`;

const Title = styled.h2`
    margin: 0;
`;

const SearchInput = styled(TextInput)`
    padding: 0.3rem;
    margin-left: 0.5rem;
    font-size: 110%;
`;

const Loading = styled.div`
    text-align: center;
    padding: 2rem;
`;

const StarterPrompt = styled.div`
    text-align: center;
`;
const NothingFound = styled(Loading)``;

const Results = styled.ul``;

const SectionSeparator = styled.section`
    border-top: 5px solid rgb(80, 80, 80);
    padding-top: 2rem;
`;

const ItemContainer = styled(SectionSeparator)`
    padding-bottom: 8rem;
`;
