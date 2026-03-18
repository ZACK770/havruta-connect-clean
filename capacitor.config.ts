import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hevruta.connect',
  appName: 'חברותא-קונקט',
  webDir: 'out',
  server: {
    url: 'https://hevruta-connect.onrender.com',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
