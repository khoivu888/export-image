import { useState } from "react";

const ShopifyPage = () => {
  const [storeName, setStoreName] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const storeNameMap = {
    godgroup: "Godgroup",
    dillypod: "Dillypod",
    godmerch88: "Godmerch",
    beelice: "Chillever",
    gghanzo: "Godashops",
    pofily: "Pofily",
    mimiley: "Pamaheart",
    coolspod: "coolspod",
    dandygift: "Namashops",
    "papa-shops": "Chillever cũ",
    "657af8-3": "giantbighand",
    "tee-shirt-for-family": "amazingmetalsign",
    goodlygift88: "goodlygift",
    "c04f72-3": "goodlyhair",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAllProducts([]);
    let nextPageUrl = `/${storeName}/products.json?created_at_min=${startDate}&created_at_max=${endDate}&limit=250`;
    let keepFetching = true;
    let productsFetched = [];

    while (keepFetching) {
      const response = await fetch(nextPageUrl, {
        method: "GET",
        headers: {
          "X-Shopify-Access-Token": `${apiToken}`,
        },
      });

      if (!response.ok) {
        keepFetching = false;
        console.error("Failed to fetch", response.statusText);
        break;
      }

      const data = await response.json();
      productsFetched = productsFetched.concat(data.products);

      const linkHeader = response.headers.get("Link");

      if (linkHeader) {
        const matches = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        if (matches) {
          const pageUrl = new URL(matches[1]);
          nextPageUrl = `/${storeName}/products.json?${pageUrl.searchParams.toString()}`;
        } else {
          keepFetching = false;
        }
      } else {
        keepFetching = false;
      }
    }
    setAllProducts(productsFetched);
    await new Promise((resolve) => setTimeout(resolve, 0));
    const csvData = convertToCSV(productsFetched);
    downloadCSV(csvData);
  };

  const getMaxImageCount = (products) => {
    return products.reduce(
      (max, product) => Math.max(max, product.images.length),
      0
    );
  };

  const buildCSVHeaders = (maxImageCount) => {
    const imageHeaders = Array.from(
      { length: maxImageCount },
      (_, i) => `Image ${i + 1}`
    );
    return [
      "Store Name", // New column for store name
      "Product ID",
      "Created At",
      "Product Type",
      "Status",
      ...imageHeaders,
    ].join(",");
  };

  const productToCSVRow = (product, maxImageCount) => {
    const storeDisplayName = storeNameMap[storeName] || "Unknown Store";
    const baseInfo = [
      storeDisplayName, // New column value for store name
      product.id,
      product.created_at,
      product.product_type,
      product.status,
    ];

    const imageUrls = product.images.map((image) => image.src);
    const paddedImageUrls = [
      ...imageUrls,
      ...Array(maxImageCount - imageUrls.length).fill(""),
    ];

    return [...baseInfo, ...paddedImageUrls]
      .map((value) => `"${(value ?? "").toString().replace(/"/g, '""')}"`)
      .join(",");
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return "";

    const maxImageCount = getMaxImageCount(data);
    const headers = buildCSVHeaders(maxImageCount);
    const rows = data.map((product) => productToCSVRow(product, maxImageCount));

    return [headers, ...rows].join("\n");
  };

  const downloadCSV = (csvData) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "export-data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="block-form">
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Tên store Shopify"
        />
        <input
          type="text"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          placeholder="API Token"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit">Export Dữ Liệu</button>
      </form>
    </>
  );
};

export default ShopifyPage;
