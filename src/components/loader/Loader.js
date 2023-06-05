import loader from "./book_spinner.gif";

const Loader = () => {
    return (
        <img
            src={loader}
            alt="loader"
            style={{ margin: "0 auto", background: "none", display: "block" }}
        />
    );
};

export default Loader;
