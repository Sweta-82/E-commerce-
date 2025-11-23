esm 
for dynamic port we have to used 
**procress.env.PORT**-- used in server.js

**IN server.js we are using function bcz of scalebility**

## we are also using this bcz it can be both post and get req this same url can we not want to reapet it again and again
like this
app.get("/api/v1/products",getAllProducts)
app.post("/api/v1/products",getAllProducts)
**So we are using this**
app.route("/api/v1/products").get(getAllProducts)-- its advantage we can change multiple route

## express.Router();-- used in productRoute
it is a class used to handle http req

## model folder-- product schema
**schema has basically table of row and columbs**

## error 

Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://" pormises error--------unhandledRejection error used in server.js

uncaughtException used in server.js------error

mongoDB error-- casterror -- then mongodb url s incoorect
<!-- 03:29:38 -->

## validator
validator--npm i validator
the validator package is a polular js lib used for data validation and sanitiztion in node.js

it has multiple method
isEmail();checks if a string is vald email

bcrypt js

## JWT-- json web token
it is used to securely transfer infomation between two parties like from client to server **Used for authentication and authorijation**
package-- npm i jsonwebtoken
authorijation--- npm i cookie-parser---attched to incmoing http req--
req.cookie-- used in middleqware-----userAuth.js

8--7

for reset--- pass
npm i crypto-- used in index.js and usermodel


## for snding mail
npm i nodemailer
we have to used google and add verification -- secaureity
search for my app-password


## 12-- 6:28-- 15:28---

<!-- "name":"Sitare",
    "email":"sitare123@gmail.com",
    "password":123456789 -->

## router
npm i rect-router-dom   


## slider

const images = [
  'https://i.pinimg.com/736x/f0/27/c1/f027c19f65c5f05257a1ed0bb962c6a4.jpg',
  'https://i.pinimg.com/736x/f8/45/45/f845450f907b2aa6aa05357a66664c60.jpg',
  'https://i.pinimg.com/736x/79/a3/ee/79a3ee7a2116d50a16d84eef280a5399.jpg',
  'https://i.pinimg.com/736x/c4/7d/a9/c47da90759cf4cbfe08504655ceb9a66.jpg',
  'https://i.pinimg.com/736x/82/ff/b0/82ffb0d9ab098b8b107c190863493d1a.jpg',
];

## redux ---- to read
npm i @reduxjs/toolkit

## npm i react-redux
used to connect rect and redux
---Redux ek data manager hai jo React app ke andar ka saara data (state) sambhalta hai — ek central box me

## createAsyncThunk
used for async in rudux store

## axios
npm i axios

## explore more
useSelector()---Data get karne ke liye
useDispatch()--useDispatch() — Data change karne ke liye

## npm i react-toastify


## cloundinary
npm i express-fileuplaod cloundinary



## expolre more about application/json and multimideajson

## contry state city libery
npm i country-state-city


## explore more about session storage
like why we are using this instad of local storge or redux

---bcz it will storage session until the website aur interfce is close