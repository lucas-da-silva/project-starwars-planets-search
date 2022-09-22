import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

library.add(faMagnifyingGlass, faTrash);

ReactDOM.render(<App />, document.getElementById('root'));
