db.test.aggregate([
	// stage 1

	{
		// $match: {gender:'Male' ,age:{$lt:30}}
		$match: { gender: 'Male' },
	},
	{
		$addFields: { course: 'level-2' },
	},
	// stage 2
	{
		$project: { name: 1, age: 1, gender: 1, course: 1 },
	},
]);

// Does not modify orginal collection
//  db.test.find({})

db.test.aggregate([
	// stage-1

	{
		$group: {
			_id: '$gender',
			total: { $sum: 1 },
			fullDocs: { $push: '$$ROOT' },
		},
	},
	//stage-1
	{ $project: { 'fullDocs.name': 1, 'fullDocs.email': 1 } },
]);

db.test.aggregate([
	// stage-1

	{
		$group: {
			_id: null,
			total: { $sum: '$salary' },
			maxSalary: { $max: '$salary' },
			minSalary: { $min: '$salary' },
			avgSalary: { $avg: '$salary' },
		},
	},

	//stage-2
	{
		$project: {
			total: 1,
			maxSalary: 1,
			avarageSalary: '$avgSalary',
			minSalary: 1,
			rangeBetweenMaxandMin: { $subtract: ['$maxSalary', '$minSalary'] },
		},
	},
	// {$project: {"fullDocs.name":1,"fullDocs.email":1}}
]);

db.test.aggregate([
	//stage-1
	{
		$unwind: '$friends',
	},
	//stage-2
	{ $group: { _id: '$friends', total: { $sum: 1 } } },
]);

db.test.aggregate([
	// stage-1
	{ $unwind: '$interests' },

	// stage-2

	{
		$group: { _id: '$age', interessPerAge: { $push: '$interests' } },
	},
]);

db.test.aggregate([
	// stage-1
	{
		$bucket: {
			groupBy: '$age',
			boundaries: [20, 40, 60, 80],
			default: '80 er uporer bura gula',
			output: {
				count: { $sum: 1 },
				karakaraAse: { $push: '$name' },
			},
		},
	},

	// stage-2
	{
		$sort: { count: -1 },
	},
	{
		$project: { count: 1 },
	},
]);

db.test.aggregate([
	{
		// pipline-1
		$facet: {
			friendsCount: [
				{ $unwind: '$friends' },
				{ $group: { _id: '$friends', count: { $sum: 1 } } },
				// {$group: { _id: "$friends",total:{$sum:'$count'}}}
			],
			// pipline-2
			educationCount: [
				{ $unwind: '$education' },
				{ $group: { _id: '$education', count: { $sum: 1 } } },
			],

			// pipline-3
			skillsCount: [
				{ $unwind: '$skills' },
				{ $group: { _id: '$skills', count: { $sum: 1 } } },
			],
		},
	},
]);

db.orders.aggregate([
	{
		$lookup: {
			from: 'test',
			localField: 'userId',
			foreignField: '_id',
			as: 'user',
		},
	},
]);
