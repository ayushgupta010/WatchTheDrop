const { loadEnvConfig } = require('@next/env');

async function check() {
      const projectDir = process.cwd();
      const loaded = await loadEnvConfig(projectDir);
      console.log('Loaded env files:', loaded.loadedEnvFiles);
      console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'Undefined');
      if (process.env.MONGODB_URI) {
            console.log('MONGODB_URI Length:', process.env.MONGODB_URI.length);
            console.log('First 5 chars:', process.env.MONGODB_URI.substring(0, 5));
      }
}

check().catch(console.error);
