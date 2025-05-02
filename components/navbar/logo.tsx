import Link from "next/link";

export default function Logo() {
  return (
    <div className="text-xl md:text-2xl lg:text-3xl font-bold font-mono tracking-tight">
      <Link href="/">Tarmeez Next</Link>
    </div>
  );
}
