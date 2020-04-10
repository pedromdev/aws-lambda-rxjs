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
const { useSQSEvent } = require('aws-lambda-rxjs');

// Request: { Records: [ { body: "{ source: \"aws.codebuild\" }" } ] }
module.exports.hello = useSQSEvent(stream$ => 
  stream$.pipe(
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
const { useSQSEvent } = require('aws-lambda-rxjs');
const { recordBody, matchSource } = require('aws-lambda-rxjs/operators');

/*
* Request: { Records: [
*   { body: "{ source: \"aws.codebuild\" }" },
*   { body: "{ source: \"aws.codedeploy\" }" },
*   { body: "{ source: \"aws.codebuild\" }" }
* ] }
*/
module.exports.hello = useSQSEvent(stream$ => 
  stream$.pipe(
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
