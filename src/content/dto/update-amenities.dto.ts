import { PartialType } from "@nestjs/mapped-types";
import { CreateAmenities } from "./create-amenities.dto";

export class UpdateAmenities extends PartialType(CreateAmenities) {}
