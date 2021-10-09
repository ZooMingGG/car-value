import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  public make: string;

  @IsString()
  public model: string;

  @IsNumber()
  @Min(1930)
  @Max(2021)
  public year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  public mileage: number;

  @IsLongitude()
  public lng: number;

  @IsLatitude()
  public lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  public price: number;
}
