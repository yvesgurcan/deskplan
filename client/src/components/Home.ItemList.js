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
import Paginator from './Shared.Paginator';
import AddItem from './Home.AddItem';

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

const LIMIT_OPTIONS = [10, 25, 50, 75];

export default () => {
    const [openModal, setOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [sortBy, setSortBy] = useState('updatedAt');
    const [sortOrderModifier, setSortOrderModifier] = useState(1);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(50);

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

                const dateSortOrderModifier =
                    sortBy === 'updatedAt' || sortBy === 'createdAt' ? -1 : 1;

                if (propertyA > propertyB) {
                    return 1 * sortOrderModifier * dateSortOrderModifier;
                } else if (propertyA < propertyB) {
                    return -1 * sortOrderModifier * dateSortOrderModifier;
                }

                return 0;
            });
            setFilteredItems(updatedItems);
        }
    }, [items, searchTerm, sortBy, sortOrderModifier]);

    const searchComponent = useMemo(
        () => (
            <FilterFunctionalities>
                <InsideFilter>
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
                    <div>
                        Sort:{' '}
                        <Dropdown
                            value={sortBy}
                            options={SORT_OPTIONS}
                            onChange={event => setSortBy(event.target.value)}
                        />
                    </div>
                    <div>
                        Per page:{' '}
                        <Dropdown
                            value={limit}
                            options={LIMIT_OPTIONS}
                            onChange={event => {
                                console.log(parseInt(event.target.value));
                                setLimit(parseInt(event.target.value));
                            }}
                        />
                    </div>
                    <SortOrder
                        onClick={() =>
                            setSortOrderModifier(sortOrderModifier * -1)
                        }
                    >
                        {sortOrderModifier === 1 ? '▼' : '▲'}
                    </SortOrder>
                    <SortOrder onClick={() => setOpenModal(true)}>+</SortOrder>
                </InsideFilter>
            </FilterFunctionalities>
        ),
        [searchTerm, sortBy, sortOrderModifier, limit, openModal]
    );

    return (
        <Fragment>
            {openModal ? <AddItem /> : null}
            {searchComponent}
            <ItemContainer>
                <Container>
                    <ItemCount>
                        <Error error={error} />
                        <div>
                            {filteredItems.length}{' '}
                            {filteredItems.length < 2 ? 'item' : 'items'}
                        </div>
                    </ItemCount>
                    {loading & (items && items.length === 0) ? (
                        <Loading>Loading...</Loading>
                    ) : searchTerm &&
                      filteredItems &&
                      filteredItems.length === 0 ? (
                        <NothingFound>
                            No item found for "{searchTerm}". 😥
                        </NothingFound>
                    ) : items && items.length > 0 ? (
                        <Paginator
                            data={filteredItems}
                            offset={offset}
                            setOffset={setOffset}
                            limit={limit}
                        >
                            {slicedItems => (
                                <Results>
                                    <Error error={deleteItemError} />
                                    {slicedItems.map(item => (
                                        <Item
                                            key={item.id}
                                            item={item}
                                            addItem={addItem}
                                            deleteItem={deleteItem}
                                        />
                                    ))}
                                </Results>
                            )}
                        </Paginator>
                    ) : error ? null : (
                        <Fragment>
                            <Error error={addStarterItemsError} />
                            <StarterPrompt>
                                <p>
                                    Looks like you don't have any items in your
                                    inventory yet. Would you like to start with
                                    some typical office items?
                                </p>
                                <Button onClick={addStarterItems}>
                                    Create starter items
                                </Button>
                            </StarterPrompt>
                        </Fragment>
                    )}
                </Container>
            </ItemContainer>
        </Fragment>
    );
};

const FilterFunctionalities = styled.div`
    border-top: 1px solid black;
    background: linear-gradient(rgb(85, 85, 85), rgb(60, 60, 60));
    min-width: 100%;
`;

const InsideFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

const ItemCount = styled.div`
    text-align: right;
`;

const SortOrder = styled(Button)`
    margin-left: 0.5rem;
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

const ItemContainer = styled.section`
    padding-bottom: 8rem;
    display: flex;
    justify-content: center;
    max-width: 1200px;
`;

const Container = styled.div``;
