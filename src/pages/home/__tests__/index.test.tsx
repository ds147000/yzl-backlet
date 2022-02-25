import { render, waitFor } from '@testing-library/react';
import Home from '../index';

test('Home', async () => {
  const Page = render(<Home />);
  await waitFor(() => expect(Page).toMatchSnapshot());
});
