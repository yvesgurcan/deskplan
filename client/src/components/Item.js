import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import DateTime from 'luxon/src/datetime.js';
import { parseApolloErrors } from '../util';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import NumberInput from '../components/NumberInput';
import Error from '../components/Error';

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

const UPDATE_ITEM = gql`
    mutation updateItem($id: ID!, $name: String!, $quantity: Int) {
        updateItem(id: $id, name: $name, quantity: $quantity) {
            id
            ${ItemFields}
        }
    }
`;

export default ({ item, addItem, deleteItem }) => {
    const [editMode, setEditMode] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState(item);
    const updatedAtLocal = DateTime.fromMillis(parseInt(item.updatedAt));

    const [updateItem, { error: updateItemError = [] }] = useMutation(
        UPDATE_ITEM,
        {
            update(cache, { updateItem }) {
                if (updateItem) {
                    const { items } = cache.readQuery({ query: GET_ITEMS });
                    cache.writeQuery({
                        query: GET_ITEMS,
                        data: {
                            items: items.filter(item =>
                                item.id === updateItem ? updateItem : item
                            )
                        }
                    });
                }
                setEditMode(false);
            }
        }
    );

    return (
        <Item>
            {editMode ? (
                <div>
                    <TextInput
                        value={itemToUpdate.name}
                        placeholder="Name of item"
                        onChange={event =>
                            setItemToUpdate({
                                ...itemToUpdate,
                                name: event.target.value
                            })
                        }
                    />
                    <NumberInput
                        value={itemToUpdate.quantity}
                        placeholder="Qty"
                        onChange={event =>
                            setItemToUpdate({
                                ...itemToUpdate,
                                quantity: event.target.value
                            })
                        }
                    />
                    <Error>
                        {parseApolloErrors(updateItemError).map(error => (
                            <div key={error.message || error}>
                                {error.message || error}
                            </div>
                        ))}
                    </Error>
                </div>
            ) : (
                <div>
                    {item.name} ({item.quantity}) {updatedAtLocal.toRelative()}{' '}
                </div>
            )}
            <ItemActions>
                {editMode && (
                    <Button
                        onClick={() => {
                            setEditMode(false);
                            setItemToUpdate({ ...item });
                        }}
                    >
                        Cancel
                    </Button>
                )}
                {editMode ? (
                    <Button
                        onClick={() => {
                            const quantity = Number(itemToUpdate.quantity);
                            updateItem({
                                variables: { ...itemToUpdate, quantity }
                            });
                        }}
                    >
                        Save
                    </Button>
                ) : (
                    <Button onClick={() => setEditMode(true)}>Edit</Button>
                )}

                <Button
                    onClick={() =>
                        addItem({
                            variables: {
                                ...item
                            }
                        })
                    }
                >
                    Duplicate
                </Button>
                <Button
                    onClick={() =>
                        deleteItem({
                            variables: { id: item.id }
                        })
                    }
                >
                    Delete
                </Button>
            </ItemActions>
        </Item>
    );
};

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
