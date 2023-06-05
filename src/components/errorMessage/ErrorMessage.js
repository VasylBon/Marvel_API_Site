import error from "./gif_404.gif";

const ErrorMessage = () => {
    return (
        <img
            src={error}
            alt="error"
            style={{
                margin: "0 auto",
                background: "none",
                display: "block",
                height: "260px",
            }}
        />
    );
};

export default ErrorMessage;
