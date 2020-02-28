import React, { Fragment, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Item from '../components/Item';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import NumberInput from '../components/NumberInput';
import Error from '../components/Error';

const GET_USER = gql`
    query getUser {
        user {
            firstName
        }
    }
`;

const ItemFields = `
    id
    createdAt
    updatedAt
    name
    quantity
`;

const GET_ITEMS = gql`
    query getItems {
        items {
            ${ItemFields}
        }
    }
`;

const ADD_ITEM = gql`
    mutation addItem($name: String!, $quantity: Int) {
        addItem(name: $name, quantity: $quantity) {
            ${ItemFields}
        }
    }
`;

const ADD_STARTER_ITEMS = gql`
    mutation addStarterItems {
        addStarterItems {
            ${ItemFields}
        }
    }
`;

const DELETE_ITEM = gql`
    mutation deleteItem($id: ID!) {
        deleteItem(id: $id)
    }
`;

const DEFAULT_ADD_ITEM = {
    name: '',
    quantity: 0
};

export default () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [itemToAdd, setItemToAdd] = useState({ ...DEFAULT_ADD_ITEM });

    const {
        loading: getUserLoading,
        error: getUserError,
        data: { user } = {}
    } = useQuery(GET_USER);

    const {
        loading: getItemsLoading,
        error: getItemsError,
        data: { items } = {}
    } = useQuery(GET_ITEMS);
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

            const updatedItems = [...searchedItems].sort(
                ({ updatedAt: updatedAtA }, { updatedAt: updatedAtB }) => {
                    return updatedAtB - updatedAtA;
                }
            );
            setFilteredItems(updatedItems);
        }
    }, [items, searchTerm]);

    const userGreetingsComponent = useMemo(
        () => (
            <Greetings>
                {getUserError ? (
                    <Title>Welcome back!</Title>
                ) : user ? (
                    <Title>Welcome back, {user.firstName}</Title>
                ) : null}

                <Error error={getUserError} />
            </Greetings>
        ),
        [user, getUserError]
    );

    const addItemComponent = useMemo(
        () => (
            <AddItem>
                <Title>Add item</Title>
                <Error error={addItemError} />
                <AddForm
                    onSubmit={event => {
                        event.preventDefault();
                        const quantity = Number(itemToAdd.quantity);
                        addItem({ variables: { ...itemToAdd, quantity } });
                    }}
                >
                    <AddFormColumn>
                        <AddFormGroup>
                            <AddLabel>Name:</AddLabel>
                            <TextInput
                                value={itemToAdd.name}
                                placeholder="Name of item"
                                onChange={event =>
                                    setItemToAdd({
                                        ...itemToAdd,
                                        name: event.target.value
                                    })
                                }
                            />
                        </AddFormGroup>
                        <AddFormGroup>
                            <AddLabel>Quantity:</AddLabel>
                            <NumberInput
                                value={itemToAdd.quantity}
                                placeholder="Qty"
                                onChange={event =>
                                    setItemToAdd({
                                        ...itemToAdd,
                                        quantity: event.target.value
                                    })
                                }
                            />
                        </AddFormGroup>
                        <AddFormGroup>
                            <Button>Submit</Button>
                        </AddFormGroup>
                    </AddFormColumn>
                </AddForm>
            </AddItem>
        ),
        [itemToAdd, addItemError]
    );

    const searchComponent = useMemo(
        () => (
            <Search>
                <Title>Your inventory</Title>
                <div>
                    🔎{' '}
                    <SearchInput
                        placeholder="Search"
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                </div>
            </Search>
        ),
        [searchTerm]
    );

    const itemsInfoComponent = useMemo(
        () => (
            <Search>
                {getItemsError ? <Error error={getItemsError} /> : <div />}
                <div>
                    {filteredItems.length}{' '}
                    {filteredItems.length < 2 ? 'item' : 'items'}
                </div>
            </Search>
        ),
        [getItemsError, filteredItems]
    );

    const itemsListComponent = useMemo(
        () =>
            getItemsLoading ? (
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
            ) : getItemsError ? null : (
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
            ),
        [
            getItemsLoading,
            searchTerm,
            filteredItems,
            items,
            getItemsError,
            addStarterItemsError,
            deleteItemError
        ]
    );

    return (
        <Fragment>
            {userGreetingsComponent}
            {addItemComponent}
            <ItemContainer>
                {searchComponent}
                {itemsInfoComponent}
                {itemsListComponent}
            </ItemContainer>
        </Fragment>
    );
};

const Greetings = styled.section`
    padding-bottom: 2rem;
    text-align: center;
    min-height: 3rem;
`;

const SectionSeparator = styled.section`
    border-top: 5px solid rgb(80, 80, 80);
    padding-top: 2rem;
`;

const AddItem = styled(SectionSeparator)``;

const AddForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const AddFormColumn = styled.div`
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
`;

const AddFormGroup = styled.div`
    margin-right: 5rem;
    margin-bottom: 1rem;
`;

const AddLabel = styled.label`
    padding: 0.3rem;
    font-size: 110%;
`;

const ItemContainer = styled(SectionSeparator)`
    padding-bottom: 8rem;
`;

const StarterPrompt = styled.div`
    text-align: center;
`;

const Loading = styled.div`
    text-align: center;
    padding: 2rem;
`;

const NothingFound = styled(Loading)``;

const Search = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h2`
    margin: 0;
`;

const SearchInput = styled(TextInput)`
    padding: 0.3rem;
    margin-left: 0.5rem;
    font-size: 110%;
`;

const Results = styled.ul``;
