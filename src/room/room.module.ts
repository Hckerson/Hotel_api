import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { AuthModule } from "src/auth/auth.module";
import { RoomController } from "./room.controller";
import { Redis } from "src/services/redis/connection";

@Module({
  imports:[AuthModule],
  controllers: [RoomController],
  providers: [RoomService, Redis],
})
export class RoomModule {}
