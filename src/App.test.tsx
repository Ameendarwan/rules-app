import { describe, it } from 'vitest';
import App from './App';
import { render } from '../tests/utils';

describe('App', () => {
  it('example test: renders without crashing', () => {
    render(<App />);
  });
});
