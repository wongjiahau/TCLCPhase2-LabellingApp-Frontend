import * as React from "react";
import Center from "react-center";
import {Link} from "react-router-dom";
import {Dialog} from "./Dialog";

export const ChooseLanguage = () => (
    <div>
        <Dialog
            title="Choose a language"
            word1="Chinese"
            link1="/chinese"
            word2="English"
            link2="/english"
        />
        {/* <Center>
            <Link to="/progress">See progress</Link>
        </Center> */}
    </div>

);
