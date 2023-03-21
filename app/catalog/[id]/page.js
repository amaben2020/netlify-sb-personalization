import { getStoryblokApi } from "@storyblok/react/rsc";
import { getCookie, setCookie } from "react-use-cookie";

import Catalog from "../../../components/blocks/Catalog";

export default async function CatalogPage({ params }) {
  const category = params.id;
  const products = await fetchData(category);

  if (!getCookie("user_type") && category) {
    setCookie("user_type", category);
  }

  return (
    <main>
      <h1 className="text-4xl mt-[30px] font-bold text-center">{category}</h1>
      <div>
        <Catalog products={products} />
      </div>
    </main>
  );
}

export async function fetchData(category) {
  let filter_query = {
    component: {
      in: "product",
    },
  };

  if (category) {
    filter_query.category = {
      in: category,
    };
  }

  let sbParams = {
    version: "draft",
    resolve_links: "url",
    filter_query: filter_query,
  };

  const storyblokApi = getStoryblokApi();
  return await storyblokApi.getAll("cdn/stories", sbParams);
}
