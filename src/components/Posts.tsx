"use client";

import { startTransition, useActionState, useState } from "react";

import type { PostE } from "../services/schema";
import { likePost } from "../actions/like-post";
import { HashSet } from "effect";

export default function Posts({ posts }: { posts: readonly PostE[] }) {
  const [checkedPosts, setCheckedPosts] = useState(HashSet.empty<number>());

  return (
    <div>
      {posts.map((post) => (
        <SinglePost
          key={post.id}
          post={post}
          checked={HashSet.has(checkedPosts, post.id)}
          onChecked={() => setCheckedPosts(HashSet.toggle(checkedPosts, post.id))}
        />
      ))}
    </div>
  );
}

const SinglePost = ({ post, checked, onChecked }: { post: PostE; checked: boolean; onChecked: () => void }) => {
  const [error, setLiked, pending] = useActionState(
    async () => {
      try {
        await likePost(post.id);
        return null; // 👈 No error, reset to `null`
      } catch (error) {
        // 👇 Convert error to string
        return error instanceof Error ? error.message : "Unknown error";
      }
    },
    null, // 👈 Initial value `null` (no error)
  );

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button type="button" disabled={pending} className="bg-blue-950 p-4 text-white disabled:opacity-50" onClick={setLiked}>
        Like
      </button>
      {/* 👇 Display error if any */}
      {error && <p className="text-red-500">{error}</p>}
      <input type="checkbox" checked={checked} onChange={onChecked} />
    </div>
  );
};
