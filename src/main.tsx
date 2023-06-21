import { render } from 'preact'
import { App } from './app.tsx'
import Router from 'preact-router'
import CreateLink from './pages/CreateLink.tsx';

const Main = () => (
    <Router>
        <CreateLink path="/" />
    </Router>
);

render(<Main/>, document.body)
