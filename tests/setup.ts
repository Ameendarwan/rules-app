// Add support for the Fetch API
import 'whatwg-fetch';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Silence the "Could not parse CSS stylesheet" error message which is a known issue when using
// the container query syntax
const originalConsoleError = console.error;

console.error = (message, ...optionalParams) => {
  if (message.includes('Could not parse CSS stylesheet')) {
    return;
  }
  originalConsoleError(message, ...optionalParams);
};

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
