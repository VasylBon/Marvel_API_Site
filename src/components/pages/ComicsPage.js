import ComicsList from "../comicsList/ComicsList";
import SingleComics from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ComicsList />
            {/* <SingleComics/> */}
        </>
    );
};

export default ComicsPage;
