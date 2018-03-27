
import * as React from "react";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";
import { SemanticValue } from "./model/submitData";

interface IPostState {
    backgroundColor: string;
}

interface IPostProps {
    id: string;
    focus: boolean;
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
        };
    }

    public handleOnChange = (value: any) => {
        this.setState({backgroundColor: this.colorScheme[value] });
        this.props.handleOnChange(value as SemanticValue);
    }

    public render() {
        const divStyle : React.CSSProperties = {
            margin: this.props.focus ? "20px 20px" : "10px",
            boxShadow: this.props.focus ? "0px 0px 20px black" : null,
            position: "relative",
        };
        const jumbotronStyle = {
            borderRadius: "5px",
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
            <div id={this.props.id} style={divStyle}>
                <Jumbotron style={jumbotronStyle}>
                    <p>
                        {this.props.value}
                    </p>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="options" onChange={this.handleOnChange} defaultValue={"unassigned"}>
                            <ToggleButton value={"negative"}>(1) Negative 🙁</ToggleButton>
                            <ToggleButton value={"neutral"}>(2) Neutral</ToggleButton>
                            <ToggleButton value={"positive"}>(3) Positive 🙂</ToggleButton>
                            <ToggleButton value={"unassigned"} checked={true}>Unknown �</ToggleButton>
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

    public componentDidUpdate() {
        if (this.props.focus) {
            const node = document.getElementById(this.props.id) as HTMLElement;
            node.scrollIntoView({
                behavior: "smooth", // or "auto" or "instant"
                block: "center", // or "end" or "start"
            });
        }
    }

}
