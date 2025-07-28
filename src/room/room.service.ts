import { RoomDto } from "./dto/query.dto";
import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createRoomDto: CreateRoomDto) {
    return "This action adds a new room";
  }

  async findAvailable(query: RoomDto) {
    /**
     * find all rooms that are available based on user query
     * @param {RoomDto} query
     */
    try {
      const rooms = await this.prisma.room.findMany({
        where: {
          checkOutDate: {
            lt: new Date(query.checkInDate),
          },
          roomType: {
            capacity: {
              gte: query.capacity,
            },
            basePrice: {
              gte: query.priceMin,
              lte: query.priceMax,
            },
            amenities: {
              hasEvery: query.roomType.amenities,
            },
          },
        },
      });
      return rooms
    } catch (error) {
      console.error(`Error finding available rooms: ${error}`);
    }
  }

  async findAll() {
    /**
     * find all rooms
     */
    try {
      const rooms = await this.prisma.room.findMany({
        where: {
          isOccupied: false,
        },
        include: {
          roomType: true,
        },
      });
      return rooms
    } catch (error) {
      console.error(`Error fetching all rooms`);
    }
  }

  findSpecificRoom(id: number) {
    /**
     * Fetch all info regarding a particular room using it's id
     * @param id - The room id
     */
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
