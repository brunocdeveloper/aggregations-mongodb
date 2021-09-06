db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "routes",
    },
  },
  { $unwind: "$routes" },
  {
    $match: {
      "routes.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: "$_id",
      totalRotas: "$count",
    },
  },
]);
