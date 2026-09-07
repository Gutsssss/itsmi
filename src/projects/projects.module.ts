import { Module } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { ProjectResolver } from './projects.resolver';

@Module({
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
