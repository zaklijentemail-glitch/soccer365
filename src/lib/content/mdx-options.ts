import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { MDXRemote } from "next-mdx-remote/rsc";

type MDXRemoteOptions = NonNullable<Parameters<typeof MDXRemote>[0]["options"]>;

export const mdxOptions: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};
