# TodoList API

This REST API was built with Node, and MongoDB for the databases. With this API, you can do authentication first.Then you can add lists and items to database.Items are the things that you want to do and you can add this item to one of the lists.

## Main Features

- The database has 3 tables User,List and Item
- User table has username, email, password and using JWT for authentication
- List table has name, description and createdBy
- Items belongs to List and User tables
- Items and Lists can be seen only by authorized users
- To authorize users, this app uses JWT

## Built with

- JavaScript
- Node
- Express
- Mongoose
- MongoDB
- Jest

## Getting Started

- Clone the repo `git@github.com:Murodjon000/node-api.git`
- cd `into` the project
- Run `git pull origin app`
- To install all dependencies and necessary packages, run `npm installl`, `yarn install`
- Run your mongodb server `sudo service mongod start`
- Run `yarn dev` to run nodejs application in your local server
- To run tests write `yarn test` on the terminal or see package.json file to run them specific folder

## Run locally

- Use one of the API testing apps.Such as Postman or Insomnia
- First run node server with `yarn dev` and do post request to `http://localhost:3000/signup` with

```js
  {
  "username":"any name",
  "email":"any email",
  "password":"any password"
  }

```

- After this request you will get like this response

```js
{
  token: 'some long character...'
}
```

- Then add Authorization to API with `Bearer your-token`
- After making Authorization do this request `http://localhost:3000/api/user`, you wil get user info
- You can create,update and delete any items or lists with making api requests.
- Check `server.js` file to see api routes

## Author

👤 **Murodjon Tursunpulatov**

- Github: [@murodjon000](https://github.com/murodjon000)
- Twitter: [@MurodjonTursun5](https://twitter.com/MurodjonTursun5)
- Linkedin: [@Murodjon Tursunpulatov](https://www.linkedin.com/in/murodjon-tursunpulatov-5189481b3/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

MIT License
