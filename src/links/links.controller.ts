import {
    Controller,
    Res,
    Redirect,
    Post,
    Body,
    Get,
    UsePipes,
    Query,
    Param,
    Patch,
    Put,
    Delete,
    HttpCode,
    Header,
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
    @Header('Content-type', 'application/json')
    @HttpCode(200)
    async shortenedUrl(
        @Body() data: LinkDTO,
        @User('whitelabelHost') whitelabelHost: string,
        @User('whitelabelHost') whitelabelSecret: string,
        @User('temp_user') temp_user: boolean,
        @User('url') url: string,
    ) {
        const resData = await this.linksService.generateShortenedUrl(
            data,
            whitelabelHost,
            whitelabelSecret,
        );
        return {
            url: data.url,
            urlHash: resData,
            shortUrl: `http://${whitelabelHost}/${resData}`
        };
    }

    @Get('/geturl/:urlHash')
    @Redirect('https://jyotheeswarchowdary.com', 302)
    async urlHash(
        @Param('urlHash') urlHash: string,
    ) {
        const url = await this.linksService.getUrlfromUrlHash(urlHash)
        return { url };
    }

    @Post('/new')
    async addLink(
        @Body('white_label_host') white_label_host: string,
        @Body('white_label_secret') white_label_secret: string,
    ) {
        const id = await this.linksService.addNew(
            white_label_host,
            white_label_secret,
        );
        return { message: "New Host Created!", id , status: true };
    }

    @Get('/getall')
    async getAll() {
        const links = await this.linksService.getAll();
        return links;
    }

    @Get('/getone/:id')
    async getOne(@Param('id') id: string) {
        console.log('test')
        return this.linksService.getOne(id);
    }

    @Put('/update/:id')
    async update(
        @Param('id') id: string,
        @Body('white_label_host') white_label_host: string,
        @Body('white_label_secret') white_label_secret: string,
    ) {
        await this.linksService.updateOne(id, white_label_host, white_label_secret);
        return null;
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard)
    async remove(@Param('id') id: string) {
        await this.linksService.delete(id);
        return null;
    }
}
