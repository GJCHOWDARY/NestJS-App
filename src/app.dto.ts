import { IsNotEmpty, Matches } from 'class-validator';

export class appDTO {
  @IsNotEmpty()
   message: string;
}