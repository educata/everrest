import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quote')
@Controller('quote')
export class QuoteController {}
