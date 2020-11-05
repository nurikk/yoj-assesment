import { singleton } from "tsyringe";

@singleton()
export default class Scheduler {
  private defaultTick = 5 * 1000;

  public scheduleDefault(fn: () => void): NodeJS.Timeout {
    return this.schedule(fn, this.defaultTick);
  }

  public schedule(fn: () => void, interval: number): NodeJS.Timeout {
    return setInterval(fn, interval);
  }
}