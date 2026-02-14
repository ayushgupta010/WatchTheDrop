async function getImages() {
      try {
            const res = await fetch('https://dummyjson.com/products?limit=100');
            const data = await res.json();

            const products = data.products;

            // Find matching categories if possible
            const electronics = products.filter(p => p.category === 'smartphones' || p.category === 'laptops');
            const home = products.filter(p => p.category === 'home-decoration' || p.category === 'furniture' || p.category === 'lighting');
            const other = products.filter(p => p.category === 'groceries' || p.category === 'skincare' || p.category === 'fragrances');

            console.log('--- Suggested Images ---');
            console.log('Electronics 1:', electronics[0]?.thumbnail);
            console.log('Electronics 2:', electronics[1]?.thumbnail);
            console.log('Electronics 3:', electronics[2]?.thumbnail);
            console.log('Electronics 4:', electronics[3]?.thumbnail);
            console.log('Home 1:', home[0]?.thumbnail);
            console.log('Home 2:', home[1]?.thumbnail);
            console.log('Other 1:', other[0]?.thumbnail);
            console.log('Other 2:', other[1]?.thumbnail);

      } catch (error) {
            console.error(error);
      }
}

getImages();
