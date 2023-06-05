import { Component } from "react/cjs/react.production.min";

import "./charList.scss";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
    state = {
        characters: [],
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (characters) => {
        this.setState({ characters });
    };

    updateChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch((error) => {
                console.error("Error loading characters:", error);
            });
    };

    render() {
        const { characters } = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characters.map((character) => (
                        <li className="char__item" key={character.name}>
                            <img
                                src={character.thumbnail}
                                alt={character.name}
                                style={{
                                    objectFit: `${
                                        character.thumbnail.includes(
                                            "image_not_available",
                                            0,
                                        )
                                            ? "contain"
                                            : "cover"
                                    }`,
                                }}
                            />
                            <div className="char__name">{character.name}</div>
                        </li>
                    ))}
                </ul>
                <button
                    className="button button__main button__long"
                    onClick={this.updateChar}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
