import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../src/views/Home';

test('Renders', () => {
    const { getByRole } = render(<Home />);
    expect(getByRole('heading')).toHaveTextContent('Yolo!');
});
