module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: "module"
	},
	plugins: [
		"import",
		"react",
		"@typescript-eslint"
	],
	settings: {
		"import/resolver": {
			node: {
				paths: ["src"],
				alias: {
					_assets: "./src/assets",
					_components: "./src/components",
					_atoms: "./src/components/atoms",
					_molecules: "./src/components/molecules",
					_organisms: "./src/components/organisms",
					_navigations: "./src/navigations",
					_scenes: "./src/scenes",
					_services: "./src/services",
					_styles: "./src/styles",
					_utils: "./src/utils",
					_root: "./",
				},
			},
		},
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
