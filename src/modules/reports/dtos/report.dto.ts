import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  public id: number;

  @Expose()
  public approved: boolean;

  @Expose()
  public price: number;

  @Expose()
  public year: number;

  @Expose()
  public lng: number;

  @Expose()
  public lat: number;

  @Expose()
  public make: string;

  @Expose()
  public model: string;

  @Expose()
  public mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  public userId: number;
}
