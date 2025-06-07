import { Component, ReactNode } from 'react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRestart = () => {
    window.location.assign('/wizard/0');
  };

  handleSupport = () => {
    window.location.href = 'mailto:support@example.com';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 space-y-4" role="alert">
          <h2 className="text-xl font-semibold">Something went wrong.</h2>
          <div className="space-x-2">
            <Button aria-label="Restart Wizard" onClick={this.handleRestart}>
              Restart Wizard
            </Button>
            <Button
              aria-label="Contact Support"
              variant="solid"
              onClick={this.handleSupport}
            >
              Contact Support
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
