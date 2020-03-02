import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { GET_ITEMS, ADD_ITEM } from '../queries/items';

import Button from './Shared.Button';
import TextInput from './Shared.TextInput';
import NumberInput from './Shared.NumberInput';
import Error from './Shared.Error';

const DEFAULT_ADD_ITEM = {
    name: '',
    quantity: 0
};

export default () => {
    const [itemToAdd, setItemToAdd] = useState({ ...DEFAULT_ADD_ITEM });

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

    const node = (
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
    );

    const mount = document.getElementById('modal');
    return createPortal(node, mount);
};

const Title = styled.h2`
    margin: 0;
`;

const AddForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0;
`;

const AddFormColumn = styled.div`
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
`;

const AddFormGroup = styled.div`
    margin-right: 5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const AddLabel = styled.label`
    padding: 0.3rem;
    font-size: 110%;
`;

const AddItem = styled.section`
    padding: 1rem;
`;
