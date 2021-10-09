import {
  Controller,
  Post,
  Get,
  Query,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { ReportDto } from './dtos/report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Controller('reports')
export class ReportsController {
  public constructor(private readonly reportsService: ReportsService) {}

  @Get()
  public getEstimate(@Query() query: GetEstimateDto): Promise<string> {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  public createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  public approveReport(
    @Param('id') id: string,
    @Body() body: ApproveReportDto,
  ): Promise<Report> {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
