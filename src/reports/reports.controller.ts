import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RpcExceptionFilter } from 'src/filters/rpc-exception.filter';
import { ReportsService } from './reports.service';
import { MicroServiceMessagePattern } from './enums/message-pattern.enum';
import { Report } from './report.entity';

@UseFilters(new RpcExceptionFilter())
@Controller()
export class ReportsController {
  public constructor(private readonly reportsService: ReportsService) {}

  @MessagePattern({ cmd: MicroServiceMessagePattern.CREATE_ESTIMATE })
  public getEstimate(query): Promise<string> {
    return this.reportsService.createEstimate(query);
  }

  @MessagePattern({ cmd: MicroServiceMessagePattern.CREATE_REPORT })
  public createReport({ reportDto, user }): Promise<Report> {
    return this.reportsService.create(reportDto, user);
  }

  @MessagePattern({ cmd: MicroServiceMessagePattern.APPROVE_REPORT })
  public approveReport({ id, approved }): Promise<Report> {
    return this.reportsService.changeApproval(id, approved);
  }
}
