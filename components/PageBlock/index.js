import styles from "./PageBlock.module.css";
import TextBlock from "@components/TextBlock";
import ImageBlock from "@components/ImageBlock";

const PageBlock = ({ content, id }) => {
  const c = content.body?.map((blockContent, i) => {
    let el = null;
    switch (blockContent._type) {
      case "textBlock":
        el = (
          <TextBlock
            key={blockContent._key}
            heading={blockContent.heading}
            body={blockContent.body}
          />
        );

        break;
      case "imageBlock":
        el = (
          <ImageBlock key={blockContent._key} images={blockContent.images} />
        );

        break;
    }
    return el;
  });

  return (
    <div id={id} className={styles.block}>
      {c}
    </div>
  );
};

export default PageBlock;
