"use client";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }: any) => {
  const { data: session } = useSession();
  const [isHide, setIsHide] = useState(true);

  setTimeout(() => setIsHide(false), 400);

  const userName =
    data[0]?.creator._id === (session?.user! as any)?.id
      ? "My"
      : data[0]?.creator.username + `'s`;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {!isHide ? `${userName} profile` : null}
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
