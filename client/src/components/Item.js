import React, { Fragment, useState, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import DateTime from 'luxon/src/datetime.js';

import { GET_ITEMS, UPDATE_ITEM } from '../queries/items';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import NumberInput from '../components/NumberInput';
import Error from '../components/Error';

export default ({ item, addItem, deleteItem }) => {
    const [editMode, setEditMode] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState(item);

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

    const editItemComponent = useMemo(
        () => (
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
                <Error error={updateItemError} />
            </div>
        ),
        [itemToUpdate, updateItemError]
    );

    const updatedAtLocal = useMemo(
        () => DateTime.fromMillis(parseInt(item.updatedAt)),
        [item]
    );
    const viewItemComponent = useMemo(
        () => (
            <div>
                {item.name} ({item.quantity}) {updatedAtLocal.toRelative()}{' '}
            </div>
        ),
        [item]
    );

    const editButtonsComponent = useMemo(
        () => (
            <Fragment>
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
            </Fragment>
        ),
        [editMode, itemToUpdate, item]
    );

    const otherButtonsComponent = useMemo(
        () => (
            <Fragment>
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
            </Fragment>
        ),
        [item]
    );

    return (
        <Item>
            {editMode ? editItemComponent : viewItemComponent}
            <ItemActions>
                {editButtonsComponent}
                {otherButtonsComponent}
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
