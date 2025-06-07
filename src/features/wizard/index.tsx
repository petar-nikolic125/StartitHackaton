import WizardFlow from './WizardFlow';
import { ErrorBoundary } from '../../components/ErrorBoundary';

export default function WizardLayout() {
  return (
    <ErrorBoundary>
      <WizardFlow />
    </ErrorBoundary>
  );
}
