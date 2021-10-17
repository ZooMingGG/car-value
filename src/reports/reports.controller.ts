import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RpcExceptionFilter } from 'src/filters/rpc-exception.filter';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';

@UseFilters(new RpcExceptionFilter())
@Controller()
export class ReportsController {
  public constructor(private readonly reportsService: ReportsService) {}

  @MessagePattern({ cmd: 'createEstimate' })
  public getEstimate(query): Promise<string> {
    return this.reportsService.createEstimate(query);
  }

  @MessagePattern({ cmd: 'createReport' })
  public createReport({ reportDto, user }): Promise<Report> {
    return this.reportsService.create(reportDto, user);
  }

  @MessagePattern({ cmd: 'approveReport' })
  public approveReport({ id, approved }): Promise<Report> {
    return this.reportsService.changeApproval(id, approved);
  }
}
