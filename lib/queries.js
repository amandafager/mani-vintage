export const getProductCategoriesQuery = `*[_type == "category"] { _id, title, slug }`;

export const getProductsByCategorySlugQuery = `
*[_type == "category" && slug.current == $categoryslug] {
  _id,
  title,
  slug,
  
  "products": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
    title, 
    _id, 
    "productslug": slug.current, 
    price, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution,
    image,

    "categories": categories[] { 
      _type == "reference" => @-> {
        title,
        "slug": slug.current
      }
    },

    "colors": colors[] { 
      _type == "reference" => @-> {
        "color": title
      }
    }
  }
}`;

export const getProductsByCategorySlugQueryNotInUse = `
*[_type == "category" && slug.current == $categoryslug] {
  _id,
  title,
  slug,
  "products": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
    title, 
    _id, "slug": slug.current, 
    price, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution
  }
}`;

export const getCategoriesAndAllRelatedProductsQuery = `
*[_type == "category"] {
  _id,
  title,
  slug,

  "products": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
    title, 
    _id, 
    "slug": slug.current, 
    price, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution
  }
}`;

export const getSingleProductByCategorySlugAndProductSlugQuery = `
*[_type == "category" && slug.current == $categoryslug] {
    _id,
    title,
    slug,

  "products": *[_type == "product" && references(^._id) && slug.current == $slug] | order(_createdAt desc) {
    title, 
    _id, 
    "slug": slug.current, 
    price, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution,
    condition, 
    size, 
    description, 
    "imagesGallery": imagesGallery[] {
      "imageUrl": asset->url,
      "alt": attribution,
      "key": _key,
    },
  }
}`;

export const getSingleProductByCategorySlugAndProductSlugQueryTest = `
*[_type == "category" && slug.current == $categoryslug] {
  _id,
  title,
  slug,
  
  "products": *[_type == "product" && references(^._id) && slug.current == $slug] | order(_createdAt desc) {
    title, 
    _id, 
    "slug": slug.current, 
    price, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution, 
    condition, 
    size, 
    description,

    "imagesGallery": imagesGallery[] {
      "imageUrl": asset->url,
      "alt": attribution,
      "key": _key,
    },

    "categories": categories[] {
      _type == "reference" => @-> {
        title,
        "slug": slug.current
      }
    },
  
    "colors": colors[] {
      _type == "reference" => @-> {
        "color": title
      }
    }
  }
}`;

export const GetAllProductsSlugs = `*[_type == "product"] { "productslug": slug.current }`;

export const GetAllProducts = `
*[_type == "product"] {
    title, 
    _id, 
    "productslug": slug.current, 
    price, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution, 
    condition, 
    size, 
    description,

    "imagesGallery": imagesGallery[] {
      "imageUrl": asset->url,
      "alt": attribution,
      "key": _key,
    },

    "categories": categories[] {
      _type == "reference" => @-> {
        title,
        "slug": slug.current
      }
    },
  
    "colors": colors[] {
      _type == "reference" => @-> {
        "color": title
      }
    }
}`;

export const GetSingleProduct = `
*[_type == "product" && slug.current == $productslug] {
    title, 
    _id, 
    "productslug": slug.current, 
    price, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution, 
    condition, 
    size, 
    description, 

    "imagesGallery": imagesGallery[] {
      asset,
      _type,
      _key,
      "alt": attribution,
    },

    imagesGallery,

    "categories": categories[] {
      _type == "reference" => @-> {
        title,
        "slug": slug.current
      }
    },
  
    "colors": colors[] {
      _type == "reference" => @-> {
        "color": title
      }
    }
}`;

import { groq } from "next-sanity";

export const GetSingleProductImages = groq`
*[_type == "product" && slug.current == $productslug][0] {
    title, 
    _id, 
    "productslug": slug.current, 
    price, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution, 
    condition, 
    size, 
    description, 

    "imagesGallery": imagesGallery[] {
      "url": asset->url,
      "alt": attribution,
      "key": _key,
    },

    "categories": categories[] {
      _type == "reference" => @-> {
        title,
        "slug": slug.current
      }
    },
  
    "colors": colors[] {
      _type == "reference" => @-> {
        "color": title
      }
    }
}`;

export const pageSlug = `*[_type == "page"] {
  "slug": slug.current, 
  title,
}`;

export const pageContent = `*[_type == "page" && slug.current == $slug][0] {
  title,
  pageBuilder[] {
    "images": images[] {
      "url": asset->url,
      "key": _key,
    },
    heading,
    body,
    _type,
     _key,
     body[] | order(order asc) {
       "images": images[] {
         "url": asset->url,
         "key": _key,
        },
        heading,
        body,
        _type,
        _key,
      },
    }
}`;
