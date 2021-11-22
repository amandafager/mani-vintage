import { sanityClientUpdate } from "../../lib/sanity.server";
require("dotenv").config();

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      let id = req.body;

      sanityClientUpdate
        .patch(id)
        .set({ available: false })
        .commit()
        .then((res) => {
          console.log("Hurray, the product is updated! New document:");
          console.log(res);
        })
        .catch((err) => {
          console.error("Oh no, the update failed: ", err.message);
        });

      res.status(200).json({ notAvalible: true });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}

/*    const mutations = [
      {
        patch: {
          id: product.id,
          set: {
            available: false,
          },
        },
      },
    ];

  
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const datasetName = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

    fetch(
      `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenWithWriteAccess}`,
        },
        body: JSON.stringify({ mutations }),
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error)); */
