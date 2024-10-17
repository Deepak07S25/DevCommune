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