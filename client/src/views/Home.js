import React, { Fragment } from 'react';

import Greetings from '../components/Home.Greetings';
import ItemList from '../components/Home.ItemList';
import AddItem from '../components/Home.AddItem';

export default () => {
    return (
        <Fragment>
            <Greetings />
            <AddItem />
            <ItemList />
        </Fragment>
    );
};
