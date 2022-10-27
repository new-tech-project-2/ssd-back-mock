import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dispenser } from './dispenser.scheme';

@Injectable()
export class DispenserRepository {
  constructor(
    @InjectModel(Dispenser.name)
    private readonly dispenserModel: Model<Dispenser>,
  ) {}

  async getDispenserStatusByDispenserToken(
    dispenserToken: string,
  ): Promise<boolean> {
    const dispenser = await this.dispenserModel.findOne({
      dispenserToken: dispenserToken,
    });
    return dispenser.started;
  }

  async isValidDispenserToken(dispenserToken: string): Promise<boolean> {
    const dispenser = await this.dispenserModel.findOne({
      dispenserToken: dispenserToken,
    });
    if (dispenser === null) {
      return false;
    }
    return true;
  }
  async startDispenserStatus(dispenserToken: string): Promise<boolean> {
    const dispenser = await this.dispenserModel.findOne({
      dispenserToken: dispenserToken,
    });
    if (dispenser.started) {
      return false;
    }
    await this.dispenserModel.updateOne(
      { dispenserToken: dispenserToken },
      {
        $set: {
          started: true,
          startTimestamp: Date.now(),
        },
      },
    );
    return true;
  }

  async stopDispenserStatus(dispenserToken: string): Promise<boolean> {
    const dispenser = await this.dispenserModel.findOne({
      dispenserToken: dispenserToken,
    });
    if (!dispenser.started) {
      return false;
    }
    await this.dispenserModel.updateOne(
      { dispenserToken: dispenserToken },
      {
        $set: {
          started: false,
        },
      },
    );
    return true;
  }
  async addDispenser(dispenserToken: string, socketId: string): Promise<void> {
    try {
      await this.dispenserModel.create({
        dispenserToken: dispenserToken,
        socketId: socketId,
      });
    } catch {}
    return;
  }

  async deleteDispenser(socketId: string): Promise<void> {
    await this.dispenserModel.deleteOne({
      socketId: socketId,
    });
    return;
  }
}
