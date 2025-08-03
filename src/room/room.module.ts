import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { Redis } from "src/services/redis/connection";

@Module({
  controllers: [RoomController],
  providers: [RoomService, Redis],
})
export class RoomModule {}
