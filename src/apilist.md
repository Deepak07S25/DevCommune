##  DevCommune APIs

##  authRouter
-POST/signup
-POST/login
-POST/logout
-POST/

## profileRouter
-GET/profile/view
-PATCH /profile/edit(not edit email and password)
-PAtch/profile/password 
-//forgot password APi



## connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
GET /user/connections
GET /user/requests/received
GET /user/feed - Gets you the profiles of other users on platforms that 


-Status: ignore, interested, accepted, rejected

/feed?page=1&limit=10 => first 10 users (1-10)=> .skip(0) & .limit(10)
/feed?page=2&limit=10 => next 10 users(11-20) => .skip(10) & .limit(10)
/feed?page=3&limit=10 => next 10 users
(21-30) => .skip(20) & .limit(10)

.skip(0) & .limit()
 skip = (page-1)*limit;


/feed?page=2&limit=2  page 2 limit 2 profiles in 1 page