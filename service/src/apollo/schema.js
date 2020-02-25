import { gql } from 'apollo-server';

export default gql`
    type Item {
        name: String
        count: Int
    }

    type Query {
        items: [Item]
    }
`;
