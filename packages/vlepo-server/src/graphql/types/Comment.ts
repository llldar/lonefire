import { interfaceType, objectType } from 'nexus';

import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { Image } from './Image';

export const Commendable = interfaceType({
  name: 'Commendable',
  definition(t) {
    t.connectionField('commentsConnection', {
      type: Comment,
      async resolve(_root, args, ctx) {
        const result = await findManyCursorConnection(
          (args) => ctx.prisma.comment.findMany(args),
          () => ctx.prisma.comment.count(),
          args,
        );
        return result;
      },
    });
  },
});

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.implements('Node');
    t.id('id', {
      resolve: (root) => root.id,
    });
    t.model.owner();
    t.model.content();
    t.model.post();
    t.model.thought();
    t.model.parent();
    t.model.childComments();
    t.model.images();
    t.model.language();
    t.model.editedAt();
    t.model.createdAt();
    t.model.updatedAt();
    t.connectionField('childCommentsConnection', {
      type: Comment,
      async resolve(_root, args, ctx) {
        const result = await findManyCursorConnection(
          (args) => ctx.prisma.comment.findMany(args),
          () => ctx.prisma.comment.count(),
          args,
        );
        return result;
      },
    });
    t.connectionField('imagesConnection', {
      type: Image,
      async resolve(_root, args, ctx) {
        const result = await findManyCursorConnection(
          (args) => ctx.prisma.image.findMany(args),
          () => ctx.prisma.image.count(),
          args,
        );
        return result;
      },
    });
  },
});
