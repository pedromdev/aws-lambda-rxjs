import {useSQSEvent} from "./useSQSEvent";
import {map} from "rxjs/operators";
import {recordBody} from "../operators";

const createRecord = body => ({
  body: JSON.stringify(body),
  messageId: "1",
  attributes: {
    ApproximateFirstReceiveTimestamp: "ApproximateFirstReceiveTimestamp",
    ApproximateReceiveCount: "ApproximateReceiveCount",
    AWSTraceHeader: "AWSTraceHeader",
    SenderId: "SenderId",
    SentTimestamp: "SentTimestamp"
  },
  md5OfBody: "123456abc",
  messageAttributes: {},
  awsRegion: "us-east-1",
  eventSource: "event-source",
  eventSourceARN: "arn:event:source",
  receiptHandle: "receipt-handle"
});

describe('useSQSEvent', () => {

  it('should multiply by ten of each event record', async () => {
    const eventHandler = useSQSEvent(observable => observable
      .pipe(
        recordBody(),
        map(num => num * 10)
      )
    );

    const response = await eventHandler({
      Records: [
        createRecord(2),
        createRecord(3),
      ]
    });

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(2);
    expect(response.body[0]).toEqual(20);
    expect(response.body[1]).toEqual(30);
  });

});
