# Invitely

Technologies used:
- Expo: Framework for React-Native development - [Expo Documentation](https://expo.io/learn)
- Formik: React form-builder that adds state, validation, and submit handlers out of the box
- Yup: Object-schema validation with TypeScript support
- React-native-testing-library: It's like Enzyme, but for React Native. [Documentation](https://callstack.github.io/react-native-testing-library/docs/getting-started)

## Quickstart

### Expo Mobile App
Requirements:
- Install Node Version Manager (nvm): https://github.com/nvm-sh/nvm. This will install NodeJS.
- Download command line tool: `npm install expo-cli --global`

```shell
cd expo-app/

# Install dependencies
yarn

# Start up the expo app
yarn start

# Follow instructions to scan the app QR code using the Expo Android app to run it on your device
```

### Flask Backend Service
Requirements:
- `python v3.8` or higher - use `pyenv` to manage your python versions.
- Install `pipenv` to manage your dependencies & virtual environment: https://github.com/pypa/pipenv

```shell
cd flask-service/

# Spawn a shell with virtualenv activated
pipenv shell

# Install dependencies
pipenv install

# Run the Flask app
flask run

# When you're done, you can exit
exit
```

#### Troubleshooting
- Try deleting `app.db` if any schema/model changes are made.

## Writing Test Cases

Ben Jackson wrote a great [article](https://engineering.ezcater.com/the-case-against-react-snapshot-testing) on why we SHOULDN'T do snapshot testing.

Instead, we write test cases for the following:

1. `it renders`
2. `it displays the right text`
3. `it conditionally renders some markup`
4. `it applies some CSS rules`