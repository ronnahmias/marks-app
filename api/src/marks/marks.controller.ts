import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MarksService } from './marks.service';
import { FilterMarksDto } from './dto/filter.marks.dto';
import { IStudentMarksTableResponse } from './types/marks.table.interface';
import { skipDefault, takeDefault } from 'src/common/constants/constants';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { UserParam } from 'src/common/decorators/user.param.decorator';
import { IJwtUser } from 'src/auth/types/auth.jwt.interface';

@Controller('marks')
export class MarksController {
  constructor(private marksService: MarksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMarks(
    @UserParam() user: IJwtUser,
    @Query() filterMarksDto: FilterMarksDto,
  ): Promise<IStudentMarksTableResponse> {
    if (!filterMarksDto.skip) {
      filterMarksDto.skip = skipDefault;
    }
    if (!filterMarksDto.take) {
      filterMarksDto.take = takeDefault;
    }

    return await this.marksService.getMarks(filterMarksDto, user);
  }
}
