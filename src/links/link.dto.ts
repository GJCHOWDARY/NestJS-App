import { IsNotEmpty, Matches } from 'class-validator';

export class LinkDTO {
  @IsNotEmpty()
   url: string;
}