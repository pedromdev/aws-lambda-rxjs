import {SQSEvent, SQSRecord} from "aws-lambda";
import {from, Observable} from "rxjs";
import {eventResponse} from "../operators";

export const useSQSEvent = (project: (observable: Observable<SQSRecord>) => Observable<any>) =>
  (event: SQSEvent): Promise<any> =>
    project(from<SQSRecord[]>(event.Records))
      .pipe(eventResponse())
      .toPromise();
