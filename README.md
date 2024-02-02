# Izi Crawler

Pub crawler app for my friend and anyone else who may be interested.

## Useful Links

-   [Index](https://izi-crawler.dko.si)
-   [GitHub repository](https://github.com/Stari89/izi-crawler)

## Development

### Environment Setup

-   Download and install Node Version Manager: [nvm for Windows](https://github.com/coreybutler/nvm-windows), [nvm for Linux and MacOS](https://github.com/nvm-sh/nvm)
-   Install Node.js (LTS, the exact version will be stated and enforced in `/src/client-mobile-v1/package.json`, but let's use 20.10.0 in this instructions) with nvm in your terminal:
    ```
        nvm install 20.10.0
        nvm use 20.10.0
    ```
-   Navigate to `/src/client-mobile-v1` folder in your terminal:
    ```
    cd ./src/client-mobile-v1
    ```
-   Install npm packages:
    ```
    npm install
    ```

### Debug

-   Navigate to `/src/client-mobile-v1` folder in your terminal:
    ```
    cd ./src/client-mobile-v1
    ```
-   Start the Expo development server with command:
    ```
    npm run start
    ```
-   If you wish to debug on a physical device, scan the QR code with Expo Go app (Android) or the Camera app (iOS).
-   If you wish to debug on an emulator, follow this instruction: [Virtual Device Manager](https://developer.android.com/studio/run/managing-avds) for Android **and make sure your emulator has the Play Store enabled**. Once you have your emulator up and running, follow Expo's development server instructions on how to debug (basically you just press "A" button on your keyboard).
-   Have fun.

#### Troubleshooting

-   90% of problems is resolved by re-running the `npm install` command.
-   The 90% of the remaining 10% of problems is resolved by deleting the `/src/client-mobile-v1/node_modules` folder and running `npm install` command again.
-   Contact the Principal Developer only after you tried first two bullet points.

### Build (Preview)

#### Android

-   Make sure you have `.env.preview` file with secrets in `/src/client-mobile-v1`. If not, contact the Principal Developer to supply you with one.
-   Install [Docker](https://www.docker.com/).
-   In terminal, navigate to `/src` folder where the `docker-compose.yml` fole is located:
    ```
    cd ./src
    ```
-   Run the docker-compose command:
    ```
    docker-compose up -d
    ```
-   Make sure environment variables are correctly set **(APP WILL CRASH IF GOOGLE_API_KEY IS EMPTY)**:
    ```
    docker-compose run izi-crawler-builder env
    ```
-   Run the build through Docker:
    ```
    docker-compose run izi-crawler-builder eas build -p android --profile preview --local
    ```
-   eas-cli will prompt you for login credentials. Contact the Principal Developer.
-   This will generate `*.apk` file which you can copy on your Android device and install.

##### Useful Docker commands

```
docker image prune -a -f
docker volume prune -a -f
docker buildx prune -f
docker-compose run izi-crawler-builder env
```

#### iOS

**TODO**

### Testing (installing app on your device)

#### Android

Once you have an url to the APK (Android Package Kit) file, you will need to do the following:

-   Download the `*.apk` file to your device
-   Follow this [guide](https://www.groovypost.com/howto/install-apk-files-on-android/).

#### iOS

**TODO**

## Credits

-   **Damjan Kovačič** - Principal Developer
-   **Ana Šolar** - Interested Spectator
-   **Iztok Molan** - Initial Inspiration For This Project, Named After, Interested Spectator
-   **Domen Prevejšek** - Interested Spectator
-   **Boštjan Piltaver** - Interested Spectator
-   **Sami Ilc** - Interested Spectator
-   **Tilen Volčanšek** - Interested Spectator
-   **Rok Ivanšek** - Interested Spectator
