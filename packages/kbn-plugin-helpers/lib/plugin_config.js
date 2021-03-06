/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const resolve = require('path').resolve;
const readFileSync = require('fs').readFileSync;
const configFile = require('./config_file');

module.exports = function(root) {
  if (!root) root = process.cwd();

  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json')));
  const config = configFile(root);

  const buildSourcePatterns = [
    'yarn.lock',
    'tsconfig.json',
    'package.json',
    'index.js',
    '{lib,public,server,webpackShims,translations}/**/*',
  ];

  return Object.assign(
    {
      root: root,
      kibanaRoot:
        pkg.name === 'x-pack'
          ? resolve(root, '..')
          : resolve(root, '../../kibana'),
      serverTestPatterns: ['server/**/__tests__/**/*.js'],
      buildSourcePatterns: buildSourcePatterns,
      skipInstallDependencies: false,
      id: pkg.name,
      pkg: pkg,
      version: pkg.version,
    },
    config
  );
};
