import React from 'react';
import {Dialog} from './Dialog';

export const ContinueOrNot = () => (
    <Dialog
        title="Do you want to label more posts?"
        word1="Yes"
        link1="/chooseLang"
        word2="No, I want to rest."
        link2="/bye"
    />
    
);