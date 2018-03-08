module.exports = [
  {
    name: 'restaurants',
    schema: `(
      id varchar(22) NOT NULL,
      name varchar(255) DEFAULT NULL,
      cuisine varchar(20) DEFAULT NULL,
      price varchar(4) DEFAULT NULL,
      vegetarian tinyint(1) DEFAULT NULL,
      byob tinyint(1) DEFAULT NULL,
      neighborhood varchar(255) DEFAULT NULL,
      address varchar(255) DEFAULT NULL,
      city varchar(255) DEFAULT NULL,
      state varchar(255) DEFAULT NULL,
      postal_code varchar(255) DEFAULT NULL,
      latitude float DEFAULT NULL,
      longitude float DEFAULT NULL,
      stars float DEFAULT NULL,
      review_count int(11) DEFAULT NULL,
      is_open tinyint(1) DEFAULT NULL,
      iterator int(11) NOT NULL AUTO_INCREMENT,
      PRIMARY KEY (iterator)
    ) ENGINE=InnoDB AUTO_INCREMENT=268 DEFAULT CHARSET=utf8;`,
    dataFile: './restaurants.json',
    fields: [
      'id',
      'name',
      'cuisine',
      'price',
      'vegetarian',
      'byob',
      'neighborhood',
      'address',
      'city',
      'state',
      'postal_code',
      'latitude',
      'longitude',
      'stars',
      'review_count',
      'is_open',
      'iterator'
    ]
  }
];