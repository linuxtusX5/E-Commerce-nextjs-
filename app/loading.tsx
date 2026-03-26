import Image from "next/image";
import LoadingGif from "@/public/loading.gif";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <Image
        src={LoadingGif}
        alt="Loading..."
        width={80}
        height={80}
        unoptimized
      />
    </div>
  );
}
