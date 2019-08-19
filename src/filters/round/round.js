
module.exports = () => (input, decimals = 2) => Math.round(input * Math.pow(10, decimals)) / Math.pow(10, decimals);
