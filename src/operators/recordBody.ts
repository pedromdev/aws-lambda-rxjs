import {SQSRecord} from "aws-lambda";
import {map} from "rxjs/operators";

export const recordBody = <T extends SQSRecord, A = any>() =>
  map<T, A>(record => JSON.parse(record.body));
