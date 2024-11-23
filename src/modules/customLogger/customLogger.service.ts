import { LoggerService, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class LoggingService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  logResponse(statusCode: number, responseBody: any) {
    console.log('------- Response -------');
    console.log(`Response Status: ${statusCode}`);
    console.log(`Response Body: ${JSON.stringify(responseBody)}`);
    console.log('------------------------');
  }

  logRequest(req: Request) {
    console.log('--- Incoming Request ---');
    console.log('URL:', req.url);
    console.log('Method:', req.method);
    console.log('Query Parameters:', req.query);
    console.log('Body:', req.body);
    console.log('------------------------');
  }

  commonLogger(req: Request, statusCode: number, responseBody: any) {
    this.logRequest(req);
    this.logResponse(statusCode, responseBody);
  }

  fatal(message: any, ...optionalParams: any[]) {}

  error(message: any, ...optionalParams: any[]) {}

  warn(message: any, ...optionalParams: any[]) {}

  debug?(message: any, ...optionalParams: any[]) {}

  verbose?(message: any, ...optionalParams: any[]) {}
}
