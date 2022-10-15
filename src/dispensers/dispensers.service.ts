import { Injectable } from '@nestjs/common';

@Injectable()
export class DispensersService {
  verify(dispenserToken: string): boolean {
    const result = this.dispenserSocketMap.get(dispenserToken);
    if (result === undefined) {
      return false;
    }
    return true;
  }
}
