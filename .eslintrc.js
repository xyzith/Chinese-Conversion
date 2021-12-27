module.exports = {
    "env": {
        "browser": true,
        "es6": true,
	"webextensions": true,

    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-trailing-spaces": 1,
        "linebreak-style": 0,
        "indent": [
            "error",
            "tab",
            {
              "SwitchCase": 1,
              "ignoreComments": true
            }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
