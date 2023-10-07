import { Progress } from "@/components/ui/progress";
import { calculatePercentage, convertSize } from "@/lib/firebase/helpers";
const StorageUsage = ({ totalStorage }: { totalStorage?: number }) => {
  const freePlanLimit = 500 * 1024 * 1024;
  const TotalStoragePercentage = calculatePercentage(
    totalStorage!,
    freePlanLimit,
  );
  const totalStorageAsString = convertSize(totalStorage!);
  return (
    <>
      <div>
        {totalStorageAsString ? (
          <p>
            You have used a total of{" "}
            <span className="font-bold">{totalStorageAsString}</span> from your
            500MB free plan storage.
            <Progress
              value={TotalStoragePercentage}
              className="my-4 lg:w-[350px]"
            />
          </p>
        ) : (
          <p>
            You haven&apos;t used any storage from your 500MB free plan yet.
          </p>
        )}
      </div>
    </>
  );
};

export default StorageUsage;
