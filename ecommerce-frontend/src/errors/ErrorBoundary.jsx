import React from "react";
import { Button, Result } from "antd";
import { AddButton } from "../buttons/GlobalButtons2";

const logErrorToService = (error, errorInfo) => {
  console.error("Logged to external service:", {
    error,
    errorInfo,
    url: window.location.href,
    userAgent: navigator.userAgent,
  });
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Result
            status="500"
            title="500"
            // subTitle="Sorry, something went wrong."
            subTitle={
              <div>
                <h1>Ooops... Something went wrong!</h1>
                <p>
                  {this.state.error?.message || "An unexpected error occurred"}
                </p>
              </div>
            }
            extra={
              <AddButton
                className="mt-3"
                label={"Try Again"}
                onClick={this.handleRetry}
              />
            }
          />

          {/* real 👇 */}
          <div className="p-5 text-red-500 text-center hidden">
            <h1>Ooops... Something went wrong!</h1>
            <p>{this.state.error?.message || "An unexpected error occurred"}</p>

            {/* <button className="mt-3" onClick={this.handleRetry}>
            Try Again
          </button> */}

            <AddButton
              className="mt-3"
              label={"Try Again"}
              onClick={this.handleRetry}
            />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
