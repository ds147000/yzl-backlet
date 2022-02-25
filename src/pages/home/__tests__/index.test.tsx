import { fireEvent, render, waitFor } from '@testing-library/react';
import Home from '../index';

describe('Home', () => {
  test('点击查询', async () => {
    const props: any = {
      history: {
        push: jest.fn(),
      },
    };
    const Page = render(<Home {...props} />);
    const btn = Page.getByText('立即查询');
    fireEvent.click(btn);
    await waitFor(() => expect(props.history.push).toHaveBeenCalledTimes(1));
  });

  test('快照', async () => {
    const props: any = {};
    const Page = render(<Home {...props} />);
    await waitFor(() => expect(Page).toMatchSnapshot());
  });
});
