import * as NexusSchema from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import * as path from 'path';

import { relayNodeInterfacePlugin } from '@jcm/nexus-plugin-relay-node-interface';

import * as types from './types';

export default NexusSchema.makeSchema({
  types,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
    NexusSchema.connectionPlugin({ includeNodesField: true }),
    NexusSchema.fieldAuthorizePlugin(),
    // relayNodeInterfacePlugin({
    //   idFetcher: (val, ctx: ExtendedContext, info) => {
    //     return ctx.prisma;
    //   },
    //   resolveType: (object) => object.__typename,
    // }),
  ],
  outputs: {
    schema: path.join(__dirname, '../../../vlepo-client/src/schema/schema.graphql'),
    typegen: path.join(__dirname, '../../node_modules/@types/nexus-typegen/index.d.ts'),
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'ExtendedContext',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('../../node_modules/.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
});
