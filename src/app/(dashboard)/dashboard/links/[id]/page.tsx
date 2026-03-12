import { LinkDetailClient } from "@/features/dashboard/components/link-detail-client";

type LinkDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LinkDetailPage({ params }: LinkDetailPageProps) {
  const { id } = await params;

  return <LinkDetailClient id={id} />;
}
