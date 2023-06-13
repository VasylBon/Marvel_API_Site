import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBounder from "../errorBounder/ErrorBounder";
import CharSearchForm from "../charSearchForm/CharSearchForm";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    };

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBounder>
                <RandomChar />
            </ErrorBounder>
            <div className="char__content">
                <ErrorBounder>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBounder>
                <div>
                    <ErrorBounder>
                        <CharInfo charId={selectedChar} />
                    </ErrorBounder>
                    <ErrorBounder>
                        <CharSearchForm />
                    </ErrorBounder>
                </div>
            </div>
            <img
                className="bg-decoration"
                src={decoration}
                alt="vision"
            />
        </>
    );
};

export default MainPage;
