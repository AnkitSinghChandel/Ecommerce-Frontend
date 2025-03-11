// import React from "react";

// // Optional: Customize this for external error logging services
// const logErrorToService = (error, errorInfo) => {
//   // Example: Send error to an external service like Sentry
//   // Sentry.captureException(error, { extra: errorInfo });
//   console.error("Logged to external service:", error, errorInfo);
// };

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, errorMessage: "" };
//   }

//   static getDerivedStateFromError(error) {
//     // Return a new state to render fallback UI
//     return {
//       hasError: true,
//       errorMessage: error.message || "An unexpected error occurred",
//     };
//   }

//   componentDidCatch(error, errorInfo) {
//     // Log the error to an external service
//     logErrorToService(error, errorInfo);
//   }

//   handleRetry = () => {
//     this.setState({ hasError: false, errorMessage: "" });
//   };

//   render() {
//     if (this.state.hasError) {
//       // Fallback UI
//       return (
//         <div className="p-5 text-danger">
//           <h1 className="text-center">Ooops...</h1>
//           <h1 className="text-center">Something went wrong!</h1>
//           <p className="text-center">{this.state.errorMessage}</p>
//           <div className="text-center">
//             <button className="btn btn-primary" onClick={this.handleRetry}>
//               Try Again
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;

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
        <div className="p-5 text-danger text-center">
          <h1>Ooops... Something went wrong!</h1>
          <p>{this.state.error?.message || "An unexpected error occurred"}</p>
          <button className="btn btn-primary mt-3" onClick={this.handleRetry}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
