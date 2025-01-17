import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateNonprofitDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  type?: string;
}
