/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const { execSync: exec } = require('child_process');
const rollup = require('rollup');
const { defaultBuild } = require('../rollup.config');

console.customInfo = (args) => {
  console.info(
    '\x1b[44m\x1b[37m',
    '\u2139',
    '\x1b[0m',
    '\x1b[36m',
    args,
    '\x1b[0m',
  );
};

if (!process.argv[2]) {
  console.customInfo(
    'Please use the name of the example folder as an argument for the npm script. e.g. npm run example beer-finder',
  );
  process.exit(1);
}

const exampleFolder = path.resolve(
  path.resolve('./examples/', process.argv[2]),
);

if (!fs.existsSync(exampleFolder)) {
  console.customInfo('Requested example does not exists!');
  process.exit(1);
}

// 1. BUILD LIB BUNDLE
console.customInfo('Building react-lib-template in watch mode.');
const watcher = rollup.watch(
  defaultBuild.map((config) => ({
    ...config,
    watch: {
      include: 'src/**',
    },
  })),
);
watcher.on('event', ({ code }) => {
  if (code === 'START') {
    console.customInfo('Building bundle.');
  } else if (code === 'END') {
    console.customInfo('Bundle built!');
  } else if (code === 'ERROR') {
    console.customInfo('Encountered an error while bundling!');
  }
});

// 2. LINK LIB
console.customInfo('Create link to react-lib-template.');
exec('npm link', { stdio: 'inherit' });
console.customInfo('Installing dependencies for example.');
exec('npm i', {
  cwd: exampleFolder,
  stdio: 'inherit',
});
console.customInfo('Deleting react dependency duplicates.');
exec(
  `
rm -rf ./node_modules/@risingstack/react-lib-template &&
rm -rf ./node_modules/react &&
rm -rf ./node_modules/react-dom
  `,
  {
    cwd: exampleFolder,
    stdio: 'inherit',
  },
);
console.customInfo('Linking react-lib-template.');
exec('npm link @risingstack/react-lib-template', {
  cwd: exampleFolder,
  stdio: 'inherit',
});

// 3. START EXAMPLE
console.customInfo(`Starting ${process.argv[2]} in the background.`);
exec(
  "nohup bash -c 'npm run start' 2>&1 > nohup.out & tail -f nohup.out &",
  {
    cwd: exampleFolder,
    stdio: 'inherit',
  },
);

const gracefullShutdown = () => {
  console.customInfo('Killing nodes.');
  exec('killall node', { stdio: 'inherit' });
  exec('rm nohup.out', {
    cwd: exampleFolder,
    stdio: 'inherit',
  });
  console.customInfo('Unlinking react-lib-template.');
  exec('npm unlink --no-save @risingstack/react-lib-template', {
    cwd: exampleFolder,
    stdio: 'inherit',
  });
  console.customInfo('Stoping bundle builder.');
  watcher.close();
};

process.on('SIGINT', gracefullShutdown);
process.on('SIGTERM', gracefullShutdown);
