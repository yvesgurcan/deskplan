import React, { Fragment, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    GET_ITEMS,
    ADD_ITEM,
    ADD_STARTER_ITEMS,
    DELETE_ITEM
} from '../queries/items';
import Error from '../components/Shared.Error';
import Item from '../components/Shared.Item';
import Button from '../components/Shared.Button';
import Paginator from '../components/Shared.Paginator';

export default ({ searchTerm, sortBy, sortOrderModifier, limit }) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [offset, setOffset] = useState(0);

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

            if (updatedItems.length < offset * limit) {
                const updatedOffset = Math.ceil(
                    updatedItems.length / limit - 1
                );
                setOffset(updatedOffset);
            }

            setFilteredItems(updatedItems);
        }
    }, [items, searchTerm, sortBy, sortOrderModifier]);

    const itemListComponent = useMemo(
        () => (
            <Paginator
                data={filteredItems}
                offset={offset}
                setOffset={setOffset}
                limit={limit}
            >
                {slicedItems => (
                    <ul>
                        <Error error={deleteItemError} />
                        {slicedItems.map(item => (
                            <Item
                                key={item.id}
                                item={item}
                                addItem={addItem}
                                deleteItem={deleteItem}
                            />
                        ))}
                    </ul>
                )}
            </Paginator>
        ),
        [filteredItems, offset, limit]
    );

    return (
        <ItemListContainer>
            <Container>
                {loading & (items && items.length === 0) ? (
                    <Loading>Loading...</Loading>
                ) : searchTerm &&
                  filteredItems &&
                  filteredItems.length === 0 ? (
                    <NothingFound>
                        No item found for "{searchTerm}". 😥
                    </NothingFound>
                ) : items && items.length > 0 ? (
                    itemListComponent
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
            </Container>
        </ItemListContainer>
    );
};

const Loading = styled.div`
    text-align: center;
    padding: 2rem;
`;

const StarterPrompt = styled.div`
    text-align: center;
`;
const NothingFound = styled(Loading)``;

const ItemListContainer = styled.main`
    display: flex;
    justify-content: center;
    padding-top: 1rem;
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    padding-left: 1rem;
    padding-right: 1rem;
`;
