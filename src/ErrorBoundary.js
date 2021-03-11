import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" noThrow />;
    }
    if (this.state.hasError) {
      return (
        <section className="mt-5 error">
          <div className="container d-flex align-items-center justify-content-center h-100">
            <h1 className="text-center">
              There was an error with this page <br className="mb-4" />
              <Link to="/" className="btn btn-primary btn-lg">
                Click here{" "}
              </Link>{" "}
              to visit the homepage or wait five seconds
            </h1>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
