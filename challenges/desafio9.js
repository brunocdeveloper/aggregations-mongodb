db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $exists: true } },
        { birthYear: { $gt: 0 } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },

    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
