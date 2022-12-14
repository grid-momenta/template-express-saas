require("@rushstack/eslint-config/patch/modern-module-resolution");

module.exports = {
	extends: ["@rushstack/eslint-config/profile/node", "prettier"],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
	},
	rules: {
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "variable",
				types: ["boolean"],
				format: ["PascalCase"],
				prefix: ["is", "should", "has", "can", "did", "will"],
			},
			{
				selector: "function",
				format: ["PascalCase", "camelCase"],
			},
			{
				selector: "typeLike",
				format: ["PascalCase"],
			},
		],

		"jest/expect-expect": "off",

		"@rushstack/typedef-var": "off",
	},
};
