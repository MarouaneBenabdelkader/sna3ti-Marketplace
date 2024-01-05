export function calculateAverageRating(rates) {
    let sum = 0;
    if (!rates || rates?.length === 0) return 0;
    rates.forEach((rate) => {
      sum += rate.rate;
    });
    return sum / rates.length;
  }