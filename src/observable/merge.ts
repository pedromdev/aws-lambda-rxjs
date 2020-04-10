import {from, Observable} from "rxjs";
import {mergeAll} from "rxjs/operators";

export const merge = (observables: Array<Observable<any>>): Observable<any> =>
  from(observables).pipe(mergeAll());
