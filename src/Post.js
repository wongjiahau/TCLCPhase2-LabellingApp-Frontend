import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

export const Post = (props) => {
    const divStyle = {
        margin: '50px',
        borderColor: props.color,
        borderStyle: "solid",
    };
    const jumbotronStyle = {
        padding: '40px 20px',
        marginBottom: '0px'
    };
    return (
        <div style={divStyle}>
            <Jumbotron style={jumbotronStyle}>
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
        </div>
    )
}