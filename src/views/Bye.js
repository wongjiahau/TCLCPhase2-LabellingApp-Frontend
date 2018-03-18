import Center from 'react-center';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import React, {Component} from 'react';

export const Bye = () => (
    <Center>
        <PageHeader style={{textAlign:'center', marginTop: '200px'}}>
            Thanks for your contribution<br/>
            <small>Good bye and have a nice day!</small>
        </PageHeader>
    </Center>

)