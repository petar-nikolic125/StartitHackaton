import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { wizardSlice } from '../wizardSlice';
import { BusinessInfoStep } from '../BusinessInfoStep';

function setup() {
  const store = configureStore({ reducer: { wizard: wizardSlice.reducer } });
  const onNext = jest.fn();
  const onBack = jest.fn();
  render(
    <Provider store={store}>
      <BusinessInfoStep onNext={onNext} onBack={onBack} />
    </Provider>
  );
  return { store, onNext, onBack };
}

test('calls onNext with basics when valid', async () => {
  const { onNext } = setup();
  fireEvent.change(screen.getByLabelText(/your niche/i), { target: { value: 'ai' } });
  fireEvent.change(screen.getByLabelText(/product type/i), { target: { value: 'video' } });
  fireEvent.change(screen.getByLabelText(/target price range/i), { target: { value: '$0-49' } });
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
  });
  expect(onNext).toHaveBeenCalledWith({ basics: { niche: 'ai', productType: 'video', targetPriceRange: '$0-49' } });
});

test('shows errors when fields missing', async () => {
  const { onNext } = setup();
  const next = screen.getByRole('button', { name: /next/i });
  await act(async () => {
    fireEvent.click(next);
  });
  expect(next).toBeDisabled();
  expect(onNext).not.toHaveBeenCalled();
});
