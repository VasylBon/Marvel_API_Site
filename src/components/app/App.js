import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBounder from "../errorBounder/ErrorBounder";
import ComicsList from "../comicsList/ComicsList";
import SingleComics from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";

import decoration from "../../resources/img/vision.png";

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    };

    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <RandomChar />
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected} />
                    <ErrorBounder>
                        <CharInfo charId={selectedChar} />
                    </ErrorBounder>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" /> */}

                <AppBanner />
                <ComicsList />
                {/* <SingleComics/> */}
            </main>
        </div>
    );
};

export default App;
