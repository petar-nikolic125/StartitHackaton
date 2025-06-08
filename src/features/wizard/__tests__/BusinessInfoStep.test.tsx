import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { wizardSlice } from '../wizardSlice';
import { BusinessInfoStep, type BusinessInfoHandles } from '../BusinessInfoStep';

function setup() {
  const store = configureStore({ reducer: { wizard: wizardSlice.reducer } });
  const ref = React.createRef<BusinessInfoHandles>();
  render(
    <Provider store={store}>
      <BusinessInfoStep ref={ref} onChange={() => {}} />
    </Provider>
  );
  return { store, ref };
}

test('isValid and getData return values when fields complete', () => {
  const { ref } = setup();
  fireEvent.change(screen.getByLabelText(/your niche/i), { target: { value: 'ai' } });
  fireEvent.change(screen.getByLabelText(/product type/i), { target: { value: 'video' } });
  fireEvent.change(screen.getByLabelText(/target price range/i), { target: { value: '$0-49' } });
  let valid = false;
  act(() => {
    valid = ref.current!.isValid();
  });
  expect(valid).toBe(true);
  expect(ref.current!.getData()).toEqual({ niche: 'ai', productType: 'video', targetPriceRange: '$0-49' });
});

test('isValid shows errors when fields missing', () => {
  const { ref } = setup();
  let valid = true;
  act(() => {
    valid = ref.current!.isValid();
  });
  expect(valid).toBe(false);
  expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
});
