"use client";
import { useState, useEffect, ReactNode } from "react";

import PromptCard from "@/components/PromptCard";

const PromptCardList = ({ data, handleTagClick, searchText }: any) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(
        (post: any) =>
          post.creator.username
            .concat(post.creator.email, post.prompt, post.tag)
            .toLowerCase()
            .includes(searchText.toLowerCase()) && (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          )
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [retryFetch, setRetryFetch] = useState(false);

  const handleSearchChange: any = (e: Event) => {
    e.preventDefault();
    setSearchText((e.target! as any).value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      console.log('FETCHING PROMPTS')

      if (data.status === 500) {
        setRetryFetch(true);
        console.log("Retrying fetch");
        return;
      }

      setPosts(data);
    };
    fetchPosts();
  }, [retryFetch]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        <button
          type="button"
          className="outline_btn mx-6 bg-red-300"
          onClick={() => {
            setSearchText("");
          }}
        >
          Clear
        </button>
      </form>

      {retryFetch && (
        <div className="flex flex-col gap-4 mt-10 items-center">
          <div>There was an error loading the feed</div>
          <button
            type="button"
            onClick={() => {
              setTimeout(() => setRetryFetch(false), 3000);
            }}
            className="outline-1 outline outline-black text-red-600 rounded-full w-16 text-sm focus:outline-red-600"
          >
            {"Retry"}
          </button>
        </div>
      )}

      <PromptCardList
        data={posts}
        handleTagClick={(tag: string) => {
          setSearchText(tag);
        }}
        searchText={searchText}
      />
    </section>
  );
};

export default Feed;
