import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { wizardSlice } from "../wizardSlice";
import { BusinessInfoStep } from "../BusinessInfoStep";

function renderWithStore() {
  const store = configureStore({ reducer: { wizard: wizardSlice.reducer } });
  const onNext = jest.fn();
  render(
    <Provider store={store}>
      <BusinessInfoStep onNext={onNext} />
    </Provider>,
  );
  return { store, onNext };
}

test("dispatches basics on next", () => {
  const { store, onNext } = renderWithStore();
  fireEvent.change(screen.getByLabelText(/your niche/i), {
    target: { value: "ai" },
  });
  fireEvent.change(screen.getByLabelText(/product type/i), {
    target: { value: "video" },
  });
  fireEvent.change(screen.getByLabelText(/target price range/i), {
    target: { value: "$0-49" },
  });
  fireEvent.click(screen.getByRole("button", { name: /next/i }));
  const state = store.getState().wizard;
  expect(state.basics?.niche).toBe("ai");
  expect(onNext).toHaveBeenCalled();
});

test("prefills form from state", () => {
  const store = configureStore({ reducer: { wizard: wizardSlice.reducer } });
  store.dispatch(
    wizardSlice.actions.setBasics({
      niche: "fitness",
      productType: "video",
      targetPriceRange: "$0-49",
    }),
  );
  render(
    <Provider store={store}>
      <BusinessInfoStep onNext={jest.fn()} />
    </Provider>,
  );
  expect(screen.getByLabelText(/your niche/i)).toHaveValue("fitness");
  expect(screen.getByLabelText(/product type/i)).toHaveValue("video");
  expect(screen.getByLabelText(/target price range/i)).toHaveValue("$0-49");
});
