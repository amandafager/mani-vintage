import styles from "./TextBlock.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { sanityClient } from "@lib/sanity.server";

const TextBlock = ({ heading, body }) => {
  const nonEmptyBlocks = body?.filter((block) => {
    return (
      block.children.length > 1 ||
      (block.children[0]._type === "span" &&
        block.children[0].text.trim() !== "")
    );
  });

  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>{heading}</h2>
      {/* <p className={styles.body}>{body}</p> */}

      {body && (
        <BlockContent
          className={styles.body}
          blocks={nonEmptyBlocks}
          {...sanityClient.config()}
        />
      )}
    </div>
  );
};

export default TextBlock;
