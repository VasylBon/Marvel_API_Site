import { Component } from "react/cjs/react.production.min";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBounder extends Component {
    state = {
        error: false,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }
        return this.props.children;
    }
}

export default ErrorBounder;