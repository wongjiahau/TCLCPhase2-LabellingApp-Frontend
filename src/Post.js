import React, {Component} from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

export class Post extends Component {
    colorScheme = {
        'neutral': 'lightgreen',
        'positive' : 'lightblue',
        'negative': 'lightpink'
    };

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: ''
        }
    }

    handleOnChange = (value) => {
        this.setState({
            backgroundColor: this.colorScheme[value]
        });
        this.props.onChange(value);
    }

    render() {
        const divStyle = {
            margin: '10px',
            border: '3px',
            borderColor: this.props.color,
            borderStyle: "solid",
        };
        const jumbotronStyle = {
            padding: '40px 10px 20px 10px',
            marginBottom: '0px',
            backgroundColor: this.state.backgroundColor
        };
        return (
            <div style={divStyle}>
                <Jumbotron style={jumbotronStyle}>
                    <p>
                        {this.props.value}
                    </p>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="options" onChange={this.handleOnChange}>
                            <ToggleButton value={"positive"}>Positive 🙂</ToggleButton>
                            <ToggleButton value={"neutral"}>Neutral</ToggleButton>
                            <ToggleButton value={"negative"}>Negative 🙁</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </Jumbotron>
            </div>
        )

    }

}