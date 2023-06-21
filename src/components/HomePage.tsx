import { Button } from '@mui/joy';
import { FunctionComponent} from 'preact';
const HomePage: FunctionComponent = () => {
    return (
        <div style={{"display": "flex", "alignItems": "centre", "flexDirection": "column"}}>
            <h1>Welcome To AegisVault</h1>
            <Button size="lg">Create Link</Button>
            <br/>
            <Button size="lg" disabled>Create Document</Button>
        </div>
    );
}
export default HomePage;