import { Injectable } from '@nestjs/common';
import { dispenserSocketWithStatusDO } from './do/dispensers.do';

@Injectable()
export class DispensersService {
  private dispenserSocketMap: Map<string, dispenserSocketWithStatusDO> =
    new Map<string, dispenserSocketWithStatusDO>([
      ['abcd', { webSocket: null, isStart: false }],
    ]);

  verify(dispenserToken: string): boolean {
    const result = this.dispenserSocketMap.get(dispenserToken);
    if (result === undefined) {
      return false;
    }
    return true;
  }
}
