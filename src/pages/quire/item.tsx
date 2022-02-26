import React from 'react';
import { HashBlockDetailsResponse } from '@/api/quire';
import { LabelMap } from './config';

type ItemValue = string | number | boolean | HashBlockDetailsResponse[];

interface ItemProps {
  label: keyof HashBlockDetailsResponse;
  value?: ItemValue;
}

const Item: React.FC<ItemProps> = ({ label, value }) => {
  return (
    <div className="item flex">
      <div className="label">{LabelMap[label]}</div>
      <div className="flex1 value" data-testid={label}>
        {valueToString(value)}
      </div>
    </div>
  );
};

function valueToString(value?: ItemValue): React.ReactNode {
  if (!value) return '';

  switch (typeof value) {
    case 'boolean':
      return value ? 'Yes' : 'No';

    case 'number':
      return String(value);

    case 'string':
      return value;

    default:
      return value.map((item) => (
        <p key={item.hash}>
          <a href={`/quire?hash=${item.hash}`} target={item.hash}>
            {item.hash}
          </a>
          ;
        </p>
      ));
  }
}

export default Item;
