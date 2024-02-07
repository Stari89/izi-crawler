# Izi Crawler

Pub crawler app for my friend and anyone else who may be interested.

## Useful Links

-   [Index](https://izi-crawler.dko.si)
-   [Build Artifacts PREVIEW](https://izi-crawler.dko.si/artifacts.php)
-   [Web Application PREVIEW](https://preview.izi-crawler.dko.si)
-   [GitHub repository](https://github.com/Stari89/izi-crawler)
-   [Project on Expo](https://expo.dev/accounts/stari89/projects/izi-crawler)

## Development

### Environment Setup

-   Download and install **git** (for newbies the Principal Developer recommends installing [Sourcetree](https://www.sourcetreeapp.com/) git UI client with git included, so in case of problems he can help you)
-   Clone the project to your workspace folder with this url: `https://github.com/Stari89/izi-crawler.git`
-   Download and install Node Version Manager: [nvm for Windows](https://github.com/coreybutler/nvm-windows), [nvm for Linux and MacOS](https://github.com/nvm-sh/nvm)
-   Install Node.js (LTS, the exact version will be stated and enforced in `/src/client-mobile-v1/package.json`, but let's use 20.11.0 in this instructions) with nvm in your terminal (run your terminal as administrator if you get `exit status 5: Access is denied.` error):
    ```
    nvm install 20.11.0
    nvm use 20.11.0
    ```
-   Navigate to `/src/client-mobile-v1` folder in your terminal:
    ```
    cd ./src/client-mobile-v1
    ```
-   Install npm packages:
    ```
    npm install
    ```

### Debugging (development profile)

-   Make sure you have `.env.development` file with secrets in `/src/client-mobile-v1`. If not, contact the Principal Developer to supply you with one.
-   Navigate to `/src/client-mobile-v1` folder in your terminal:
    ```
    cd ./src/client-mobile-v1
    ```
-   Start the Expo development server with command:
    ```
    npm run start
    ```

#### Android

-   Install the Expo Go app.
-   Scan the QR code with the app.

#### iOS

-   Scan the QR code with the Camera app.

#### Web

-   Follow the Expo's development server instructions (just press "W" key once the server is up and running).

#### Android Emulator

-   Follow this guide: [Virtual Device Manager](https://developer.android.com/studio/run/managing-avds) for Android **and make sure your emulator has the Play Store enabled**. Once you have your emulator up and running, follow Expo's development server instructions on how to debug (basically you just press "A" button on your keyboard).

#### iOS Simulator

-   **TODO**

#### Troubleshooting

-   90% of problems is resolved by re-running the `npm install` command.
-   The 90% of the remaining 10% of problems is resolved by deleting the `/src/client-mobile-v1/node_modules` folder and running `npm install` command again.
-   Contact the Principal Developer only after you tried first two bullet points.

### Build (preview profile)

#### Android

-   Make sure you have `.env.preview` file with secrets in `/src/client-mobile-v1`. If not, contact the Principal Developer to supply you with one.
-   Install [Docker](https://www.docker.com/).
-   Run Docker.
-   In terminal, navigate to `/src` folder where the `docker-compose.yml` file is located:
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

-   **TODO**

#### Web

-   Copy-paste values from `.env.preview` to `.env` (until the Principal Developer automates this step)
-   Run expo export
    ```
    npm run export-web
    ```
-   **Undo changes** done on `.env`

### Testing (installing app on your device)

All build artifacts for testing are available on [Izi Crawler Build Artifacts](https://izi-crawler.dko.si/artifacts.php) page.

#### Android

Once you have an url to the APK (Android Package Kit) file, you will need to do the following:

-   Download the `*.apk` file to your device
-   Follow this [guide](https://www.groovypost.com/howto/install-apk-files-on-android/).

#### iOS

-   **TODO**

#### Web

-   On any device (desktop, mobile), open your favorite browser and navigate to this url: https://preview.izi-crawler.dko.si.

## Credits

-   **Damjan Kovačič** - Principal Development
-   **Ana Šolar** - Testing
-   **Ana Fekonja** - Testing
-   **Domen Prevejšek** - Testing, Art
-   **Matjaž Predanič** - Testing
-   **Rok Ivanšek** - Testing
-   **Iztok Molan** - Initial Inspiration For This Project, Named After, Interested Spectator
-   **Boštjan Piltaver** - Interested Spectator
-   **Sami Ilc** - Interested Spectator
-   **Tilen Volčanšek** - Interested Spectator
