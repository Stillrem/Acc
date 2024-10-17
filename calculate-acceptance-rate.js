const fs = require('fs');

// Пример данных - замените на вашу логику получения данных
const offers = [
  { accepted: true },
  { accepted: false },
  // ... (добавьте больше данных)
];

// Фильтруем последние 100 предложений
const recentOffers = offers.slice(-100);
const acceptedCount = recentOffers.filter(offer => offer.accepted).length;
const acceptanceRate = (acceptedCount / recentOffers.length) * 100;

// Записываем в файл
fs.writeFileSync('acceptanceRate.json', JSON.stringify(acceptanceRate));
