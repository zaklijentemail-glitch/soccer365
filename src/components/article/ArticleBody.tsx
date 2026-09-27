import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/content/mdx-options";
import TweetEmbed from "@/components/article/TweetEmbed";
import Formation from "@/components/article/Formation";

const mdxComponents = { TweetEmbed, Formation };

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="prose-content max-w-none text-[1.0625rem] leading-relaxed text-ink-soft [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_p]:mt-4 [&_a]:font-semibold [&_a]:text-brand [&_a:hover]:text-brand-dark [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:mt-4 [&_img]:rounded-card [&_table]:mt-4 [&_table]:w-full [&_th]:border-b [&_th]:border-line [&_th]:pb-2 [&_th]:text-left [&_td]:border-b [&_td]:border-line [&_td]:py-2">
      <MDXRemote source={content} options={mdxOptions} components={mdxComponents} />
    </div>
  );
}
