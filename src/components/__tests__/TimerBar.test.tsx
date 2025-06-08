import { render } from '@testing-library/react';
import { TimerBar } from '../TimerBar';

test('renders null with invalid props', () => {
  const { container } = render(<TimerBar />);
  expect(container.firstChild).toBeNull();
});

test('updates width on step change', () => {
  const { container, rerender } = render(<TimerBar currentStep={1} total={4} />);
  const bar = container.querySelector('.h-full') as HTMLElement;
  expect(bar.style.width).toBe('25%');
  rerender(<TimerBar currentStep={2} total={4} />);
  expect(bar.style.width).toBe('50%');
});
