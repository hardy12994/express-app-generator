
[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

### Generate NodeJs Express App

#### Installation -

``
    npm install express-app-generator --save
``

To make node app with express framework, many things are needed i.e -
- Environment where the server is made.
- Generic Responses are set, in which form their is need.
- Routing Generic need to set.
- Logging where ther is a need.

Now what this Module Provide to us -
- An Enviroment where server is Run on Any Perticular Port.
- A Generic Router with unlimited middleware can be set.
- Give Generic Response as Data ,Items etc.
- Obvisously a Logger which helps to Log things.

The generated app Provide us some default express Features like -
- `bodyParser.json();`
- `bodyParser.urlencoded({extended: true});`
- `bodyParser({ limit: '50mb', keepExtensions: true })`
- `'view engine', 'ejs'`
- express static path `public` folder in root of app folder
- if port is null it use default port `3000`


## Generate Express App
 ```sh
let appGenrator=require('express-app-generator');
appGenrator.generate(3789, 'src/api', function(err,app){
    if(err){
       return console.log(err);
    }
    // your express app is Ready to use
    //you can check this on http://localhost:3789
    console.log(app)
});
```

If you want to change express properties , 
you can change it by update `app.use()` or `app.set()`;

## Routing
- Clean and Easy To Use.
- **Required Things** 
    
    > Provide the API path (where all the API's are kept) from the root of APP.
      This will be string like `'src/api' and 
      in this `api` folder all the .js files will be like 
      `users.js` not `user.js` , `employees.js` not `employee.js` 
      which means `s` or `es` sufix is must.
    
    > The `logs` folder is required ,this folder is use for 
      logging the logs in json files ,which we get as in console


- This Router Provides Simple CRUD Mechanism . In which Combinations of Arrays and Objects are use To Build it.
- `appRouter` method  which is present in app generator helps to make Routing in Flexible way.

*Lets get started for Routing* -
**REST or CRUD**
```sh
    let api= app.appRouter; 
    //app is Express genrated app (above define how to get it)
    api.model('users')
        .register('REST', [ authentication ]);
```
This will make URL as http://localhost:3789/api/users .

We can use `REST` or `CRUD` Keyword to get `create,update,delete,get,search` these 
methods ready to use but for this,
You must have all these methods present in `/api/users.js` file .

The array which is present just after the `REST` is use for middlewares. 
Suppose I want to make authentication every time so the function of 
authentication will be pass in the middleware Array.

Things `REST` Or `CRUD` Gives -

- If the Request is for **`POST`** then it go for `expots.create=(req,res)=>{};`

- If the Request is for **`GET`** then it go for `expots.get=(req,res)=>{};`
http://localhost:3789/api/users/:id

- If the Request is for **`GET`** then it go for `expots.search=(req,res)=>{};`

http://localhost:3789/api/users
Here many query params `?` can use.

- If the Request is for **`PUT`** then it go for `expots.update=(req,res)=>{};`

- If the Request is for **`DELETE`** then it go for `expots.delete=(req,res)=>{};`


**Note** - All the the Middleware fuctions must have parameters `req,res,next` where 
req,res are request response express generated objects and next is the 
callback function which will call when one middleware work is DONE and
it will go to next middleware function (if present) in that array and perform same,
then go the main function in the `users.js`. 

**User Define Requests** -

- In register `action` and `method` is Requied
- fiter for One Middleware and filters for Multiple 
- For Single Request -
```sh
    api.model('users')
        .register({
            action: 'GET',
            method: 'get', // method must present inside users.js
            url: '/:id',
            filters: [authentication] //middlewares 
        });
        
        // URL will be -
        // http://localhost:3789/api/users/:id
```


- For Multiple Requests -

```sh 
 api.model('users')
        .register([{
            action: 'POST',
            method: 'create'
        },{
            action: 'POST',
            method: 'createWithProfile',
            url: '/withProfile',
            filter: authentication
        }, {
            action: 'POST',
            method: 'importer',
            url: '/importer',
            filter: authentication
        }, {
            action: 'POST',
            method: 'createWhenSignIn',
            filter: authentication
        }, {
            action: 'PUT',
            method: 'update',
            url: '/:id',
            filters: [authentication, groupCode]
        }, {
            action: 'GET',
            method: 'get',
            url: '/:id',
            filters: [authentication, groupCode]
        }, {
            action: 'GET',
            method: 'search',
            filters: [authentication, groupCode]
        }, {
            action: 'GET',
            method: 'searchInGroup',
            url: '/from/group',
            filters: [authentication, groupCode]
        }, {
            action: 'GET',
            method: 'getLeader',
            url: '/get/leader/:id',
            filters: [authentication, groupCode]
        }]);
```

**Note**: `api` keyword in URL is Constant all over the Router.
So your base url will be http://localhost:3789/api/ .

## Responses

Their are Four Types of Responses
All the Responses is of `status Code is 200` . 
- data
    - It can take one or two params `data,message`,
     `data` is mandatory. 
    - It is use as -

    ```sh
    res.data({
        name:"Leo",
        age:21
    });
    
     //res which you get from any query
    ```

    - This will give Response -
    ```sh
    {
        "isSuccess":true,
        "data":{
            "name":"Leo",
            "age":21
            }
    }
    ```
- page
    - It can take one or two params `items, pageSize, pageNo, totalRecordsCount`
     `items` is mandatory.
    - Can also use for Paginations.
    - It is use as -

    ```sh
    res.page([{
        name:"Leo",
        age:21
    },{
        name:"Hardy",
        age:22
    }]);
    
     //res which you get from any query
    ```
    
    - This will give Response -
    ```sh
    {
        "isSuccess":true,
        "items":[{
             "name":"Leo",
             "age":21
         },{
            "name":"Hardy",
            "age":22
         }],
         pageSize:2
    }
    ```
- success
    - It can takes one params `message`, it is mandatory.
    - Can Use for Sending Successful Signature message.
    - It is use as -

    ```sh
    res.success(`user successfully deleted`);
    ```
    
    - This will give Response -
    ```sh
    {
        "isSuccess":true,
        "message":"user successfully deleted"
    }
    ```
- failure
    - It can takes two params `error, message`,
     `error` it is mandatory.
    - Can Use for Sending Error Signature message.
    - It is use as -

    ```sh
    res.failure(`user Hardy already present`);
    ```
    
    - This will give Response -
    ```sh
    {
        "isSuccess":false,
        "message":"user Hardy already present"
    }
    ```
