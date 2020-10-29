export default class RecordedSpinsModel {
  uuid: string;
  id: number;
  startTime: string;
  startDelta: number;
  startDeltaUs: number;
  fakeStartDelta: number;
  duration: number;
  result: number;
  outcome: string;

  constructor () {
    this.uuid = '';
    this.id = 0;
    this.startTime = '';
    this.startDelta = 0;
    this.startDeltaUs = 0;
    this.fakeStartDelta = 0;
    this.duration = 0;
    this.result = 0;
    this.outcome = '';
  }
}
