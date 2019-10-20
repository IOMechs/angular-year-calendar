import { WeekNumberPipe } from './week-number.pipe';

describe('WeekNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new WeekNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
