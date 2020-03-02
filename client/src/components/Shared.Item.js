import React, { Fragment, useState, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import DateTime from 'luxon/src/datetime.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWindowClose,
    faSave,
    faPencilAlt,
    faClone,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

import { GET_ITEMS, UPDATE_ITEM } from '../queries/items';

import Button from './Shared.Button';
import TextInput from './Shared.TextInput';
import NumberInput from './Shared.NumberInput';
import Error from './Shared.Error';

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
            <UpdateForm>
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
            </UpdateForm>
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
                <div>
                    {item.name} ({item.quantity})
                </div>
                <UpdatedAt>{updatedAtLocal.toRelative()} </UpdatedAt>
            </div>
        ),
        [item]
    );

    const editButtonsComponent = useMemo(
        () => (
            <Fragment>
                {editMode && (
                    <ActionButton
                        onClick={() => {
                            setEditMode(false);
                            setItemToUpdate({ ...item });
                        }}
                    >
                        <FontAwesomeIcon icon={faWindowClose} />
                    </ActionButton>
                )}
                {editMode ? (
                    <ActionButton
                        onClick={() => {
                            const quantity = Number(itemToUpdate.quantity);
                            updateItem({
                                variables: { ...itemToUpdate, quantity }
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </ActionButton>
                ) : (
                    <ActionButton onClick={() => setEditMode(true)}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </ActionButton>
                )}
            </Fragment>
        ),
        [editMode, itemToUpdate, item]
    );

    const otherButtonsComponent = useMemo(
        () => (
            <Fragment>
                <ActionButton
                    onClick={() =>
                        addItem({
                            variables: {
                                ...item
                            }
                        })
                    }
                >
                    <FontAwesomeIcon icon={faClone} />
                </ActionButton>
                <ActionButton
                    onClick={() =>
                        deleteItem({
                            variables: { id: item.id }
                        })
                    }
                >
                    <FontAwesomeIcon icon={faTrash} />
                </ActionButton>
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
    margin: 0.4rem;
`;

const ItemActions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        height: 2.7rem;
    }
`;

const UpdateForm = styled.div`
    input {
        margin-top: 0.4rem;
        margin-right: 0.4rem;
    }
`;

const UpdatedAt = styled.div`
    color: grey;
`;

const ActionButton = styled(Button)`
    margin-right: 0.4rem;
`;
