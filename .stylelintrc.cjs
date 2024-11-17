module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-sass-guidelines"
  ],
  plugins: [
    "stylelint-scss",
    "stylelint-order"
  ],
  rules: {
    "declaration-property-value-disallowed-list": null,
    "selector-class-pattern": "^[a-zA-Z0-9\\-_]+$",
    "selector-max-id": 1,
    "no-descending-specificity": null,
    "no-invalid-position-at-import-rule": null,
    "color-named": "always-where-possible",
    "order/properties-alphabetical-order": true,
    "max-nesting-depth": 3
  },
  ignoreFiles: [
    "node_modules/**/*",
    "dist/**/*",
    "*.min.css"
  ]
};
