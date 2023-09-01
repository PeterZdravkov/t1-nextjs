"use client";
import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react";
import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Prompts</span>
      </h1>
      <p className=" desc text-center">
        Extremely simple website for creating, editing and deleting small
        prompts to practice app routing, api and next auth, mongoDB
      </p>
      <Feed />
    </section>
  );
}
