/* eslint-disable @next/next/no-img-element */
import { BusinessCard } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface BusinessCardProps {
  inputs?: {
    title: string;
    website: string;
  };
  card?: BusinessCard | null | undefined;
}

const BusinessCard = ({ inputs, card }: BusinessCardProps) => {
  const { data: sessionData } = useSession();

  const front = card
    ? "https://bcards.vercel.app/api/og" +
      "?username=" +
      card.name +
      "&title=" +
      card.title +
      "&imgSrc=" +
      card.imgSrc
    : inputs &&
      "https://bcards.vercel.app/api/og" +
        "?username=" +
        sessionData?.user?.name +
        "&title=" +
        inputs.title +
        "&imgSrc=" +
        sessionData?.user?.image;

  return (
    <div className="card">
      <div className="card-back">
        <div className="line-numbers">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>
        <code>
          <span className="variable">const </span>
          <span className="function">aboutMe </span>
          <span className="operator">= </span>
          <span>{"{"}</span>
          <div className="indent">
            {" "}
            <span className="property">name</span>
            <span className="operator">: </span>
            <span className="string">
              {card ? card.name : sessionData?.user?.name}
            </span>
            <span>,</span>
          </div>
          <div className="indent">
            {" "}
            <span className="property">title</span>
            <span className="operator">: </span>
            <span className="string">{card ? card.title : inputs?.title}</span>
            <span>,</span>
          </div>
          <div className="indent">
            {" "}
            <span className="property">contact</span>
            <span className="operator">: </span>
            <span>{"{"}</span>
            <div className="indent">
              {" "}
              <span className="property">email</span>
              <span className="operator">: </span>
              <span className="string">
                {/* send email to this email */}
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    if (card && card.email !== null) {
                      navigator.clipboard.writeText(card.email);
                      alert("Email copied to clipboard");
                    } else if (
                      sessionData &&
                      sessionData?.user?.email != null
                    ) {
                      navigator.clipboard.writeText(sessionData?.user?.email);
                      alert("Email copied to clipboard");
                    }
                  }}
                >
                  {card ? card.email : sessionData?.user?.email}
                </span>
              </span>
              <span>,</span>
            </div>
            <div className="indent">
              <span className="property">website</span>
              <span className="operator">:</span>
              <span className="string">
                <a
                  href={
                    card
                      ? card?.website.includes("https://")
                        ? card.website
                        : "https://" + card.website
                      : inputs?.website.includes("https://")
                      ? inputs?.website
                      : "https://" + inputs?.website
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {card ? card.website : inputs?.website}
                </a>
              </span>
            </div>
            <span>{"}"}</span>
          </div>
          <span>{"}"}</span>
        </code>
      </div>
      <div className="card-front text-white">
        {/* <Image
          src="/cow.png"
          alt="Picture of the author"
          width={128}
          height={128}
        /> */}
        <img alt="" className="h-[15rem] w-[30rem]" src={front} />
      </div>
    </div>
  );
};

export default BusinessCard;
