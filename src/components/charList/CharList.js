import { Component } from "react/cjs/react.production.min";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";

import "./charList.scss";

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1540,
        charEnded: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onCharListLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({ offset, characters }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onRequest = (offset) => {
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    render() {
        const { characters, loading, error, offset, newItemLoading, charEnded } =
            this.state;

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
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ display: charEnded ? "none" : "block" }}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
