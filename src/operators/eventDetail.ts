import {map} from "rxjs/operators";
import {ScheduledEvent} from "aws-lambda";

export const eventDetail = <T extends ScheduledEvent, A = any>() =>
  map<T, A>(event => event.detail);
