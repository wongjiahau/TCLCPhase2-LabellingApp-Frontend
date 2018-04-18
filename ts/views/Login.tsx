import * as React from "react";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";
import PageHeader from "react-bootstrap/lib/PageHeader";
import Center from "react-center";
import {Redirect} from "react-router-dom";
import shajs from "sha.js";

interface ILoginState {
    done: boolean;
    id: string;
    password: string;
}

export class Login extends React.Component<{}, ILoginState> {
    constructor(props) {

        super(props);
        this.state = {
            id: "",
            password: "",
            done: false,
        };
    }

    public render() {
        if (this.state.done) {
            return <Redirect to="chooseLang"/>;
        }
        return (
            <Center>
                <div style={{marginTop: "100px"}}>
                    <PageHeader>Login to TCLC project</PageHeader>
                    <FormControl
                        type="text"
                        value={this.state.id}
                        placeholder="ID"
                        onChange={this.handleIdChange}/>
                    <br/>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handlePasswordChange}/>
                    <br/>
                    <Button onClick={this.handleClick} bsStyle="primary" block>LOGIN</Button>
                </div>
            </Center>

        );
    }

    public handleIdChange = (e) => {
        this.setState({id: e.target.value});
    }

    public handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    public handleClick = () => {
        const correctHash = "70fd1f8ede7226d7cae3a9478abe9e77bc6cea2638905cc48196b5021818cb87";
        const inputHash = (new shajs.sha256().update(this.state.id + this.state.password).digest("hex"));
        if (inputHash === correctHash) {
            window.lastLogin = (new Date()).getTime();
            this.setState({done: true});
        } else {
            alert("Login failed. Wrong ID or wrong password.");
        }
    }

}
