let db = {
	users: [
		{
			userId: "d79sdfgq9g9gf939rg9jpjdj",
			email: "example@email.com",
			handle: "handle",
			createdAt: "2021-06-11T16:24:01.202Z",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/frontier-54f11.appspot.com/o/961390097397.png?alt=media",
			bio: "hey there my name is kevin",
			website: "https://kevingerstner.com",
			location: USA,
		},
	],
	screams: [
		{
			userHandle: "user",
			userImage: "image",
			body: "this is the scream body",
			createdAt: "2021-06-10T19:24:36.132Z",
			likeCount: 5,
			commentCount: 2,
		},
	],
	comments: [
		{
			userHandle: "handle",
			screamId: "a019wk9d1kd",
			body: "whoa dude!",
			createdAt: "2021-06-10T19:24:36.132Z",
		},
	],
	notifications: [
		{
			recipient: "user",
			sender: "john",
			read: "true | false",
			screamId: "kdjsfgdksuufhgkdsufky",
			type: "like | comment",
			createdAt: "2019-03-15T10:59:52.798Z",
		},
	],
};

const userDetails = {
	// Redux data
	credentials: {
		userId: "N43KJ5H43KJHREW4J5H3JWMERHB",
		email: "user@email.com",
		handle: "user",
		createdAt: "2019-03-15T10:59:52.798Z",
		imageUrl: "image/dsfsdkfghskdfgs/dgfdhfgdh",
		bio: "Hello, my name is user, nice to meet you",
		website: "https://user.com",
		location: "Lonodn, UK",
	},
	likes: [
		{
			userHandle: "user",
			screamId: "hh7O5oWfWucVzGbHH2pa",
		},
		{
			userHandle: "user",
			screamId: "3IOnFoQexRcofs5OhBXO",
		},
	],
};
