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

export default ({ item, addItem, deleteItem, offline, checked }) => {
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
                <NameInput
                    disabled={offline}
                    value={itemToUpdate.name}
                    placeholder="Name of item"
                    onChange={event =>
                        setItemToUpdate({
                            ...itemToUpdate,
                            name: event.target.value
                        })
                    }
                />
                <SecondaryInput>
                    <NameInput
                        disabled={offline}
                        value={itemToUpdate.link}
                        placeholder="URL to item details"
                        onChange={event =>
                            setItemToUpdate({
                                ...itemToUpdate,
                                link: event.target.value
                            })
                        }
                    />
                    <NumberInput
                        disabled={offline}
                        value={itemToUpdate.quantity}
                        placeholder="Qty"
                        onChange={event =>
                            setItemToUpdate({
                                ...itemToUpdate,
                                quantity: event.target.value
                            })
                        }
                    />
                </SecondaryInput>
                <Error error={updateItemError} />
            </UpdateForm>
        ),
        [itemToUpdate, updateItemError, offline]
    );

    const updatedAtLocal = useMemo(
        () => DateTime.fromMillis(parseInt(item.updatedAt)),
        [item]
    );
    const viewItemComponent = useMemo(
        () => (
            <ViewItem>
                <ItemLink
                    href={item.link || null}
                    target="_blank"
                    noreferrer
                    noopener
                >
                    {item.name} (&times;
                    {item.quantity})
                </ItemLink>
                <UpdatedAt>{updatedAtLocal.toRelative()} </UpdatedAt>
            </ViewItem>
        ),
        [item]
    );

    const editButtonsComponent = useMemo(
        () => (
            <Fragment>
                {editMode && (
                    <ActionButton
                        disabled={offline}
                        onClick={() => {
                            const quantity = Number(itemToUpdate.quantity);
                            updateItem({
                                variables: { ...itemToUpdate, quantity }
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </ActionButton>
                )}
                {editMode ? (
                    <ActionButton
                        onClick={() => {
                            setEditMode(false);
                            setItemToUpdate({ ...item });
                        }}
                    >
                        <FontAwesomeIcon icon={faWindowClose} />
                    </ActionButton>
                ) : (
                    <ActionButton
                        disabled={offline}
                        onClick={() => setEditMode(true)}
                    >
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </ActionButton>
                )}
            </Fragment>
        ),
        [editMode, itemToUpdate, item, offline]
    );

    const otherButtonsComponent = useMemo(
        () => (
            <Fragment>
                <ActionButton
                    disabled={offline}
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
                    disabled={offline}
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
        [item, offline]
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
    min-height: 54px;

    @media only screen and (max-width: 530px) {
        flex-direction: column;
    }
`;

const ViewItem = styled.div`
    margin-bottom: 0.2rem;
`;

const ItemLink = styled.a`
    color: inherit;
    text-decoration: none;

    &[href]:hover {
        text-decoration: underline;
    }
`;

const ItemActions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.2rem;
    button {
        height: 2.7rem;
    }

    @media only screen and (max-width: 530px) {
        justify-content: flex-start;
        margin-bottom: 1rem;
    }
`;

const UpdateForm = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 0.2rem;
    input {
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
        margin-right: 0.4rem;
    }
`;

const UpdatedAt = styled.div`
    color: grey;
`;

const ActionButton = styled(Button)`
    margin-right: 0.4rem;
`;

const NameInput = styled(TextInput)`
    flex-grow: 1;
`;

const SecondaryInput = styled.div`
    display: flex;
    flex: 2;

    @media only screen and (max-width: 885px) {
        width: 100%;
    }
`;
