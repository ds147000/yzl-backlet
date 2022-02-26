import { render } from '@testing-library/react';
import { GetHashBlockDetailsReuslt } from '@/api/__mocks__/quire';
import { HashBlockDetailsResponse } from '@/api/quire';
import Item from '../item';

describe('Quire/Item', () => {
  test('boolean值, false', () => {
    const Page = render(<Item label="bits" value={false} />);
    expect(Page.getByTestId('bits').innerText).toBe('Yes');
  });

  test('boolean值, true', () => {
    const Page = render(<Item label="bits" value />);
    expect(Page.getByTestId('bits').innerText).toBe('No');
  });

  test('多个值数组, true', () => {
    const Page = render(<Item label="bits" value={[GetHashBlockDetailsReuslt, GetHashBlockDetailsReuslt]} />);
    expect(Page.getByTestId('bits').innerText).toBe('abc；edf；cbd；');
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
