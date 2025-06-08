import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import IdeaStep, { type IdeaHandles } from '../IdeaStep';

function setup() {
  const ref = React.createRef<IdeaHandles>();
  render(<IdeaStep ref={ref} />);
  return { ref };
}

test('validates idea input and returns data', () => {
  const { ref } = setup();
  fireEvent.change(screen.getByPlaceholderText(/enter your full vision/i), { target: { value: 'Great idea' } });
  let valid = false;
  act(() => {
    valid = ref.current!.isValid();
  });
  expect(valid).toBe(true);
  expect(ref.current!.getData()).toEqual({ idea: 'Great idea' });
});

test('shows error when empty', () => {
  const { ref } = setup();
  let valid = true;
  act(() => {
    valid = ref.current!.isValid();
  });
  expect(valid).toBe(false);
  expect(screen.getByText(/please describe your idea/i)).toBeInTheDocument();
});
