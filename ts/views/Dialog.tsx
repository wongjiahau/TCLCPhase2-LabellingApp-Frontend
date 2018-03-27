import Button from 'react-bootstrap/lib/Button';
import Center from 'react-center';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import React from 'react';
import {Link} from 'react-router-dom'

const style = {
    marginTop: '100px'
}
const wellStyles = {
    maxWidth: 400,
    margin: '0 auto 10px'
};
export const Dialog = (props) => (
    <Center>
        <div style={style}>
            <PageHeader>{props.title}</PageHeader>
            <div className="well" style={wellStyles}>
                <Link to={props.link1}>
                    <Button style={{marginBottom: '10px'}} bsStyle="primary" bsSize="large" block>
                        {props.word1}
                    </Button>
                </Link>
                <Link to={props.link2}>
                    <Button bsStyle="primary" bsSize="large" block>
                        {props.word2}
                    </Button>
                </Link>
            </div>
        </div>
    </Center>
);