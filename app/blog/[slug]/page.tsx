export default async function BlogPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  console.log("params found ", slug);
  return <div>{slug}</div>;
}
