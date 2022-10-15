import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private userSocketMap: Map<string, Map<string, WebSocket | null>> = new Map<
    string,
    Map<string, WebSocket>
  >([['abcd', new Map<string, WebSocket>()]]);
}
