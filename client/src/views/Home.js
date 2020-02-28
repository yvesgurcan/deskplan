import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import DateTime from 'luxon/src/datetime.js';

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

const DELETE_ITEM = gql`
    mutation deleteItem($id: ID!) {
        deleteItem(id: $id)
    }
`;

const DEFAULT_ADD_ITEM = {
    name: '',
    quantity: 0
};

function parseApolloErrors(errorObject) {
    const networkErrors = errorObject?.networkError?.result?.errors;
    if (networkErrors) {
        return networkErrors.map(error => error.message);
    }

    const networkErrorMessage = errorObject?.networkError?.message;
    if (networkErrorMessage) {
        return [networkErrorMessage];
    }

    const graphQLErrors = errorObject?.graphQLErrors;
    if (graphQLErrors) {
        let errors = [];
        graphQLErrors.forEach(error => {
            if (error.message === 'ValidationError') {
                error.extensions.code.forEach(validationError => {
                    errors.push(validationError);
                });
                return;
            }

            errors.push(error.message);
        });
        return errors;
    }

    return [];
}

export default () => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [itemToAdd, setItemToAdd] = useState({ ...DEFAULT_ADD_ITEM });

    const { loading, error, data } = useQuery(GET_ITEMS);
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
        if (data) {
            const updatedItems = [...data.items].sort(
                ({ updatedAt: updatedAtA }, { updatedAt: updatedAtB }) => {
                    return updatedAtB - updatedAtA;
                }
            );
            setFilteredItems(updatedItems);
        }
    }, [data]);

    return (
        <Fragment>
            <AddItem>
                <Title>Add item</Title>
                <Error>
                    {parseApolloErrors(addItemError).map(error => (
                        <div key={error.message || error}>
                            {error.message || error}
                        </div>
                    ))}
                </Error>
                <AddForm
                    onSubmit={event => {
                        event.preventDefault();
                        const quantity = Number(itemToAdd.quantity);
                        setItemToAdd({ ...itemToAdd, quantity });
                        addItem({ variables: { ...itemToAdd, quantity } });
                    }}
                >
                    <AddFormColumn>
                        <AddFormGroup>
                            <AddLabel>Name:</AddLabel>
                            <AddInput
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
                            <AddQuantityInput
                                value={itemToAdd.quantity}
                                placeholder="Qty"
                                type="number"
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
            <Search>
                <Title>Recently updated items</Title>
                <div>
                    🔎 <SearchInput placeholder="Search" />
                </div>
            </Search>
            <Results>
                <Error>
                    {parseApolloErrors(error).map(error => (
                        <div key={error.message || error}>
                            {error.message || error}
                        </div>
                    ))}
                </Error>
                <Error>
                    {parseApolloErrors(deleteItemError).map(error => (
                        <div key={error.message || error}>
                            {error.message || error}
                        </div>
                    ))}
                </Error>
                {filteredItems.map(({ id, name, quantity, updatedAt }) => {
                    const updatedAtLocal = DateTime.fromMillis(
                        parseInt(updatedAt)
                    );
                    return (
                        <Item key={id}>
                            <div>
                                {name} (x{quantity}){' '}
                                {updatedAtLocal.toRelative()}{' '}
                            </div>
                            <ItemActions>
                                <Button>Edit</Button>
                                <Button
                                    onClick={() =>
                                        deleteItem({ variables: { id } })
                                    }
                                >
                                    Delete
                                </Button>
                            </ItemActions>
                        </Item>
                    );
                })}
            </Results>
        </Fragment>
    );
};

const AddItem = styled.section``;

const Error = styled.div`
    color: orange;
`;

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

const AddInput = styled.input`
    padding: 0.3rem;
    font-size: 110%;
`;

const AddQuantityInput = styled(AddInput)`
    width: 5rem;
`;

const Button = styled.button`
    font-size: 120%;
`;

const Search = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 5px solid rgb(80, 80, 80);
    padding-top: 2rem;
`;

const Title = styled.h2`
    margin: 0;
`;

const SearchInput = styled.input`
    padding: 0.3rem;
    margin-left: 0.5rem;
    font-size: 110%;
`;

const Results = styled.ul``;

const Item = styled.li`
    display: flex;
    justify-content: space-between;
`;

const ItemActions = styled.div`
    display: flex;
    & > * {
        margin: 0.2rem;
    }
`;
