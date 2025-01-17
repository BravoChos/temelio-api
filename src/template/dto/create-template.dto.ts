import { IsString, IsOptional } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  type?: string;
}
