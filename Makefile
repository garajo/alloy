SRC_TS = "src/**/*.ts"
SRC_JS = "src/**/*.js" "examples/html/*.js"
SRC_SCSS = "scss/**/*.scss"
SRC_JSON = "*.json"

lint-ts:
	@./node_modules/tslint/bin/tslint --project tsconfig.json --type-check -c tslint.json $(SRC_TS) --fix

lint-es:
	@./node_modules/eslint/bin/eslint.js --ext .json --ext .js $(SRC_JS) $(SRC_JSON) --fix

lint-scss:
	@./node_modules/sass-lint/bin/sass-lint.js --config .sass-lint.yml $(SRC_SCSS) --fix

lint-ts-ci:
	@./node_modules/tslint/bin/tslint --project tsconfig.json --type-check -c tslint.json $(SRC_TS)

lint-es-ci:
	@./node_modules/eslint/bin/eslint.js --ext .json --ext .js $(SRC_JS) $(SRC_JSON)

lint-scss-ci:
	@./node_modules/sass-lint/bin/sass-lint.js --config .sass-lint.yml $(SRC_SCSS)

lint: lint-ts lint-es lint-scss

lint-ci: lint-ts-ci lint-es-ci lint-scss-ci