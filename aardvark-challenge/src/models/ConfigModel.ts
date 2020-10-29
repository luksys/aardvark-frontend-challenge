export default class ConfigModel {
  name: string;
  slots: number;
  results: Array<string>;
  colors: Array<string>;
  positionToId: Array<number>;

  constructor () {
    this.name = ''
    this.slots = 0
    this.results = []
    this.colors = []
    this.positionToId = []
  }
}
