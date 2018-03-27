
import * as React from "react";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";
import { SemanticValue } from "./model/submitData";

interface IPostState {
    focus: boolean;
    backgroundColor: string;
}

interface IPostProps {
    value: string;
    renderMergeButton: boolean;
    handleOnChange(value: SemanticValue): void;
    handleMerge(): void;
}

export class PostView extends React.Component<IPostProps, IPostState> {
    public colorScheme : {[key: string] : string} = {
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

    public handleOnChange = (value: any) => {
        this.setState({backgroundColor: this.colorScheme[value] });
        this.props.handleOnChange(value as SemanticValue);
    }

    public render() {
        const divStyle : React.CSSProperties = {
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
        const mergeButtonStyle : React.CSSProperties = {
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
