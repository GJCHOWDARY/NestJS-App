import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Links } from './links.model';

@Injectable()
export class LinksService {
    constructor(
        @InjectModel('Links') private readonly linksModel: Model<Links>,
    ) { }

    async shortenedUrl() {
        return 'links!';
    }

    async addNew(white_label_host: string, white_label_secret: string) {
        const newProduct = new this.linksModel({
            white_label_host: white_label_host,
            white_label_secret: white_label_secret,
            count: 0,
        });
        const result = await newProduct.save();
        return result.id as string;
    }

    async generateShortenedUrl(data: any, white_label_host: string, white_label_secret: string) {
        const result = await this.findHost(white_label_host);
        const shortUrl= await this.shortUrl();
        return result;
    }

    async getAll() {
        const links = await this.linksModel.find().exec();
        return links.map(doc => ({
            id: doc._id,
            white_label_host: doc.white_label_host,
            white_label_secret: doc.white_label_secret,
            count: doc.count,
        }));
    }

    async getOne(id: string) {
        const link = await this.findLink(id);
        return {
            id: link._id,
            white_label_host: link.white_label_host,
            white_label_secret: link.white_label_secret,
            count: link.count,
        };
    }

    async findHost(host: string) {
        return await this.linksModel.find({white_label_host:host});
    }

    async updateOne(
        id: string,
        white_label_host: string,
        white_label_secret: string,
    ) {
        const updated: any = await this.findLink(id);
        updated.white_label_host = white_label_host;
        updated.white_label_secret = white_label_secret;
        updated.count += 1;
        updated.save();
    }

    async delete(id: string) {
        const result = await this.linksModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find!');
        }
    }

    private async findLink(id: string): Promise<Links> {
        let link;
        try {
            link = await this.linksModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find.');
        }
        if (!link) {
            throw new NotFoundException('Could not find.');
        }
        return link;
    }
    
    async shortUrl() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 8; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }
}
