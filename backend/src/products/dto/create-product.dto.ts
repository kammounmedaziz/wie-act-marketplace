import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  prix: number;

  @IsString()
  @IsNotEmpty()
  photo: string; // URL absolue ou /uploads/...

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  quantité: number;
}
