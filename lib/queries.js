export const getProductCategoriesQuery = `*[_type == "category"] { _id, title, slug }`;

export const getProductsByCategorySlugQuery = `
*[_type == "category" && slug.current == $categoryslug] {
  _id,
  title,
  slug,
  
  "products": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
    title, 
    _id, 
    "slug": slug.current, 
    price, "imageUrl": image.asset->url, 
    "imageAlt": image.attribution,

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
