import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SocketService } from 'src/socket/socket.service';
import { DispenserRepository } from './dispenser.repository';

@Injectable()
export class DispenserService {
  constructor(
    @Inject(forwardRef(() => SocketService))
    private readonly socketService: SocketService,
    private readonly dispenserRepository: DispenserRepository,
  ) {}

  async getDispenserStatusByDispenserToken(
    dispenserToken: string,
  ): Promise<boolean> {
    return await this.dispenserRepository.getDispenserStatusByDispenserToken(
      dispenserToken,
    );
  }
  async startDispenserStatus(dispenserToken: string): Promise<boolean> {
    const result = await this.dispenserRepository.startDispenserStatus(
      dispenserToken,
    );
    if (!result) return false;
    this.socketService.startDispenserEvent(dispenserToken);
    return true;
  }

  async stopDispenserStatus(dispenserToken: string): Promise<boolean> {
    const result = await this.dispenserRepository.stopDispenserStatus(
      dispenserToken,
    );
    if (!result) return false;
    this.socketService.stopDispenserEvent(dispenserToken);
    return true;
  }

  async isValidDispenserToken(dispenserToken: string): Promise<boolean> {
    return await this.dispenserRepository.isValidDispenserToken(dispenserToken);
  }
}
