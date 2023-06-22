import { render } from 'preact'
import Router from 'preact-router'
import MainPage from './pages/MainPage.tsx';
import GetLinkForm from './components/GetLinkForm.tsx';
import SubmitLinkForm from './components/SubmitLinkForm.tsx';
import SubmitEmailLinkForm from './components/SubmitEmailLinkForm.tsx';
import HomePage from './components/HomePage.tsx';
import SubmitFileForm from './components/SubmitFileForm.tsx';
import GetDocumentForm from './components/GetDocumentForm.tsx';
import "./main.css";

const Routing = () => (
    <Router>
        <HomePage path="/" />
        <SubmitLinkForm path="/link" />
        <SubmitEmailLinkForm path="/email" />
        <GetLinkForm path="/link/:id" />
        <SubmitFileForm path="/file"/>
        <GetDocumentForm path="/file/:id"/>
    </Router>
);

render(
    <MainPage title="Abc">
        <Routing />
    </MainPage>, document.body
)
