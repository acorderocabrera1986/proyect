//File: routes/gateways.js
module.exports = function (app) {
  var Gateway = require("../models/gateway.js");

  //GET - Return all gateways in the DB
  const findAllGateways = function (req, res) {
    Gateway.find(function (err, gateways) {
      if (!err) {
        console.log("GET /gateways");
        res.send(gateways);
      } else {
        console.log("ERROR: " + err);
      }
    });
  };

  //GET - Return a Gateway with specified ID
  const findById = function (req, res) {
    Gateway.findById(req.params.id, function (err, gateway) {
      if (!err) {
        console.log("GET /gateway/" + req.params.id);
        res.send(gateway);
      } else {
        console.log("ERROR: " + err);
        res.status(404).send("Gateway not found");
      }
    });
  };

  //POST - Insert a new Gateway in the DB
  const addGateway = function (req, res) {
    console.log("POST");
    console.log(req.body);
    if (req.body.peripheralDevices.length > 10) {
      res.send("ERROR: The number of peripheral devices must be less than 10");
    } else {
      var gateway = new Gateway({
        serialNumber: req.body.serialNumber,
        humanReadableName: req.body.humanReadableName,
        ipv4Address: req.body.ipv4Address,
        peripheralDevices: req.body.peripheralDevices,
      });
      gateway.save(function (err) {
        if (!err) {
          console.log("Created");
        } else {
          console.log("ERROR: " + err);
        }
      });
      res.send(gateway);
    }
  };

  //PUT - Update a register already exists
  const updateGateway = function (req, res) {
    if (req.body.peripheralDevices.length > 10) {
      res.send("ERROR: The number of peripheral devices must be less than 10");
    } else {
      Gateway.findById(req.params.id, function (err, gateway) {
        gateway.serialNumber = req.body.serialNumber;
        gateway.humanReadableName = req.body.humanReadableName;
        gateway.ipv4Address = req.body.ipv4Address;
        gateway.peripheralDevices = req.body.peripheralDevices;
        gateway.save(function (err) {
          if (!err) {
            console.log("Updated");
          } else {
            console.log("ERROR: " + err);
          }
          res.send(gateway);
        });
      });
    }
  };

  //DELETE - Delete a Gateway with specified ID
  const deleteGateway = function (req, res) {
    Gateway.findById(req.params.id, function (err, gateway) {
      gateway.remove(function (err) {
        if (!err) {
          console.log("Removed");
        } else {
          console.log("ERROR: " + err);
        }
        res.send(gateway._id);
      });
    });
  };

  //PUT - Add a PeripheralDevice
  const addPeripheralDevice = function (req, res) {
    Gateway.findById(req.params.id, function (err, gateway) {
      if (gateway.peripheralDevices.length == 10) {
        res.send("ERROR: Cannot add peripheral device for this gateway");
      } else {
        let flag = false;
        for (let i = 0; i < gateway.peripheralDevices.length; i++) {
          if (
            gateway.peripheralDevices[i].uid === req.body.peripheralDevice.uid
          ) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          gateway.peripheralDevices = gateway.peripheralDevices.concat(
            req.body.peripheralDevice
          );
        }
        gateway.save(function (err) {
          if (!err) {
            console.log("Updated");
          } else {
            console.log("ERROR: " + err);
          }
          res.send(gateway);
        });
      }
    });
  };

  //DELETE - Delete a Gateway with specified ID
  const deletePeripheralDevice = function (req, res) {
    Gateway.findById(req.params.id, function (err, gateway) {
      var filtered = gateway.peripheralDevices.filter(function (el) {
        return el.uid != req.body.peripheralDevice.uid;
      });
      gateway.peripheralDevices = filtered;
      gateway.save(function (err) {
        if (!err) {
          console.log("Updated");
        } else {
          console.log("ERROR: " + err);
        }
        res.send(gateway);
      });
    });
  };

  //Link routes and functions
  app.get("/gateways", findAllGateways);
  app.get("/gateway/:id", findById);
  app.post("/gateway", addGateway);
  app.put("/gateway/:id", updateGateway);
  app.put("/gateway/devices/:id", addPeripheralDevice);
  app.delete("/gateway/devices/:id", deletePeripheralDevice);
  app.delete("/gateway/:id", deleteGateway);
};
