# AWS Lambda RxJS
AWS Lambda done with RxJS.

## Installing

```shell script
$ npm install aws-lambda-rxjs rxjs
```
or
```shell script
$ yarn add aws-lambda-rxjs rxjs
```

## Example

In your handler.js file use an AWS handler:

```javascript
const { map } = require('rxjs/operators');
const { useSQSEvent } = require('aws-lambda-rxjs/handlers');

// Request: { Records: [ { body: "{ source: \"aws.codebuild\" }" } ] }
module.exports.hello = useSQSEvent(event$ => 
  event$.pipe(
    map(() => ({
      message: 'Hello world!'
    }))
  )
);
// Response: { statusCode: 200, body: [ { message: 'Hello world!' } ] }
```

Filter by source:

```javascript
const { map } = require('rxjs/operators');
const { useSQSEvent } = require('aws-lambda-rxjs/handlers');
const { recordBody, matchSource } = require('aws-lambda-rxjs/operators');

/*
* Request: { Records: [
*   { body: "{ source: \"aws.codebuild\" }" },
*   { body: "{ source: \"aws.codedeploy\" }" },
*   { body: "{ source: \"aws.codebuild\" }" }
* ] }
*/
module.exports.hello = useSQSEvent(event$ => 
  event$.pipe(
    recordBody(),
    matchSource('aws.codebuild'),
    map((ev, i) => ({
      message: `Hello ${ev.source} ${i + 1}!`
    }))
  )
);
/* Response: { statusCode: 200, body: [
*   { message: 'Hello aws.codebuild 1!' },
*   { message: 'Hello aws.codebuild 2!' }
* ] }
*/
```

Handle different sources and merge responses:

```javascript
const { map } = require('rxjs/operators');
const { merge } = require('aws-lambda-rxjs');
const { useSQSEvent } = require('aws-lambda-rxjs/handlers');
const { recordBody, matchSource } = require('aws-lambda-rxjs/operators');

/*
* Request: { Records: [
*   { body: "{ source: \"aws.codebuild\" }" },
*   { body: "{ source: \"aws.codedeploy\" }" },
*   { body: "{ source: \"aws.codepipeline\" }" }
* ] }
*/
module.exports.hello = useSQSEvent(event$ => 
  merge([
    event$.pipe(
      recordBody(),
      matchSource('aws.codebuild'),
      map(() => ({ message: `Hello Bob!` }))
    ),
    event$.pipe(
      recordBody(),
      matchSource('aws.codepipeline'),
      map(() => ({ message: `Hello John!` }))
    ),
  ])
);
/* Response: { statusCode: 200, body: [
*   { message: 'Hello Bob!' },
*   { message: 'Hello John!' }
* ] }
*/
```
