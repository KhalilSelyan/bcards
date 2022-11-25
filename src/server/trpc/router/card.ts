import { publicProcedure } from "./../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import slug from "slug";

import { router, protectedProcedure } from "../trpc";

export const cardRouter = router({
  publishCard: protectedProcedure
    .input(
      z.object({
        website: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { website, title } = input;
      const { email, image, name } = ctx.session.user;

      if (!email || !image || !name) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to publish a card",
        });
      }

      const card = await ctx.prisma.businessCard.upsert({
        create: {
          website: website,
          title: title,
          email: email,
          imgSrc: image,
          name: name,
          updatedAt: new Date(),
          slug: slug(name),
        },
        update: {
          website: website,
          title: title,
          email: email,
          imgSrc: image,
          name: name,
          updatedAt: new Date(),
          slug: slug(name),
        },
        where: {
          slug: slug(name),
        },
      });

      return card;
    }),

  getCard: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { slug } = input;

      const card = await ctx.prisma.businessCard.findUnique({
        where: {
          slug: slug,
        },
      });

      return card;
    }),
});
