import {
    Controller,
    Post,
    Body,
    Get,
    UsePipes,
    Query,
    Param,
    Patch,
    Put,
    Delete,
    UseGuards
} from '@nestjs/common';
import { User } from './link.decorator';
import { LinksService } from './links.service';
import { AuthGuard } from '../middleware/auth.guard';
import { LinkDTO } from './link.dto';

@Controller('links')
export class LinksController {
    constructor(
        private readonly linksService: LinksService
    ) { }

    @Post('')
    async shortenedUrl(
        @Body() data: LinkDTO,
        @User('whitelabelHost') whitelabelHost: string,
        @User('whitelabelHost') whitelabelSecret: string,
    ) {
        const resData = await this.linksService.generateShortenedUrl(
            data,
            whitelabelHost,
            whitelabelSecret,
        );
        return resData;
    }

    @Post('new')
    async addLink(
        @Body('white_label_host') white_label_host: string,
        @Body('white_label_secret') white_label_secret: string,
    ) {
        const generatedId = await this.linksService.addNew(
            white_label_host,
            white_label_secret,
        );
        return { id: generatedId };
    }

    @Get('/')
    async getAll() {
        const products = await this.linksService.getAll();
        return products;
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        console.log('test')
        return this.linksService.getOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body('white_label_host') white_label_host: string,
        @Body('white_label_secret') white_label_secret: string,
    ) {
        await this.linksService.updateOne(id, white_label_host, white_label_secret);
        return null;
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async remove(@Param('id') id: string) {
        await this.linksService.delete(id);
        return null;
    }
}
