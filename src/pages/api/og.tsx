/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "experimental-edge",
};

const og = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get query params from request
  if (!req.url) return res.status(400).send("Bad Request");
  const url = new URL(req.url, "https://bcards.vercel.app/");
  const username = url.searchParams.get("username");
  const title = url.searchParams.get("title");
  const imgSrc = url.searchParams.get("imgSrc");
  if (!imgSrc) return res.status(400).send("Bad Request");
  if (!username) return res.status(400).json({ error: "Username is required" });

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "sans-serif",
        }}
        tw="relative w-[30rem] h-[15rem] flex flex-col p-10"
      >
        <div tw="flex flex-row">
          <img
            src={imgSrc}
            tw="w-24 h-24 rounded-full shadow-2xl mb-4 mr-6"
            style={{
              objectPosition: "center",
              objectFit: "cover",
            }}
            alt="Profile Picture"
          />
          <div tw="flex flex-col ml-4">
            <h1 tw="-mb-2 text-2xl font-bold text-white">{username}</h1>
            <h2 tw="text-lg font-medium text-gray-300">{title}</h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 480,
      height: 240,

      //  no-cache is required for the image to be updated
      //  when the query params change
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
};

export default og;
