export class RoomDto {
  checkInDate: string;
  checkOutDate: string;
  roomType: RoomTypeDto;
  capacity: number;
  priceMin: number;
  priceMax: number;
}

export class RoomTypeDto {
  name: string;
  capacity: number;
  amenities: string[];
}
