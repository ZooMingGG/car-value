import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Report } from 'src/reports/report.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from 'src/users/user.entity';
import { ReportDto } from 'src/reports/dtos/report.dto';
import { GetEstimateDto } from 'src/reports/dtos/get-estimate.dto';
import { Observable } from 'rxjs';
import { ApproveReportDto } from '../../reports/dtos/approve-report.dto';
import { AdminGuard } from '../../guards/admin.guard';
import { CreateReportDto } from '../../reports/dtos/create-report.dto';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  public constructor(private readonly reportsService: ReportsService) {}

  @Get()
  public getEstimate(@Query() query: GetEstimateDto): Observable<string> {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  public createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: User,
  ): Observable<Report> {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  public approveReport(
    @Param('id') id: string,
    @Body() body: ApproveReportDto,
  ): Observable<Report> {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
