import { useState } from 'react';

function App() {
  const [storeName, setStoreName] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allProducts, setAllProducts] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAllProducts([]);
    let page = 1;
    const storesUsingBasicAuth = ['amazingtees', 'seegovi', 'pamaheart', 'pofily'];
    const usesPagePagination = storesUsingBasicAuth.includes(storeName); 

   let formattedStartDate = startDate;
    let formattedEndDate = endDate;
    if (storesUsingBasicAuth.includes(storeName)) {
        // Assuming startDate and endDate are in the format "YYYY-MM-DD"
        formattedStartDate = new Date(startDate).toISOString();
        formattedEndDate = new Date(endDate).toISOString();
    }

    let pageUrl = ''
    let keepFetching = true;
    let productsFetched = []


    while (keepFetching && (!usesPagePagination || page <= 40)) {
      let nextPageUrl = usesPagePagination ?
            `/${storeName}/products.json?page=${page}&limit=250&created_at_min=${formattedStartDate}&created_at_max=${formattedEndDate}` :
        `/${storeName}/products.json?created_at_min=${formattedStartDate}&created_at_max=${formattedEndDate}&limit=250`;
      
      const headers = storesUsingBasicAuth.includes(storeName) ? 
            {'Authorization': `Basic ${apiToken}`} : 
            {'X-Shopify-Access-Token': `${apiToken}`};
      
      const response = await fetch(nextPageUrl, {
          method: 'GET',
          headers: headers,
      });

      if (!response.ok) {
          keepFetching = false; // Dừng lặp nếu gặp lỗi
          console.error("Failed to fetch", response.statusText);
          break;
      }

      const data = await response.json();
      productsFetched = productsFetched.concat(data.products);
      console.log(data); // Log dữ liệu của trang hiện tại

      if (usesPagePagination) {
        // Increment page for next loop iteration if using page-based pagination
        page++;
      } else {
        const linkHeader = response.headers.get('Link');
        // Xử lý linkHeader ở đây
      
        if (linkHeader) {
          const matches = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
          if (matches) {
            pageUrl = new URL(matches[1]);
            console.log(pageUrl.search, 'pageUrl')
            nextPageUrl = `/${storeName}/products.json?${pageUrl}`;
            console.log(nextPageUrl, 'nextPageUrl')
          } else {
            keepFetching = false; // Dừng lặp nếu không tìm thấy trang tiếp theo
          }
        } else {
          keepFetching = false; // Dừng lặp nếu không có header Link
        }
      }
      
    }
    setAllProducts(productsFetched);
    await new Promise(resolve => setTimeout(resolve, 0));
    console.log(allProducts, 'allProducts')
    const csvData = convertToCSV(productsFetched);
      downloadCSV(csvData);
  };
  
  const getMaxImageCount = (products) => {
    return products.reduce((max, product) => Math.max(max, product.images.length), 0);
  };

  const buildCSVHeaders = (maxImageCount) => {
    const imageHeaders = Array.from({ length: maxImageCount }, (_, i) => `Image ${i + 1}`);
    return ['Product ID', 'Created At', 'Product Type', 'Status', ...imageHeaders].join(',');
  };

  const productToCSVRow = (product, maxImageCount) => {
    const baseInfo = [
      product.id,
      product.created_at,
      product.product_type,
      product.status,
    ];

    const imageUrls = product.images.map(image => image.src);
    const paddedImageUrls = [...imageUrls, ...Array(maxImageCount - imageUrls.length).fill('')];

    return [...baseInfo, ...paddedImageUrls].map(value =>
      `"${(value ?? '').toString().replace(/"/g, '""')}"`
    ).join(',');
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const maxImageCount = getMaxImageCount(data);
    const headers = buildCSVHeaders(maxImageCount);
    const rows = data.map(product => productToCSVRow(product, maxImageCount));
    
    return [headers, ...rows].join('\n');
  };
  const downloadCSV = (csvData) => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'export-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <>
      <form onSubmit={handleSubmit} className='block-form'>
        <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Tên store Shopify" />
        <input type="text" value={apiToken} onChange={(e) => setApiToken(e.target.value)} placeholder="API Token" />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button type="submit">Export Dữ Liệu</button>
    </form>
    </>
  );
}

export default App;
