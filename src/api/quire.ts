/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import request from '@/libs/api';

export type HashBlockDetailsResponse = {
  'hash'?: string;
  'ver'?: number;
  'prev_block'?: string;
  'mrkl_root'?: string;
  'time'?: number;
  'bits'?: number;
  'nonce'?: number;
  'n_tx'?: number;
  'size'?: number;
  'block_index'?: number;
  'main_chain'?: boolean;
  'height'?: number;
  'received_time'?: number;
  'relayed_by'?: string;
  'tx'?: HashBlockDetailsResponse[];
};

export async function GetHashBlockDetails(data: string) {
  return request.get<HashBlockDetailsResponse>(`https://blockchain.info/rawblock/${data}`);
}
