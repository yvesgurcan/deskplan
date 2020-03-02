import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

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

    return (
        <Container>
            <Error error={addItemError} />
            <AddItem>
                <AddForm
                    onSubmit={event => {
                        event.preventDefault();
                        const quantity = Number(itemToAdd.quantity);
                        addItem({ variables: { ...itemToAdd, quantity } });
                    }}
                >
                    <AddFormColumn>
                        <AddFormGroup>
                            <Title>Add item</Title>
                        </AddFormGroup>
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
                            <AddButton>
                                <FontAwesomeIcon icon={faSave} />
                            </AddButton>
                        </AddFormGroup>
                    </AddFormColumn>
                </AddForm>
            </AddItem>
        </Container>
    );
};

const Title = styled.h2`
    margin: 0;
    display: inline;
`;

const AddForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0;
`;

const AddFormColumn = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const AddFormGroup = styled.div`
    margin-right: 4rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const AddLabel = styled.label`
    padding: 0.3rem;
    font-size: 110%;
`;

const AddItem = styled.section`
    padding: 1rem;
    max-width: 1100px;
`;

const AddButton = styled(Button)`
    margin-left: 2rem;
    margin-top: 0.35rem;
`;

const Container = styled.div`
    min-width: 100%;
    border-top: 1px solid black;
    background: linear-gradient(rgb(60, 60, 60), rgb(35, 35, 35));
    display: flex;
    justify-content: center;
`;
