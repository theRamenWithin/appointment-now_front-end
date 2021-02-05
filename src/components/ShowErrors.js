import React from 'react';
import Alert from '@material-ui/lab/Alert';

export default function ShowErrors(props) {

    // No idea why this doesn't work. It did work but then it stopped.
    return (
        props.errors ?
            props.errors.map(error => {
            return <div> 
                <Alert key={error} variant="filled" severity="error">
                    {error}
                </Alert>
                <br></br>
            </div>
            })
        : null
    );
}