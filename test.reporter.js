const blue = '\033[0;34m';
const red = '\033[0;31m';
const green='\033[0;32m';
const nc = '\033[0m';
const padding = 3;

let store = [];

module.exports = async function* customReporter(source) {
  for await (const event of source) {
    switch (event.type) {
      case 'test:dequeue':
        // yield `test ${event.data.name} dequeued`;
        break;
      case 'test:enqueue':
        // yield `test ${event.data.name} enqueued`;
        break;
      case 'test:watch:drained':
        // yield 'test watch queue drained';
        break;
      case 'test:start':
        // yield `test ${event.data.name} started\n`;
        break;
      case 'test:pass': {
        const {name, nesting, details: {type, error}} = event.data;
        if(nesting === 0){
          yield green + ' ' + name + nc + "\n";
        }
        // yield `test ${event.data.name} passed\n`;
        break;
      }
      case 'test:fail': {
        const {name, nesting, details: {type, error}} = event.data;
        store.push({name, error, type});
        if (type === 'suite') {
          // si on est au premier niveau on dépile
          if (nesting === 0) {
            const information = store.find(s => !s.type);
            const error = information.error.cause;
            const storedSuite = store.filter(({type}) => type === 'suite').reverse();
            const msg = storedSuite.map(({name}, index) => `${' '.repeat(index * padding)} * ${name}`).join("\n");
            yield "\n" + msg + "\n" + (' '.repeat((store.length) * padding)) + red + "test: " + information.name + " failed" + nc + "\n";
            yield (' '.repeat((store.length + 1) * padding)) + `expected ${error.operator} ${green}"${error.expected}"${nc}, found ${red}"${error.actual}"` + nc + "\n";
            yield (' '.repeat((store.length + 1) * padding)) + '=> ' + information.error.message;
            yield "\n\n"
            store = [];
          }
        } else {
        }
        break;
      }
      case 'test:plan':
        // yield 'test plan\n';
        break;
      case 'test:diagnostic':
      case 'test:stderr':
      case 'test:stdout':
        yield `${event.data.message}\n`;
        break;
      case 'test:coverage': {
        const {totalLineCount} = event.data.summary.totals;
        yield `total line count: ${totalLineCount}\n`;
        break;
      }
    }
  }
};
