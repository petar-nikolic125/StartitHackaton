import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import PromptStep, { type PromptHandles } from "../PromptStep";

function setup() {
  const ref = React.createRef<PromptHandles>();
  render(<PromptStep ref={ref} />);
  return { ref };
}

test("validates prompt input and returns data", () => {
  const { ref } = setup();
  fireEvent.change(screen.getByPlaceholderText(/help me grow/i), {
    target: { value: "My prompt" },
  });
  let valid = false;
  act(() => {
    valid = ref.current!.isValid();
  });
  expect(valid).toBe(true);
  expect(ref.current!.getData()).toEqual({ prompt: "My prompt" });
});

test("shows error when empty", () => {
  const { ref } = setup();
  let valid = true;
  act(() => {
    valid = ref.current!.isValid();
  });
  expect(valid).toBe(false);
  expect(screen.getByText(/please enter a prompt/i)).toBeInTheDocument();
});
