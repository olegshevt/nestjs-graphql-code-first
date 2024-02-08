import { Module } from '@nestjs/common';
import { DateScalar } from './scalars/date.scalar/date.scalar';

@Module({
  providers: [DateScalar],
})
export class CommonModule {}
