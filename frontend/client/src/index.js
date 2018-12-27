import React from 'react'
import ReactDom from 'react-dom'
// import { browserHistroy, Router} from 'react-router'
import { browserHistory, Router } from 'react-router';
import routes from './routes';


ReactDom.render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('root')
);