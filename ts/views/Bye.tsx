import Center from 'react-center';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import React from 'react';

export const Bye = () => {
    // TODO: End user session
    delete window.lastLogin;
    return (
    <Center>
        <PageHeader style={{textAlign:'center', marginTop: '200px'}}>
            Thanks for your contribution<br/>
            <small>Good bye and have a nice day!</small>
        </PageHeader>
    </Center>

)}