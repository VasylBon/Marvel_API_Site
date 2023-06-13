import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const setContent = (process, Component, newComicsLoading) => {
    switch (process) {
        case "waiting":
            return <Loader />;
        case "loading":
            return newComicsLoading ? <Component /> : <Loader />;
        case "confirmed":
            return <Component />;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
};

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { getAllComics, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess("confirmed"));
    };

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.lenght < 8) {
            ended = true;
        }

        setComicsList((comicList) => [...comicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffset((offset) => offset + 8);
        setComicsEnded(ended);
    };

    function renderComics(arr) {
        const items = arr.map((item, i) => {
            return (
                <li
                    className="comics__item"
                    key={i}
                >
                    <Link to={`/comics/${item.id}`}>
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            );
        });

        return <ul className="comics__grid">{items}</ul>;
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderComics(comicsList), newComicsLoading)}
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{ display: comicsEnded ? "none" : "block" }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
