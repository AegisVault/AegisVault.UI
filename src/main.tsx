import { render } from 'preact'
import Router from 'preact-router'
import MainPage from './pages/MainPage.tsx';
import GetLinkForm from './components/GetLinkForm.tsx';
import SubmitLinkForm from './components/SubmitLinkForm.tsx';
import HomePage from './components/HomePage.tsx';

const Routing = () => (
    <Router>
        <HomePage path="/" />
        <SubmitLinkForm path="/link" />
        <GetLinkForm path="/link/:id" />
    </Router>
);

render(
    <MainPage title="Abc">
        <Routing />
    </MainPage>, document.body
)
