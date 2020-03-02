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

export default ({ offline }) => {
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
                        disabled={offline}
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
                        disabled={offline}
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
                <AddButton disabled={offline}>
                    <FontAwesomeIcon icon={faSave} />
                </AddButton>
            </AddForm>
        </Fragment>
    );
};

const AddForm = styled.form`
    display: flex;
    justify-content: center;
    min-width: 100%;
    border-top: 1px solid black;
    background: linear-gradient(rgb(60, 60, 60), rgb(35, 35, 35));
    padding: 1rem;
<<<<<<< HEAD
    box-sizing: border-box;
=======
>>>>>>> eb16feae8fb7dbb7f27b3d419c1250683a749fcd
    margin: 0;
`;

const AddButton = styled(FormButton)`
    margin-left: 1rem;

    @media only screen and (max-width: 632px) {
        margin-top: 1.8rem;
    }
`;
