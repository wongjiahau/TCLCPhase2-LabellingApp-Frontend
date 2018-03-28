
import * as React from "react";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";
import { SemanticValue } from "../model/submitData";

interface IPostProps {
    id:                   string;
    belongsTo:            string;
    focus:                boolean;
    value:                string;
    semanticValue:        SemanticValue;
    renderMergeButton:    boolean;
    handleOnChange(value: any): void;
    handleMerge():        void;
}

export class PostView extends React.Component<IPostProps, {}> {
    public colorScheme : {[key: string] : string} = {
        negative: "lightpink",
        neutral: "lightgreen",
        positive: "lightblue",
    };

    constructor(props: IPostProps) {
        super(props);
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
            backgroundColor: this.colorScheme[this.props.semanticValue],
        };
        const mergeButtonStyle : React.CSSProperties = {
            position: "absolute",
            bottom: "10px",
            right: "10px",
        };

        return (
            <table style={{width: "100%"}}>
                <tr>
                    <td>
                        <span style={{marginLeft: "5px"}}>{this.props.belongsTo}</span>
                    </td>
                    <td>
                        <div id={this.props.id} style={divStyle}>
                            <Jumbotron style={jumbotronStyle}>
                                <p>
                                    {this.props.value}
                                </p>
                                <ButtonToolbar>
                                    <ToggleButtonGroup type="radio" name="options"
                                            onChange={this.props.handleOnChange}
                                            value={this.props.semanticValue}>
                                        <ToggleButton value={"negative"}>(1) Negative 🙁</ToggleButton>
                                        <ToggleButton value={"neutral"}>(2) Neutral</ToggleButton>
                                        <ToggleButton value={"positive"}>(3) Positive 🙂</ToggleButton>
                                        <ToggleButton value={"unassigned"} checked={true}>(4) Unknown �</ToggleButton>
                                    </ToggleButtonGroup>
                                </ButtonToolbar>
                                {this.props.renderMergeButton
                                    ? <Button style={mergeButtonStyle} onClick={this.props.handleMerge}>
                                            Merge with previous sentence (SPACEBAR)
                                        </Button>
                                    : null}
                            </Jumbotron>
                        </div>
                    </td>
                </tr>
            </table>
        );

    }

    public componentDidUpdate() {
        const BEHAVIOUR : "auto" | "instant" | "smooth" = "smooth";
        const BLOCK : "center" | "end" | "start" = "center";
        if (this.props.focus) {
            const node = document.getElementById(this.props.id) as HTMLElement;
            node.scrollIntoView({
                behavior: BEHAVIOUR,
                block: BLOCK,
            });
        }
    }

}
