import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } =
        useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case "comic":
                getComic(id).then(onDataLoaded);
                break;
            case "character":
                getCharacter(id).then(onDataLoaded);
                break;
        }
    };

    const onDataLoaded = (data) => {
        setData(data);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const loaded = loading ? <Loader /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {loaded}
            {content}
        </>
    );
};

export default SinglePage;
