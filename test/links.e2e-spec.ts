import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import * as request from 'supertest';

const linkData:any = {
    white_label_host: "test_jyotheeswarchowdary.com",
    white_label_secret: "chowdary",
  };

  let id:string;
  let urlHash:string;
  let url='https://jyotheeswarchowdary.com';
  let white_label_host:string="test_jyotheeswarchowdary.com";

describe('LinkController (e2e)', () => {
    let app: INestApplication;
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    it('ADD NEW WHITE LABEL HOST', () => {
      return request(app.getHttpServer())
        .post('/links/new')
        .set('Accept', 'application/json')
        .send(linkData)
        .expect(({ body }) => {
                      id= body.id
                      expect(body.message).toEqual("New Host Created!");
                      expect(body.status).toEqual(true); 
                    })
        .expect(HttpStatus.CREATED); 
    });

    it('POST WHITE LABEL HOST TO GET URL_HASH & SHOT_URL', () => {
        return request(app.getHttpServer())
          .post('/links')
          .set('Accept', 'application/json')
          .send({ url })
          .expect(({ body }) => { 
            urlHash=body.urlHash
            expect(body.urlHash);
            expect(body.shortUrl); 
          })          
          .expect(200); 
      });

    it('GET ALL URL_HASH', () => {
        return request(app.getHttpServer())
          .get(`/links/geturl/${urlHash}`) 
          .expect(302);
      });

    it('GET ALL HOSTS', () => {
        return request(app.getHttpServer())
          .get('/links/getall') 
          .expect(200);
      });
      
    it('DELETE HOST', () => {
        return request(app.getHttpServer())
          .delete(`/links/delete/${id}`) 
          .expect(200);
      });
  });