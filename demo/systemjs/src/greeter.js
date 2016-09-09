"use strict";
var RobotController = (function () {
    function RobotController() {
    }
    RobotController.prototype.greets = function (req, res, next) {
        var name = req.query.name || 'there';
        res.send("<h3> hello " + name + " </h3>");
    };
    return RobotController;
}());
exports.RobotController = RobotController;
//# sourceMappingURL=greeter.js.map