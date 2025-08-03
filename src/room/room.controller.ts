import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { RoomDto } from "./dto/query.dto";
import { RoomService } from "./room.service";
import { BookingDto } from "./dto/booking.dto";

@Controller("rooms")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll() {
    return await this.roomService.findAll();
  }

  @Get("available")
  async filterAvailable(@Query() query: RoomDto) {
    return await this.roomService.filterAvailable(query);
  }

  @Get(":id/details")
  async findSpecificRoom(@Param("id") id: string) {
    return await this.roomService.findSpecificRoom(+id);
  }

  @Post("bookings/room")
  async bookRooms(@Body() bookingDto: BookingDto){
    return await this.roomService.bookRoom(bookingDto)
  }

  @Post("bookings/rooms")
  async bookings(@Body() bookingDto: BookingDto[]){
    return await this.roomService.bookRooms(bookingDto)
  }

  @Post("bookings/cancel/:id")
  async cancelBooking(@Param("id") id : string){
    return await this.roomService.cancelBooking(id)
  }

  @Post("bookings/:id")
  async getBookingDetail(@Param("id") id: string){
    return await this.roomService.getBookingDetails(id)
  }

}
