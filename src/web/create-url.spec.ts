import { createURL } from './create-url';

describe('web: create-url', () => {
  it('should return an URL href string', () => {
    const baseURL = 'https://jergauth.fr/';
    const parameters = {
      is: 'fullstack_dev',
      country: 'france',
    };
    const result = createURL(baseURL, parameters);
    const expected = `${baseURL}?is=${parameters.is}&country=${parameters.country}`;

    expect(result).toBe(expected);
  });

  it('should return the baseURL only if no params are given', () => {
    const baseURL = 'https://jergauth.fr/';
    const parameters = {};
    const result = createURL(baseURL, parameters);
    const expected = baseURL;

    expect(result).toBe(expected);
  });
});
