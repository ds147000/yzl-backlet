import { fireEvent, render, waitFor } from '@testing-library/react';
import { GetHashBlockDetails } from '@/api/quire';
import { GetHashBlockDetailsReuslt } from '@/api/__mocks__/quire';
import Quire from '../index';

jest.mock('@/api/quire');

const MockGetHashBlockDetails = GetHashBlockDetails as unknown as jest.Mock<typeof GetHashBlockDetails>

describe('Quire', () => {
  test('空值查询', async () => {
    const Page = render(<Quire />);
    const subBtn = Page.getByText('查询');
    fireEvent.click(subBtn);

    const keys = Object.keys(GetHashBlockDetailsReuslt);
    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(1));

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof typeof GetHashBlockDetailsReuslt;
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => expect(Page.getByTestId(key).innerText).toBe(''));
    }
  });

  test('输入值查询', async () => {
    const Page = render(<Quire />);
    const subBtn = Page.getByText('查询');
    const input = Page.getByPlaceholderText('请输入哈希值');

    fireEvent.input(input, {});
  });

  test('快照', async () => {
    const Page = render(<Quire />);
    await waitFor(() => expect(Page).toMatchSnapshot());
  });
});
