// Shim 'requestAnimationFrame'
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'raf/polyfill';

// Configure Enzyme adapter
// http://airbnb.io/enzyme/docs/installation/index.html#working-with-react-16
import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
configure({ adapter: new ReactSixteenAdapter() });