export const getAllCategories = `*[_type == "category"] { _id, title, slug }`;

export const getProductsByCategorySlugQuery = `
*[_type == "category" && slug.current == $categoryslug] {
  _id,
  title,
  slug,
  
  "products": *[_type == "product" && available == true && references(^._id)] | order(_createdAt desc) {
    name, 
    _id, 
    "productslug": slug.current, 
    "price": price * 100, 
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
    name, 
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
    name, 
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
    name, 
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
    name, 
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
    name, 
    _id, 
    "productslug": slug.current, 
    "price": price * 100,
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

/* export const GetSingleProduct = `
*[_type == "product" && slug.current == $productslug] {
    title, 
    _id, 
    "productslug": slug.current, 
    "price": price * 100,
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
 */
import { groq } from "next-sanity";

/* export const GetSingleProductImages = groq`
*[_type == "product" && slug.current == $productslug][0] {
    title, 
    "id": _id,
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
}`; */

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
       images,
        heading,
        body,
        _type,
        _key,
      },
    }
}`;

/* "images": images[] {
  "url": asset,
  "key": _key,
 },
 */
export const GetAllProductsForCart = `
*[_type=="product" && available == true]{
  name,
  "price": price * 100,
  "id": _id,
  "image": image,
  currency,
  quantity,
  available,
  "product_data": {
    "metadata": {
      "id": _id
    }
   
  } 
}
`;

export const GetAllProductsForCartById = `
*[_type=="product" && _id == $id][0]{
  name,
  "price": price * 100,
  "id": _id,
  "image": image,
  currency,
  quantity,
}
`;

export const GetSingleProduct = `
*[_type == "product" && available == true &&  slug.current == $productslug][0] {
  name,
  "productslug": slug.current, 
  description,
  "price": price * 100,
  "id": _id,
  "mainImage": {
    "url": image,
    "alt": image.attribution, 
  },
  currency,
  condition, 
  size, 
  available,
  quantity
}`;

export const getNavigation = `*[_type == "navigation"] {
  "navId": navigationId.current,
   "navItems": navigationItems[] { 
      _type == "reference" => @-> {
        title,
        "slug": slug.current,
        "pageSections": pageBuilder[] {
          heading,
        }
      }
    },
}`;

export const getLandingPage = `*[_type == "landingPage"][0] {
  imagesGallery,
  "products": products[] {
      _type == "reference" => @-> {
        name, 
    _id, 
    "productslug": slug.current, 
    "price": price * 100, 
    "imageUrl": image.asset->url, 
    "imageAlt": image.attribution,
    image,
      }
    }, 
}`;
