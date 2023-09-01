"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const { data: session }: any = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${[post._id.toString()]}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p: any) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${/*session?.user!.id*/ params.id}/posts`
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to personal profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
