const mongoose = require('mongoose');
const { loadEnvConfig } = require('@next/env');

// Using LOCAL ASSETS to guarantee they load. No more remote CDNs.
// Based on user report:
// details.svg = Gaming Laptop (ASUS ROG)
// trending.svg = DSLR Camera
// hero-5.svg = Yellow Chair
// hero-4.svg = Air Fryer
// hero-3.svg = Red Table Lamp
// hero-2.svg = Handbag
// hero-1.svg = Apple Watch
// iphone.png = iPhones

const dummyProducts = [
  {
  url: 'https://amazon.com/example-product-1',
    geturl: 'https://amazon.com/example-product-1',
      currency: '₹',
        image: '/assets/images/details.svg', // User says: Gaming Laptop (ASUS ROG)
          title: 'ASUS ROG Strix G16 Gaming Laptop',
            currentPrice: 98990,
              originalPrice: 134990,
                priceHistory: [{ price: 98990, date: new Date() }],
                  lowestPrice: 98990,
                    highestPrice: 134990,
                      averagePrice: 115000,
                        discountRate: 27,
                          description: 'Powerful gaming laptop with high refresh rate display.',
                            category: 'Computers',
                              reviewsCount: 1500,
                                stars: 4.7,
                                  isOutOfStock: false,
  },
{
  url: 'https://amazon.com/example-product-2',
    geturl: 'https://amazon.com/example-product-2',
      currency: '₹',
        image: '/assets/images/trending.svg', // User says: Camera (DSLR)
          title: 'Canon EOS R50 Mirrorless Camera',
            currentPrice: 65990,
              originalPrice: 75990,
                priceHistory: [{ price: 65990, date: new Date() }],
                  lowestPrice: 65990,
                    highestPrice: 75990,
                      averagePrice: 70990,
                        discountRate: 13,
                          description: 'Compact mirrorless camera for content creators.',
                            category: 'Electronics',
                              reviewsCount: 850,
                                stars: 4.6,
                                  isOutOfStock: false,
  },
{
  url: 'https://amazon.com/example-product-3',
    geturl: 'https://amazon.com/example-product-3',
      currency: '₹',
        image: '/assets/images/hero-5.svg', // User says: Yellow Chair
          title: 'Modern Mid-Century Accent Chair',
            currentPrice: 12999,
              originalPrice: 18999,
                priceHistory: [{ price: 12999, date: new Date() }],
                  lowestPrice: 12999,
                    highestPrice: 18999,
                      averagePrice: 15999,
                        discountRate: 32,
                          description: 'Stylish yellow accent chair for living room.',
                            category: 'Home',
                              reviewsCount: 420,
                                stars: 4.5,
                                  isOutOfStock: false,
  },
{
  url: 'https://amazon.com/example-product-4',
    geturl: 'https://amazon.com/example-product-4',
      currency: '₹',
        image: '/assets/images/hero-4.svg', // User says: Air Fryer
          title: 'Philips Digital Air Fryer HD9200',
            currentPrice: 6999,
              originalPrice: 9999,
                priceHistory: [{ price: 6999, date: new Date() }],
                  lowestPrice: 6999,
                    highestPrice: 9999,
                      averagePrice: 8499,
                        discountRate: 30,
                          description: 'Healthy cooking with up to 90% less fat.',
                            category: 'Kitchen',
                              reviewsCount: 12500,
                                stars: 4.4,
                                  isOutOfStock: false,
  },
{
  url: 'https://amazon.com/example-product-5',
    geturl: 'https://amazon.com/example-product-5',
      currency: '₹',
        image: '/assets/images/hero-3.svg', // User says: Red Table Lamp
          title: 'Vintage Mosaic Table Lamp',
            currentPrice: 1899,
              originalPrice: 3499,
                priceHistory: [{ price: 1899, date: new Date() }],
                  lowestPrice: 1899,
                    highestPrice: 3499,
                      averagePrice: 2699,
                        discountRate: 46,
                          description: 'Beautiful decorative lamp for bedroom or living room.',
                            category: 'Home',
                              reviewsCount: 340,
                                stars: 4.3,
                                  isOutOfStock: false,
  },
{
  url: 'https://amazon.com/example-product-6',
    geturl: 'https://amazon.com/example-product-6',
      currency: '₹',
        image: '/assets/images/hero-2.svg', // User says: Brown Handbag
          title: 'Premium Leather Tote Bag',
            currentPrice: 4500,
              originalPrice: 8900,
                priceHistory: [{ price: 4500, date: new Date() }],
                  lowestPrice: 4500,
                    highestPrice: 8900,
                      averagePrice: 6700,
                        discountRate: 49,
                          description: 'Spacious and elegant leather handbag.',
                            category: 'Fashion',
                              reviewsCount: 890,
                                stars: 4.6,
                                  isOutOfStock: false,
  },
{
  url: 'https://amazon.com/example-product-7',
    geturl: 'https://amazon.com/example-product-7',
      currency: '₹',
        image: '/assets/images/hero-1.svg', // User says: Apple Watch
          title: 'Apple Watch Series 9 (GPS)',
            currentPrice: 38900,
              originalPrice: 41900,
                priceHistory: [{ price: 38900, date: new Date() }],
                  lowestPrice: 38900,
                    highestPrice: 41900,
                      averagePrice: 40400,
                        discountRate: 7,
                          description: 'Smarter. Brighter. Mightier.',
                            category: 'Electronics',
                              reviewsCount: 5600,
                                stars: 4.8,
                                  isOutOfStock: false,
  },
{
  url: 'https://amazon.com/example-product-8',
    geturl: 'https://amazon.com/example-product-8',
      currency: '₹',
        image: '/assets/images/iphone.png', // User says: iPhones
          title: 'Apple iPhone 15 Pro (128 GB)',
            currentPrice: 129800,
              originalPrice: 134900,
                priceHistory: [{ price: 129800, date: new Date() }],
                  lowestPrice: 129800,
                    highestPrice: 134900,
                      averagePrice: 132350,
                        discountRate: 4,
                          description: 'Titanium design. A17 Pro chip.',
                            category: 'Electronics',
                              reviewsCount: 9800,
                                stars: 4.9,
                                  isOutOfStock: false,
  }
];

async function seed() {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is undefined');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const productCollection = mongoose.connection.db.collection('products');

    // Clear existing products to avoid conflicts and ensure clean state
    console.log('Clearing existing products...');
    await productCollection.deleteMany({});
    console.log('Cleared.');

    const result = await productCollection.insertMany(dummyProducts);
    console.log(`Seeded ${result.insertedCount} products successfully.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

seed();
