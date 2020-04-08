import {Observable} from "rxjs";
import {map, reduce} from "rxjs/operators";

export const eventResponse = () =>
  (source: Observable<any>): Observable<any> =>
    source
      .pipe(
        reduce((res, item) => res.concat(item), []),
        map((body) => ({ statusCode: 200, body }))
      );
