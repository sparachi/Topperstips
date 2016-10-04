var bunyan = require('bunyan');

module.exports = function(serviceName) {
  return bunyan.createLogger({
      // Required
      name: serviceName,
      // Optional, see "Levels" section
      //level: logLevel,
      // Optional, see "Streams" section
      //stream: process.stdout,
      // Optional, see "Streams" section
      streams: [
        {
          level: 'info',
          // log INFO and above to stdout
          stream: process.stdout
          //path: 'topperstips-info.log',
          //type: 'rotating-file',
          //period: '1d',   // daily rotation
          //count: 3        // keep 3 back copies
        },
        {
          level: 'error',
          // log ERROR and above to a file
          //path: '/var/tmp/myapp-error.log'
          stream: process.stdout
        }
      ],
      // Optional, see "Serializers" section
      serializers: {
        req: reqSerializer
        //res: resSerializer
      }
  });
}

function reqSerializer(req) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers
    };
}

function resSerializer(res) {
    return {
        method: res.method,
        url: res.url,
        headers: res.headers
    };
}

// https://www.npmjs.com/package/bunyan
