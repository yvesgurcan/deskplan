import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { GET_ITEMS, ADD_ITEM } from '../../queries/items';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import NumberInput from '../../components/NumberInput';
import Error from '../../components/Error';

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

    return (
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
};

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

const SectionSeparator = styled.section`
    border-top: 5px solid rgb(80, 80, 80);
    padding-top: 2rem;
`;

const AddItem = styled(SectionSeparator)``;

const Title = styled.h2`
    margin: 0;
`;
