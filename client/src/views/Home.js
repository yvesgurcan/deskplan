import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ITEMS = gql`
    query getItems {
        items {
            id
            createdAt
            updatedAt
            name
            count
        }
    }
`;

export default () => {
    const { loading, error, data } = useQuery(ITEMS);
    const [filteredItems, setFilteredItems] = useState([]);

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

    console.log({ data });
    return (
        <Fragment>
            <Search>
                <Title>Recently updated items</Title>
                <div>
                    🔎 <SearchInput placeholder="Search" />
                </div>
            </Search>
            <Results>
                {filteredItems.map(({ id, name, count, updatedAt }) => (
                    <Item key={id}>
                        {name} (x{count})
                    </Item>
                ))}
            </Results>
        </Fragment>
    );
};

const Search = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const Item = styled.li``;
