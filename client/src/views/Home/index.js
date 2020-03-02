import React, { Fragment } from 'react';

import Greetings from './Greetings';
import ItemList from './ItemList';
import AddItem from './AddItem';

export default () => {
    return (
        <Fragment>
            <Greetings />
            <AddItem />
            <ItemList />
        </Fragment>
    );
};
