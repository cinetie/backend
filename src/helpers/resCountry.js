const resCountry = (data, country) => {
  const results = [];
  let ResCountry = country;
  if (!ResCountry) {
    ResCountry = 'nothing';
  }
  data.map((el) => {
    const { resCountries } = el;
    if (resCountries.includes(ResCountry)) {
      console.log(true);
    } else {
      results.push(el);
    }
  });
  if (results) {
    return results;
  }

  return null;
};

export default resCountry;
