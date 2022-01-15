import React, { ErrorInfo } from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

const ErrorDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorDisplay>Something went wrong loading the maps.</ErrorDisplay>;
    } else {
      return this.props.children;
    }
  }
}
