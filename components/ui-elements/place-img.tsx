import Image from "next/image";
import React, { useEffect, useState } from "react";

type ImgProps = {
  height?: number;
  width?: number;
  img_src: string;
  alt?: string;
};

export default function PlaceImg({
  height = 50,
  width,
  img_src,
  alt,
}: ImgProps) {

  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [img_src]);
  
  return (
    <>
      {show ? (
        <Image
          height={height}
          width={width ?? height}
          src={img_src}
          alt={alt ?? ""}
          priority={false}
          onLoadingComplete={() => setShow(true)}
          onError={() => setShow(false)}
        />
      ) : (
        <Image
          height={height ?? 50}
          width={width ?? height}
          src="/img/bagette-diagonal.png"
          alt=""
        />
      )}
    </>
  );
}
