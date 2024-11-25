import { LoggerService, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: any) {
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

  error(errorDetails: any) {
    console.error('--- Error Occurred ---');
    console.error(`Message: ${errorDetails.message}`);
    console.error(`Status Code: ${errorDetails.statusCode}`);
    console.error(`Timestamp: ${errorDetails.timestamp}`);
    if (errorDetails.stack) {
      console.error(`Stack Trace: ${errorDetails.stack}`);
    }
    if (errorDetails.reason) {
      console.error(`Reason: ${errorDetails.reason}`);
    }
    if (errorDetails.promise) {
      console.error(`Promise: ${errorDetails.promise}`);
    }
    console.error('------------------------');
  }

  warn(message: any) {
    console.log(message);
  }
}
