/* eslint-disable no-await-in-loop */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { waitFor, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { GetHashBlockDetails } from '@/api/quire';
import { GetHashBlockDetailsReuslt } from '@/api/__mocks__/quire';
import Quire from '../index';

jest.mock('@/api/quire');

const MockGetHashBlockDetails = GetHashBlockDetails as unknown as jest.Mock<typeof GetHashBlockDetails>;

beforeEach(() => {
  MockGetHashBlockDetails.mockClear();
});

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
    const subBtn = Page.getByTestId('submit');
    userEvent.click(subBtn);

    const keys = Object.keys(GetHashBlockDetailsReuslt);
    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(0));

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof typeof GetHashBlockDetailsReuslt;
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => expect(Page.getByTestId(key).innerHTML).toBe(''));
    }
  });

  test('输入空格查询', async () => {
    const Page = render(<Quire {...props} />);
    const subBtn = Page.getByTestId('submit');
    const input = Page.getByPlaceholderText('请输入Block Hash');

    userEvent.type(input, '       ');
    userEvent.click(subBtn);

    const keys = Object.keys(GetHashBlockDetailsReuslt);
    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(0));

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof typeof GetHashBlockDetailsReuslt;
      // eslint-disable-next-line no-await-in-loop
      await waitFor(() => expect(Page.getByTestId(key).innerHTML).toBe(''));
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
    const subBtn = Page.getByTestId('submit');
    const input = Page.getByPlaceholderText('请输入Block Hash');

    userEvent.type(input, 'abcsasakjklsajkajsklajkslwqwqsa');
    userEvent.click(subBtn);

    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(_props.history.push).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(_props.history.push.mock.calls[0][0]).toBe('?hash=abcsasakjklsajkajsklajkslwqwqsa'));

    const keys = Object.keys(GetHashBlockDetailsReuslt);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof typeof GetHashBlockDetailsReuslt;
      const val = GetHashBlockDetailsReuslt[key];
      if (typeof val === 'string' || typeof val === 'number') {
        await waitFor(() => expect(Page.getByTestId(key).innerHTML).toBe(String(val)));
      } else if (val === true) {
        await waitFor(() => expect(Page.getByTestId(key).innerHTML).toBe('Yes'));
      } else if (val === false) {
        await waitFor(() => expect(Page.getByTestId(key).innerHTML).toBe('No'));
      }
    }
  });

  test('接口错误请客', async () => {
    const Page = render(<Quire {...props} />);
    const subBtn = Page.getByTestId('submit');
    const input = Page.getByPlaceholderText('请输入Block Hash');

    MockGetHashBlockDetails.mockRejectedValueOnce({
      response: {
        data: {
          message: 'server error',
        },
      },
    } as unknown as never);

    userEvent.type(input, 'abcsasakjklsajkajsklajkslwqwqsa');
    userEvent.click(subBtn);

    await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(1));

    Page.getByText('暂无数据');
  });

  test('接口错误请客', async () => {
    const Page = render(<Quire {...props} />);
    const subBtn = Page.getByTestId('submit');
    const input = Page.getByPlaceholderText('请输入Block Hash');

    MockGetHashBlockDetails.mockRejectedValueOnce({
      response: {},
    } as unknown as never);

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

  test('重复搜索', async () => {
    const _props: any = {
      history: {
        location: {
          search: '',
        },
        push: jest.fn(),
      },
    };

    const mock = (hash: string) => {
      return new Promise((res) => {
        setTimeout(() => {
          if (hash === '123456789') res(GetHashBlockDetailsReuslt);
        }, 500);
      });
    };

    await act(async () => {
      const Page = render(<Quire {..._props} />);
      const subBtn = Page.getByTestId('submit');
      const input = Page.getByPlaceholderText('请输入Block Hash');

      MockGetHashBlockDetails.mockResolvedValueOnce(mock as unknown as never);
      userEvent.type(input, '6');
      userEvent.click(subBtn);
      await new Promise((res) => setTimeout(res, 400));

      MockGetHashBlockDetails.mockResolvedValueOnce(mock as unknown as never);
      userEvent.type(input, '789');
      userEvent.click(subBtn);

      await new Promise((res) => setTimeout(res, 800));

      await waitFor(() => expect(MockGetHashBlockDetails).toHaveBeenCalledTimes(2));
      await waitFor(() => expect(_props.history.push).toHaveBeenCalledTimes(2));
      await waitFor(() => expect(_props.history.push.mock.calls[0][0]).toBe('?hash=6'));
      await waitFor(() => expect(_props.history.push.mock.calls[1][0]).toBe('?hash=6789'));
    });
  });

  test('快照', async () => {
    const _props: any = {
      history: {
        location: {
          search: '?hash=1234567890',
        },
        push: jest.fn(),
      },
    };

    const Page = render(<Quire {..._props} />);
    await waitFor(() => expect(Page).toMatchSnapshot());
  });
});
