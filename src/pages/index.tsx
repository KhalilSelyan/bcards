import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import BusinessCard from "../components/BusinessCard/BusinessCard";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    website: "",
  });

  const { mutate } = trpc.card.publishCard.useMutation({
    onSuccess(card) {
      console.log(card);
      router.push(`/c/${card.slug}`);
    },
  });

  const Publish = () => {
    mutate(inputs);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-br from-rose-500 to-purple-600 ">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-6 text-left text-3xl font-semibold text-white">
            Tell us about yourself and we&apos;ll create a business card for
            you!
          </h2>

          <div className="mb-12 grid grid-cols-2 gap-8">
            {/* inputs start */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-200"
              >
                Title
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 pl-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g. CEO"
                  onChange={(e) => {
                    setInputs((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Website"
                className="block text-sm font-medium text-gray-200"
              >
                Website
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 pl-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g. https://example.com"
                  onChange={(e) => {
                    setInputs((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            {/* inputs end */}
          </div>
        </div>

        {sessionData ? <BusinessCard inputs={inputs} /> : null}

        {/* Publish button */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-black/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/20"
            onClick={() => {
              Publish();
            }}
          >
            Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
