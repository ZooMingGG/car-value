import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateReportDto } from 'src/modules/reports/dtos/create-report.dto';
import { Report } from 'src/modules/reports/report.entity';
import { User } from 'src/modules/users/user.entity';
import { GetEstimateDto } from 'src/modules/reports/dtos/get-estimate.dto';
import { MicroServiceMessagePattern } from 'src/modules/reports/enums/message-pattern.enum';
import {
  ChangeApprovalPayload,
  CreateEstimatePayload,
  GetEstimatePayload,
} from './models/reports.models';

@Injectable()
export class ReportsService {
  public constructor(
    @Inject('MAIN_SERVICE') private readonly mainService: ClientProxy,
  ) {}

  public createEstimate(query: GetEstimateDto): Observable<string> {
    const pattern = { cmd: MicroServiceMessagePattern.CREATE_ESTIMATE };

    return this.mainService.send<string, GetEstimatePayload>(pattern, query);
  }

  public create(reportDto: CreateReportDto, user: User): Observable<Report> {
    const pattern = { cmd: MicroServiceMessagePattern.CREATE_REPORT };
    const payload = { reportDto, user };

    return this.mainService.send<Report, CreateEstimatePayload>(
      pattern,
      payload,
    );
  }

  public changeApproval(id: string, approved: boolean): Observable<Report> {
    const pattern = { cmd: MicroServiceMessagePattern.APPROVE_REPORT };
    const payload = { id, approved };

    return this.mainService.send<Report, ChangeApprovalPayload>(
      pattern,
      payload,
    );
  }
}
