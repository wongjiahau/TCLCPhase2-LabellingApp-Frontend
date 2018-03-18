import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
const style = {
    marginLeft: '50px',
    marginRight: '50px',
    padding: '40px 20px'
}

export const Post = (props) => {
    return (
        <Jumbotron style={style}>
            <p>
                {props.value}
            </p>
            <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="options" onChange={props.onChange}>
                    <ToggleButton value={"positive"}>Positive 🙂</ToggleButton>
                    <ToggleButton value={"neutral"}>Neutral</ToggleButton>
                    <ToggleButton value={"negative"}>Negative 🙁</ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
        </Jumbotron>
    )
}