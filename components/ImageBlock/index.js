import Image from "next/image";
import styles from "./ImageBlock.module.css";
import React, { useState } from "react";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../sanity";

const ImageBlocks = ({ images }) => {
  let imagesCount = images.length;

  return (
    <div className={`${imagesCount > 1 ? styles.block : styles.oneImageBlock}`}>
      {images &&
        images.map((image, index) => (
          <div
            key={index}
            className={`${
              imagesCount > 1 ? styles.imageWrapper : styles.oneImage
            }`}
          >
            <Image
              className={styles.image}
              src={{ ...useNextSanityImage(sanityClient, image) }}
              layout='fill'
              sizes='50vw'
            />
          </div>
        ))}
    </div>
  );
};

export default ImageBlocks;
