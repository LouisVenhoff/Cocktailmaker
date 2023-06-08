import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cocktailhw.app',
  appName: 'cocktailhw',
  webDir: 'build',
  android:{
    allowMixedContent:true
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
