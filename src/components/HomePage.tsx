import { Button, Typography } from '@mui/joy';
import { FunctionComponent} from 'preact';
import { route } from 'preact-router';

const HomePage: FunctionComponent = () => {
    return (
        <div style={{"display": "flex", "alignItems": "centre", "flexDirection": "column", "gap": "20px"}}>
            <Typography level="h3">Choose Your Poison:</Typography>
            <Button size="lg" color='neutral' onClick={() => route('/link')}>Create Link</Button>
            <Button size="lg" color='neutral' onClick={() => route('/email_link')}>Generate Email with Link</Button>
            <Button size="lg" color='neutral' onClick={() => route('/file')}>Create Document</Button>
            <Button size="lg" color='neutral' onClick={() => route('/email_file')}>Generate Email with File</Button>
        </div>
    );
}
export default HomePage;