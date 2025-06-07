import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { wizardSlice } from "../wizardSlice";
import { BusinessInfoStep, type BusinessInfoHandles } from "../BusinessInfoStep";

function renderWithStore() {
  const store = configureStore({ reducer: { wizard: wizardSlice.reducer } });
  const ref = React.createRef<BusinessInfoHandles>();
  render(
    <Provider store={store}>
      <BusinessInfoStep ref={ref} />
    </Provider>,
  );
  return { store, ref };
}

test("validate and get data", () => {
  const { store, ref } = renderWithStore();
  fireEvent.change(screen.getByLabelText(/your niche/i), {
    target: { value: "ai" },
  });
  fireEvent.change(screen.getByLabelText(/product type/i), {
    target: { value: "video" },
  });
  fireEvent.change(screen.getByLabelText(/target price range/i), {
    target: { value: "$0-49" },
  });
  expect(ref.current?.isValid()).toBe(true);
  expect(ref.current?.getData().niche).toBe("ai");
});

test("prefills form from state", () => {
  const store = configureStore({ reducer: { wizard: wizardSlice.reducer } });
  const ref = React.createRef<BusinessInfoHandles>();
  store.dispatch(
    wizardSlice.actions.setBasics({
      niche: "fitness",
      productType: "video",
      targetPriceRange: "$0-49",
    }),
  );
  render(
    <Provider store={store}>
      <BusinessInfoStep ref={ref} />
    </Provider>,
  );
  expect(screen.getByLabelText(/your niche/i)).toHaveValue("fitness");
  expect(screen.getByLabelText(/product type/i)).toHaveValue("video");
  expect(screen.getByLabelText(/target price range/i)).toHaveValue("$0-49");
});
