import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import simulationReducer, { setSession } from '../simSlice';
import { SimulationRunner } from '../SimulationRunner';

const nextMock = jest.fn();
const endMock = jest.fn();

jest.mock('../simApi', () => ({
  useNextSimStepMutation: () => [
    (args: any) => ({ unwrap: () => nextMock(args) }),
    { isLoading: false, error: null },
  ],
  useEndSimMutation: () => [
    () => ({ unwrap: () => endMock() }),
    {},
  ],
}));

function setup() {
  const store = configureStore({ reducer: { simulation: simulationReducer } });
  store.dispatch(
    setSession({ simId: 'abc', weekPlan: { tasks: [] }, forecast: { months: [] } })
  );
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SimulationRunner simId="abc" />
      </MemoryRouter>
    </Provider>
  );
  return { store };
}

test('advances week on button click', async () => {
  nextMock.mockResolvedValue({
    updatedPlan: { tasks: ['a'] },
    forecast: { months: [] },
    advice: 'ok',
  });
  setup();
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /next week/i }));
  });
  expect(nextMock).toHaveBeenCalled();
});
