import React from "react";

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
        <div className="p-5 text-red-500 text-center">
          <h1>Ooops... Something went wrong!</h1>
          <p>{this.state.error?.message || "An unexpected error occurred"}</p>
          <button className="mt-3" onClick={this.handleRetry}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
