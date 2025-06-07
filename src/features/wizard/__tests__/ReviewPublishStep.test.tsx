import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { wizardSlice } from '../wizardSlice';
import simulationReducer from '../../simulator/simSlice';
import { ReviewPublishStep, type ReviewHandles } from '../ReviewPublishStep';

const navigateMock = jest.fn();
const startMock = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

jest.mock('../../simulator/simApi', () => ({
  useStartSimMutation: () => [ (args: any) => ({ unwrap: () => startMock(args) }) ],
}));

function setup() {
  const store = configureStore({
    reducer: { wizard: wizardSlice.reducer, simulation: simulationReducer },
  });
  store.dispatch(
    wizardSlice.actions.setBasics({ niche: 'ai', productType: 'video', targetPriceRange: '$' }),
  );
  const ref = React.createRef<ReviewHandles>();
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReviewPublishStep ref={ref} />
      </MemoryRouter>
    </Provider>,
  );
  return { store, ref };
}

test('launches simulation and dispatches session', async () => {
  startMock.mockResolvedValue({
    simId: '123',
    weekPlan: { tasks: [] },
    forecast: { months: [] },
  });
  const { store, ref } = setup();
  await act(async () => {
    await ref.current?.launch();
  });
  expect(startMock).toHaveBeenCalled();
  expect(store.getState().simulation.simId).toBe('123');
  expect(navigateMock).toHaveBeenCalledWith('/simulation/123');
});

test('shows error on failure', async () => {
  startMock.mockRejectedValue(new Error('fail'));
  const { ref } = setup();
  await act(async () => {
    await ref.current?.launch();
  });
  expect(screen.getByText(/failed to start simulation/i)).toBeInTheDocument();
});
