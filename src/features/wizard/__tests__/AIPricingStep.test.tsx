import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { wizardSlice } from '../wizardSlice';
import { AIPricingStep, type PricingHandles } from '../AIPricingStep';

const generateMock = jest.fn();

jest.mock('../aiAgent', () => ({
  useGeneratePricingMutation: () => [generateMock, { data: undefined, error: new Error('fail'), isLoading: false }]
}));

function setup() {
  const store = configureStore({ reducer: { wizard: wizardSlice.reducer } });
  // preload basics so step guard allows render
  store.dispatch(wizardSlice.actions.setBasics({ niche: 'ai', productType: 'vid', targetPriceRange: '$' }));
  const ref = React.createRef<PricingHandles>();
  render(
    <Provider store={store}>
      <AIPricingStep ref={ref} />
    </Provider>
  );
  return { ref };
}

test('uses fallback tiers on API error', () => {
  const { ref } = setup();
  expect(screen.getByDisplayValue('Basic')).toBeInTheDocument();
  expect(ref.current?.getData().tiers.length).toBeGreaterThan(0);
});
