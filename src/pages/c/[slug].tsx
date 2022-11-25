import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import BusinessCard from "../../components/BusinessCard/BusinessCard";
import { trpc } from "../../utils/trpc";

const Card = () => {
  const router = useRouter();
  const { slug } = router.query;
  if (typeof slug !== "string") return null;

  const { data: card } = trpc.card.getCard.useQuery({ slug });

  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-emerald-500 to-purple-600">
      <Head>
        <title>
          {card?.name} | {card?.title}
        </title>
      </Head>

      {card ? <BusinessCard card={card} /> : null}
    </div>
  );
};

export default Card;
