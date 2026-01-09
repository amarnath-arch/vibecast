import Providers from "@/app/providers";
import StreamView from "@/components/stream/StreamView";

export default async function CreatorPage({
  params,
}: {
  params: Promise<{
    creatorId: string;
  }>;
}) {
  const creatorId = (await params).creatorId;

  return (
    <Providers>
      <StreamView creatorId={creatorId} />
    </Providers>
  );
}
