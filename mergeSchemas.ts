const path = require("path");
const fs = require('fs');
import {mergeTypeDefs} from '@graphql-tools/merge';
import {loadFilesSync} from '@graphql-tools/load-files';
import {print} from 'graphql';

const allTypes = loadFilesSync(path.join(__dirname, "./schemas"), {
  extensions: ['graphql']});
const typeDefs = mergeTypeDefs(allTypes);
const printedTypeDefs = print(typeDefs);
fs.writeFileSync('schema.graphql', printedTypeDefs);