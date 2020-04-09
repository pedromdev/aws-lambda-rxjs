import {mergeMap} from "rxjs/operators";

interface Request<T> {
  promise(): Promise<T>
}

export const mapRequest = <T = any>(project: (value) => Request<T>) =>
  mergeMap<unknown, Promise<T>>(v => project(v).promise())
