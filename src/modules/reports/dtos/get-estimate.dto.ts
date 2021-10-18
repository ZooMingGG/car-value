import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  public make: string;

  @IsString()
  public model: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1930)
  @Max(2021)
  public year: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  public mileage: number;

  @Transform(({ value }) => Number(value))
  @IsLongitude()
  public lng: number;

  @Transform(({ value }) => Number(value))
  @IsLatitude()
  public lat: number;
}
