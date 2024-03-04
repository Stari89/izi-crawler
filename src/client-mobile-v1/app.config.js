module.exports = {
    // use the variable if it's defined, otherwise use the fallback
    name: process.env.APP_NAME || 'Izi Crawler',
    slug: 'izi-crawler',
    version: '1.0.0',
    orientation: 'default',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#7fb724',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
    },
    android: {
        package: 'com.stari89.izicrawler',
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#7fb724',
        },
        config: {
            googleMaps: {
                apiKey: process.env.GOOGLE_API_KEY,
            },
        },
    },
    web: {
        favicon: './assets/favicon.png',
        output: 'single',
        bundler: 'metro',
    },
    plugins: ['expo-location', 'expo-router'],
    extra: {
        eas: {
            projectId: '3669dab6-2e6b-4237-bddf-87e528c385a8',
            owner: 'stari89',
        },
        googleMapsApiKey: process.env.GOOGLE_API_KEY,
        apiBasePath: process.env.API_BASE_PATH,
    },
    scheme: 'your-app-scheme',
    owner: 'stari89',
};
