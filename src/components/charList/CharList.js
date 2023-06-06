import { Component } from "react/cjs/react.production.min";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";

import "./charList.scss";

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoaded = (characters) => {
        this.setState({
            characters,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    render() {
        const { characters, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const loader = loading ? <Loader /> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {loader}

                <ul className="char__grid">
                    {characters.map((character) => (
                        <li
                            className="char__item"
                            key={character.id}
                            onClick={() => this.props.onCharSelected(character.id)}
                        >
                            <img
                                src={character.thumbnail}
                                alt={character.name}
                                style={{
                                    objectFit: `${
                                        character.thumbnail.includes(
                                            "image_not_available",
                                            0,
                                        )
                                            ? "unset"
                                            : "cover"
                                    }`,
                                }}
                            />
                            <div className="char__name">{character.name}</div>
                        </li>
                    ))}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
