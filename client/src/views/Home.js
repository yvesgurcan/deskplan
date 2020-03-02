import React, { Fragment } from 'react';

import Greetings from '../sections/Greetings';
import ItemList from '../sections/ItemList';
import AddItem from '../sections/AddItem';

export default () => {
    return (
        <Fragment>
            <Greetings />
            <AddItem />
            <ItemList />
        </Fragment>
    );
};
