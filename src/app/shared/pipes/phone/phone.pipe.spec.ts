import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  let pipe: PhonePipe;

  beforeEach(() => {
    pipe = new PhonePipe();
  });

  it('should return an empty string when the value is null', () => {
    const result = pipe.transform(null);

    expect(result).toBe('');
  });

  it('should return an empty string when the value is undefined', () => {
    const result = pipe.transform(undefined);

    expect(result).toBe('');
  });

  it('should return the input string when the input string contains characters other than digits and a plus sign', () => {
    const result = pipe.transform('(480) 165');

    expect(result).toBe('(480) 165');
  });

  it('should return a properly formatted phone number when the phone number is 10 characters long', () => {
    const result = pipe.transform('4809217777');

    expect(result).toBe('(480) 921-7777');
  });

  it('should return a properly formatted phone number when the phone number is 11 characters long and starts with a 1', () => {
    const result = pipe.transform('14809217777');

    expect(result).toBe('(480) 921-7777');
  });

  it('should return a properly formatted phone number when the phone number is 11 characters long', () => {
    const result = pipe.transform('94809217777');

    expect(result).toBe('9 (480) 921-7777');
  });

  it('should return a properly formatted phone number when the phone number is 12 characters long and does not start with a 1', () => {
    const result = pipe.transform('987123741852');

    expect(result).toBe('987 (12) 374-1852');
  });

  it('should return the input string when the input string is less than 10 digits long', () => {
    const result = pipe.transform('480921');

    expect(result).toBe('480921');
  });

  it('should return the input string when the input string is more than 12 digits long', () => {
    const result = pipe.transform('4809217894561');

    expect(result).toBe('4809217894561');
  });
});
