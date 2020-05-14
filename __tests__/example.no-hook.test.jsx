/* eslint-disable react/forbid-foreign-prop-types */
/* eslint-disable no-multi-assign */
import React, { Component } from 'react';
import { render, cleanup } from '@testing-library/react/pure';

describe('example test', () => {
  afterEach(cleanup);

  test('React Component should use default props', () => {
    class MyCustomCompName extends Component {
      render() {
        return <div>{this.props.name}</div>;
      }
    }

    MyCustomCompName.defaultProps = {
      name: 'Bob',
    };

    const { container } = render(<MyCustomCompName />);
    expect(container).toHaveTextContent('Bob');
  });
});
