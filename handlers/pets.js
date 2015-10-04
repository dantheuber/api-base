'use strict';

/**
 * Operations on /pets
 */
module.exports = {

    /**
     *
     * parameters:
     * produces:
     */
    get: function (req, res) {
      var pets = {
        pets: ['dogs','cats','fish','reptils']
      };
      res.send(200,pets);
    }

};
