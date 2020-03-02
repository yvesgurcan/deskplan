import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_ADD_ITEM } from '../util';
import { GET_ITEMS, ADD_ITEM } from '../queries/items';
import TextInput from './Shared.TextInput';
import NumberInput from './Shared.NumberInput';
import Error from './Shared.Error';
import FormGroup from './Shared.FormGroup';
import FormButton from './Shared.FormButton';

export default () => {
    const [itemToAdd, setItemToAdd] = useState({ ...DEFAULT_ADD_ITEM });

    const [addItem, { error }] = useMutation(ADD_ITEM, {
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

    return (
        <Fragment>
            <Error error={error} />
            <AddForm
                onSubmit={event => {
                    event.preventDefault();
                    const quantity = Number(itemToAdd.quantity);
                    addItem({ variables: { ...itemToAdd, quantity } });
                }}
            >
                <FormGroup>
                    Name:{' '}
                    <TextInput
                        placeholder="Name of item to add"
                        value={itemToAdd.name}
                        onChange={event =>
                            setItemToAdd({
                                ...itemToAdd,
                                name: event.target.value
                            })
                        }
                    />
                </FormGroup>
                <FormGroup>
                    Quantity:{' '}
                    <NumberInput
                        placeholder="Qty"
                        value={itemToAdd.quantity}
                        onChange={event =>
                            setItemToAdd({
                                ...itemToAdd,
                                quantity: event.target.value
                            })
                        }
                    />
                </FormGroup>
                <AddButton>
                    <FontAwesomeIcon icon={faSave} />
                </AddButton>
            </AddForm>
        </Fragment>
    );
};

const AddForm = styled.form`
    min-width: 100%;
    border-top: 1px solid black;
    background: linear-gradient(rgb(60, 60, 60), rgb(35, 35, 35));
    display: flex;
    justify-content: center;
    padding: 1rem;
`;

const AddButton = styled(FormButton)`
    margin-left: 1rem;
`;
