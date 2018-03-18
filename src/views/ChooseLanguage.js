import Button from 'react-bootstrap/lib/Button';
import Center from 'react-center';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import React, {Component} from 'react';

const style = {
    marginTop: '100px'
}
const wellStyles = {
    maxWidth: 400,
    margin: '0 auto 10px'
};
export const ChooseLanguage = () => (
    <Center>
        <div style={style}>
            <PageHeader>Choose a language</PageHeader>
            <div className="well" style={wellStyles}>
                <Button bsStyle="primary" bsSize="large" block>
                    Chinese
                </Button>
                <Button bsStyle="primary" bsSize="large" block>
                    English
                </Button>
            </div>
        </div>
    </Center>
);