import Image from "next/image";

export default function SeasonsLogo() {
  return (
    <>
      <div className="flex flex-row items-center leading-none text-white">
        <Image
          src="/seasons-logo.svg"
          alt="Seasons logo without text"
          width={0}
          height={0}
          className="w-12 h-12"
          priority
        />
      </div>
      <Image
        src="/seasons-logo-text.svg"
        alt="Seasons logo text only"
        width={0}
        height={0}
        className="w-40 md:w-64 h-12"
        priority
      />
    </>
  );
}
