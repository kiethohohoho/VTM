import '@testing-library/jest-dom';

import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

const server = setupServer();
// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});

//  Close server after all tests
afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});
