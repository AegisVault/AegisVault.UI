import { Button } from '@mui/joy';
import { FunctionComponent} from 'preact';
import { route } from 'preact-router';

const HomePage: FunctionComponent = () => {
    return (
        <div style={{"display": "flex", "alignItems": "centre", "flexDirection": "column"}}>
            <h1>Choose Your Poison:</h1>
            <Button size="lg" onClick={() => route('/link')}>Create Link</Button>
            <br/>
            <Button size="lg" onClick={() => route('/email')}>Generate Email with Link</Button>
            <br/>
            <Button size="lg" disabled>Create Document</Button>
        </div>
    );
}
export default HomePage;