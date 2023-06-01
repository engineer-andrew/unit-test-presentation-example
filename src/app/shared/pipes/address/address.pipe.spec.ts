import { AddressPipe } from './address.pipe';
import { Address } from '../../../data';

describe('AddressPipe', () => {
  let address: Address;
  let pipe: AddressPipe;

  beforeEach(() => {
    pipe = new AddressPipe();

    address = {
      city: 'Anaheim',
      id: 999,
      postalCode: '92802',
      state: 'CA',
      street1: '1313 Disneyland Dr'
    } as Address;
  });

  it('should return \'No address available\' when the address is null', () => {
    const result = pipe.transform(null);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the address is undefined', () => {
    const result = pipe.transform(null);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the street number is null', () => {
    address.street1 = null;

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the street number is undefined', () => {
    address.street1 = undefined;

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the street number is an empty string', () => {
    address.street1 = '';

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the city is null', () => {
    address.city = null;

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the city is undefined', () => {
    address.city = undefined;

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the city is an empty string', () => {
    address.city = '';

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the state is null', () => {
    address.state = null;

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the state is undefined', () => {
    address.state = undefined;

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the state is an empty string', () => {
    address.state = '';

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the postal code is null', () => {
    address.postalCode = null;

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the postal code is undefined', () => {
    address.postalCode = undefined;

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return \'No address available\' when the postal code is an empty string', () => {
    address.postalCode = '';

    const result = pipe.transform(address);

    expect(result).toBe('No address available');
  });

  it('should return the properly formatted address when there is no secondary street number', () => {
    const result = pipe.transform(address);

    expect(result).toBe('1313 Disneyland Dr Anaheim, CA 92802')
  });

  it('should return the properly formatted address when there is a secondary street number', () => {
    address.street2 = 'Suite 104';

    const result = pipe.transform(address);

    expect(result).toBe('1313 Disneyland Dr Suite 104 Anaheim, CA 92802')
  });
});
