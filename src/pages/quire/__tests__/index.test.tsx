import { waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GetHashBlockDetails } from '@/api/quire';
import { GetHashBlockDetailsReuslt } from '@/api/__mocks__/quire';
import Quire from '../index';

jest.mock('@/api/quire');

const MockGetHashBlockDetails = GetHashBlockDetails as unknown as jest.Mock<typeof GetHashBlockDetails>;

describe('Quire', () => {
  const props: any = {
    history: {
      location: {
        search: '',
      },
      push: jest.fn(),
    },
  };

  test('空值查询', async () => {
    const Page = render(<Quire {...props} />);
    const subBtn = Page.getByText('查询');
    userEvent.click(subBtn);

    const keys = Object.keys(GetHashBlockDetailsReuslt);
    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(0));

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof typeof GetHashBlockDetailsReuslt;
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => expect(Page.getByTestId(key).innerText).toBe(''));
    }
  });

  test('输入空格查询', async () => {
    const Page = render(<Quire {...props} />);
    const subBtn = Page.getByText('查询');
    const input = Page.getByPlaceholderText('请输入Block Hash');

    userEvent.type(input, '       ');
    userEvent.click(subBtn);

    const keys = Object.keys(GetHashBlockDetailsReuslt);
    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(0));

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof typeof GetHashBlockDetailsReuslt;
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => expect(Page.getByTestId(key).innerText).toBe(''));
    }
  });

  test('输入值查询', async () => {
    const _props: any = {
      history: {
        location: {
          search: '',
        },
        push: jest.fn(),
      },
    };

    const Page = render(<Quire {..._props} />);
    const subBtn = Page.getByText('查询');
    const input = Page.getByPlaceholderText('清输入Block Hash');

    userEvent.type(input, 'abcsasakjklsajkajsklajkslwqwqsa');
    userEvent.click(subBtn);

    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(_props.history.push).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(_props.history.push.mock.calls[0][0]).toBe('/quire?hash=abcsasakjklsajkajsklajkslwqwqsa')
    );

    const keys = Object.keys(GetHashBlockDetailsReuslt);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof typeof GetHashBlockDetailsReuslt;
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => expect(Page.getByTestId(key).innerText).toBe(GetHashBlockDetailsReuslt[key]));
    }
  });

  test('接口错误请客', async () => {
    const Page = render(<Quire {...props} />);
    const subBtn = Page.getByText('查询');
    const input = Page.getByPlaceholderText('清输入Block Hash');

    MockGetHashBlockDetails.mockRejectedValue(new Error('service 500') as unknown as never);

    userEvent.type(input, 'abcsasakjklsajkajsklajkslwqwqsa');
    userEvent.click(subBtn);

    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(1));

    Page.getByText('暂无数据');
  });

  test('刷新页面', async () => {
    const _props: any = {
      history: {
        location: {
          search: '?hash=1234567890',
        },
        push: jest.fn(),
      },
    };

    render(<Quire {..._props} />);
    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(MockGetHashBlockDetails.mock.calls[0][0]).toBe('1234567890'));
  });

  test('快照', async () => {
    const Page = render(<Quire {...props} />);
    await waitFor(() => expect(Page).toMatchSnapshot());
  });
});
