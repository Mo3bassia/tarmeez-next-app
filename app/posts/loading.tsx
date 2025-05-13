import { SkeletonPost } from "@/components/common/skeleton-post";

export default function Loading() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold mb-8">Posts</h1>
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    </div>
  );
}
