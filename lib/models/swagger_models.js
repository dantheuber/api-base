'use strict';

module.exports = {
  "Category":{
    "id":"Category",
    "properties":{
      "id":{
        "type":"string"
      },
      "name":{
        "type":"string"
      }
    }
  },
  "Count":{
    "id":"Count",
    "properties": {
      "count":{
        "type":"integer"
      }
    }
  },
  "User":{
    "id":"User",
    "properties":{
      "id":{
        "type":"string",
        "description": "UUID"
      },
      "name":{
        "type":"string",
        "description": "Name of User"
      },
      "created":{
        "type":"integer",
        "description":"Unix Time Created"
      }
    }
  },
  "newUser":{
    "id":"newUser",
    "required": ["name"],
    "properties":{
      "name":{
        "type":"string",
      }
    }
  },
  "Tag":{
    "id":"Tag",
    "properties":{
      "id":{
        "type":"long"
      },
      "name":{
        "type":"string"
      }
    }
  }
};
