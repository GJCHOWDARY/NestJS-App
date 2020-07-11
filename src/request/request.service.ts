import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './request.model';

@Injectable()
export class RequestService {
    constructor(
        @InjectModel('Requests') private readonly RequestModel: Model<Request>,
    ) { }
 
    async newRequest(user_agent: string, headers: Object,referrer: string, ip:string, method: string, type: string,message: Object) {
        const newProduct = new this.RequestModel({
            user_agent: user_agent,
            referrer: referrer,
            headers: headers,
            ip: ip,
            method: method,
            type: type,
            message: message
        });
        const result = await newProduct.save();
        return result.id as string;
    }

    async getRquests() {
        const links = await this.RequestModel.find().exec();
        return links.map(doc => ({
            id: doc._id,
            user_agent: doc.user_agent,
            headers: doc.headers,
            ip: doc.ip,
            referrer: doc.referrer,
            method: doc.method,
            type: doc.type,
            message: doc.message,
            createdAt: doc.createdAt
        }));
    }
}
