
import * as React from "react";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";

interface IPostStateProps {
    focus: boolean;

}

export class PostView extends React.Component<{}, {}> {
    public colorScheme = {
        negative: "lightpink",
        neutral: "lightgreen",
        positive: "lightblue",
    };

    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: "",
            focus: false,
        };
    }

    public handleOnChange = (value) => {
        this.setState({backgroundColor: this.colorScheme[value]});
        this
            .props
            .onChange(value);
    }

    public render() {
        const divStyle = {
            margin: "10px",
            border: this.state.focus ? "5px" : "3px",
            borderColor: this.state.focus ? "cyan" : "white",
            borderStyle: "solid",
            position: "relative",
        };
        const jumbotronStyle = {
            padding: "10px 10px 10px 10px",
            marginBottom: "0px",
            backgroundColor: this.state.backgroundColor,
        };
        const mergeButtonStyle = {
            position: "absolute",
            bottom: "10px",
            right: "10px",
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
                            <ToggleButton value={"unknown"}>Unknown �</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                    {this.props.renderMergeButton
                        ? <Button style={mergeButtonStyle} onClick={this.props.handleMerge}>
                                Merge with previous sentence
                            </Button>
                        : null}
                </Jumbotron>
            </div>
        );

    }

}
