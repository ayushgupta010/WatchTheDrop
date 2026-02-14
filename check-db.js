const mongoose = require('mongoose');
const path = require('path');
const { loadEnvConfig } = require('@next/env');

async function checkProducts() {
      const projectDir = process.cwd();
      loadEnvConfig(projectDir);

      if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI is undefined');
            return;
      }

      try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to DB');

            // Define a basic schema if we can't import the model easily, or try to rely on mongoose buffering if model was already compiled? 
            // Safest to just query the collection directly via mongoose.connection.db

            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log('Collections:', collections.map(c => c.name));

            const productCollection = mongoose.connection.db.collection('products');
            const count = await productCollection.countDocuments();
            console.log(`Product count in 'products' collection: ${count}`);

            if (count > 0) {
                  const sample = await productCollection.findOne();
                  console.log('Sample product:', JSON.stringify(sample, null, 2));
            }

      } catch (error) {
            console.error('Error:', error);
      } finally {
            await mongoose.disconnect();
      }
}

checkProducts();
