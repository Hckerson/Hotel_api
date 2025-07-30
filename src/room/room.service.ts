import { RoomDto } from "./dto/query.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BookingDto } from "./dto/booking.dto";

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async filterAvailable(query: RoomDto) {
    /**
     * find all rooms that are available based on user query
     * @param query -Contains user query
     */
    const where: any = {};
    where.isOccupied = false;
    if (query.checkInDate) {
      where.checkOutDate = { lt: new Date(query.checkInDate) };
    }
    const roomType: any = {};
    if (query.capacity) {
      roomType.capacity = { gte: parseInt(query.capacity) };
    }
    if (query.priceMax || query.priceMin) {
      roomType.basePrice = {};
      if (query.priceMin) {
        roomType.basePrice.gte = query.priceMin;
      }
      if (query.priceMax) {
        roomType.basePrice.lte = query.priceMax;
      }
    }
    if (query.name) {
      roomType.name = query.name;
    }

    if (query.amenities) {
      roomType.amenities = {
        hasEvery: query.amenities,
      };
    }
    if (Object.keys(roomType).length > 0) {
      where.roomType = roomType;
    }
    try {
      const rooms = await this.prisma.room.findMany({
        where,
      });
      return rooms;
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
      return rooms;
    } catch (error) {
      console.error(`Error fetching all rooms`);
    }
  }

  async findSpecificRoom(id: number) {
    /**
     * Fetch all info regarding a particular room using it's id
     * @param id - The room id
     * @returns - JSON object containing details of the room
     */
    const room = await this.prisma.room.findUnique({
      where: {
        id: `${id}`,
      },
      include: {
        roomType: true,
      },
    });
    return room;
  }

  async bookRoom(bookingDto: BookingDto) {
    /**
     * Book a room
     * @param bookingDto - contains booking details
     * @returns -Response object containing some details of the room booked
     */
    try {
      // Create the booking
      const booking = await this.prisma.booking.create({
        data: {
          guestId: bookingDto.guestId,
          roomId: bookingDto.roomId,
          status: bookingDto.status,
          checkInDate: bookingDto.checkInDate,
          checkOutDate: bookingDto.checkOutDate,
        },
      });

      // Update room status
      await this.prisma.room.update({
        where: { id: bookingDto.roomId },
        data: { isBooked: true },
      });

      return {
        bookingId: booking.id,
        price: bookingDto.price,
        message: "Room booked successfully",
      };
    } catch (error) {
      console.error(`Error booking room ${bookingDto.roomId}:`, error);
      throw error;
    }
  }

  async bookRooms(bookingDto: BookingDto[]) {
    /**
     * Book a number of room
     * @param bookingDto - contains booking details of each rooms
     * @returns -Response object contains info about each of the room booked
     */
    //price accumulation for the total rooms booked
    let price: number = 0;
    for (const booking of bookingDto) {
      price += booking.price;
    }
    try {
      await this.prisma.booking.createMany({
        data: bookingDto,
      });
      return { price };
    } catch (error) {
      console.error(`Error booking rooms`);
    }
  }

  async cancelBooking(id: string) {
    /**
     * Cancel a booking order
     * @param id -Room id of the booking to be cancelled
     * @return -Response object containing success or failure message
     */
    try {
      const response = await this.prisma.booking.update({
        where: {
          id: id,
        },
        data: {
          status: "CANCELLED",
        },
      });
      if (response.status == "CANCELLED") {
        return { message: "success", status: 200 };
      }
      return { message: "failure", status: 400 };
    } catch (error) {
      console.error(`Error cancelling booking for room id ${id}`);
    }
  }

  async getBookingDetails(id: string) {
    /**
     * Fetch all information regarding the rooms booked
     * @param id -The ID of the room book
     * @response -Response object containing details of the rooom booked
     */
    try {
      const response = await this.prisma.room.findUnique({
        where: {
          id: id,
        },
        include: {
          roomType: true,
        },
      });
      return response;
    } catch (error) {
      console.error(`Error fetching booking details for room id ${id}`);
      throw error;
    }
  }
}
