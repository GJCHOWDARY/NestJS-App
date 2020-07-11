import { IsNotEmpty } from 'class-validator';

export class LinkDTO {
  @IsNotEmpty()
  url: string;
}