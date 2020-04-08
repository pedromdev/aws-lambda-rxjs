import {filter} from "rxjs/operators";
import {ScheduledEvent} from 'aws-lambda'

export const matchSource = <T extends ScheduledEvent>(name: string) =>
  filter<T>(event => event.source === name);
