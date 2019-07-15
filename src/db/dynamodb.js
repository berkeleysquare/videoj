import AWS from 'aws-sdk';

const creds = {
  "accessKeyId": "akid",
  "secretAccessKey": "secret",
  region: "us-west-2",
  endpoint: "http://localhost:8000"
};

AWS.config.update(creds);
const dynamodb = new AWS.DynamoDB();

const params = {
  TableName : "Movies",
  KeySchema: [
    { AttributeName: "year", KeyType: "HASH"},  //Partition key
    { AttributeName: "title", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "year", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

export const createTable = () => {
  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  });
}


var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Movies";

export const Crud = () => {

  var year = 2015;
  var title = "The Big New Movie";

  var params = {
    TableName: table,
    Item: {
      "year": year,
      "title": title,
      "info": {
        "plot": "Awesomeness.",
        "rating": 9
      }
    }
  };


  console.log("Adding a new item...");
  docClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
};

export const cRud = () => {

  console.log("Querying for movies from 1985.");

  var params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
      "#yr": "year"
    },
    ExpressionAttributeValues: {
      ":yyyy": 2015
    }
  };

  docClient.query(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded.");
      data.Items.forEach(function(item) {
        console.log(" -", item.year + ": " + item.title);
      });
    }
  });
}

export const crUd = () => {

  var year = 2015;
  var title = "The Big New Movie";

// Update the item, unconditionally,

  var params = {
    TableName:table,
    Key:{
      "year": year,
      "title": title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
      ":r":5.5,
      ":p":"Everything happens all at once.",
      ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
  };

  console.log("Updating the item...");
  docClient.update(params, function(err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
}

export const cruD = () => {
  var year = 2015;
  var title = "The Big New Movie";

  var params = {
    TableName:table,
    Key:{
      "year": year,
      "title": title
    },
  };

  console.log("Attempting a conditional delete...");
  docClient.delete(params, function(err, data) {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
}