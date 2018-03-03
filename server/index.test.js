const axios = require('axios'); 

describe('app server searchbar', function() {

  test('it returns the results of a restaurant query', () => {
    const searchParams = {
      $$$: true, 
      vegetarian: true,
      byob: true,
      cuisine: 'Chinese'
    };
    return axios({
      url: 'http://localhost:3004/restaurants', 
      method: 'post',
      data: searchParams
    })
      .then(result => {
        console.log
        expect(result.data.length).toEqual(2);
        expect(result.data[0].length)
      });
  });
});