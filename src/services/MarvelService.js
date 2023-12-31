import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { request, clearError, process, setProcess } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=637284b3e9da78f372a674de62b7b751";
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`,
        );
        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 200)}...`
                : "No information about this character",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "No description",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            pages: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
            language: comics.textObjects[0]?.language || "en-us",
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "Not available",
        };
    };

    return {
        clearError,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        getAllComics,
        getComic,
        process,
        setProcess,
    };
};

export default useMarvelService;
