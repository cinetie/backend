const resCountry = (data, country) => {
  const results = [];
  data.map((el) => {
    const { resCountries } = el;
    const arrResCountries = resCountries !== null ? resCountries.split(',') : [] 
    if (arrResCountries.includes(country)) {
      console.log(true);
    } else {
      results.push(el);
    }
  });
  if (results) {
    return results;
  }

  return null;
};

export default resCountry;
