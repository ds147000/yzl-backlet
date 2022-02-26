// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import { GetHashBlockDetailsReuslt } from '@/api/__mocks__/quire';
import { HashBlockDetailsResponse } from '@/api/quire';
import Item from '../item';

describe('Quire/Item', () => {
  test('boolean值, false', () => {
    const Page = render(<Item label="bits" value={false} />);
    expect(Page.getByTestId('bits').innerHTML).toBe('No');
  });

  test('boolean值, true', () => {
    const Page = render(<Item label="bits" value />);
    expect(Page.getByTestId('bits').innerHTML).toBe('Yes');
  });

  test('多个值数组, true', () => {
    const newGetHashBlockDetailsReuslt = { ...GetHashBlockDetailsReuslt };
    newGetHashBlockDetailsReuslt.hash = '12345678';
    const Page = render(<Item label="bits" value={[GetHashBlockDetailsReuslt, newGetHashBlockDetailsReuslt]} />);
    const A1 = Page.getByText(GetHashBlockDetailsReuslt.hash) as HTMLAnchorElement;
    const A2 = Page.getByText(newGetHashBlockDetailsReuslt.hash) as HTMLAnchorElement;
    expect(A1.href).toBe(`http://localhost/quire?hash=${GetHashBlockDetailsReuslt.hash}`);
    expect(A2.href).toBe(`http://localhost/quire?hash=${newGetHashBlockDetailsReuslt.hash}`);
  });

  test('快照', () => {
    const Page = render(
      <div>
        {Object.keys(GetHashBlockDetailsReuslt).map((key) => (
          <Item
            key={key}
            label={key as keyof HashBlockDetailsResponse}
            value={GetHashBlockDetailsReuslt[key as keyof HashBlockDetailsResponse]}
          />
        ))}
      </div>
    );
    expect(Page).toMatchSnapshot();
  });
});
