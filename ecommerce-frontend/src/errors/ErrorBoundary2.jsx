import React from "react";
import { Button, Result } from "antd";

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
    this.state = { hasError: false, error: null, errorInfo: null, key: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      key: prevState.key + 1, // Force re-render by updating key
    }));
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary">Back Home</Button>}
          />

          <div className="p-5 text-red-500 text-center bg-gray-100 rounded-md shadow-md">
            <h1 className="text-2xl font-bold">
              😢 Oops! Something went wrong.
            </h1>
            <p className="mt-2 text-gray-700">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>

            {/* Show error details in development mode */}
            {import.meta.env.VITE_APP_ENV !== "prod" &&
              this.state.errorInfo && (
                <pre className="mt-4 p-3 bg-gray-200 text-left text-sm overflow-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}

            <div className="mt-4 space-x-3">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={this.handleRetry}
              >
                🔄 Try Again
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={this.handleRefresh}
              >
                🔃 Refresh Page
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
      <React.Fragment key={this.state.key}>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default ErrorBoundary;
