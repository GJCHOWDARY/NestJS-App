import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from './links.model';

@Module({
    imports: [ 
    MongooseModule.forFeature([{ name: 'Links', schema: LinkSchema }]),
  ],
  controllers: [LinksController],
  providers: [
    LinksService,
]
})
export class LinksModule {}
