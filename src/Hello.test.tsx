import * as React from 'react';
import * as enzyme from 'enzyme';
import Hello from 'Hello';

it('renders the correct text when no enthusiasm level is given', () => {
  const hello = enzyme.shallow(<Hello message="msg" />);
  expect(hello.find('.greeting').text()).toEqual('msg! ;)');
});

it('renders the correct text with an explicit enthusiasm of 1', () => {
  const hello = enzyme.shallow(<Hello message="msg" enthusiasmLevel={1}/>);
  expect(hello.find('.greeting').text()).toEqual('msg! ;)');
});

it('renders the correct text with an explicit enthusiasm level of 5', () => {
  const hello = enzyme.shallow(<Hello message="msg" enthusiasmLevel={5} />);
  expect(hello.find('.greeting').text()).toEqual('msg!!!!! ;)');
});

it('throws when the enthusiasm level is 0', () => {
  expect(() => {
    enzyme.shallow(<Hello message="msg" enthusiasmLevel={0} />);
  }).toThrow();
});

it('throws when the enthusiasm level is negative', () => {
  expect(() => {
    enzyme.shallow(<Hello message="msg" enthusiasmLevel={-1} />);
  }).toThrow();
});
