/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {
			animation: {
				sideways: "sideways 0.5s linear infinite",
			},
			colors: {
				warning: "rgba(255, 215, 64, 1)",
				primary: "rgba(48, 63, 159, 1)",
				success: "rgba(29, 233, 182, 1)",
				secondary: "rgba(96, 125, 139, 0.55)",
				danger: "rgba(245, 0, 87, 1)",
				info: "rgba(30, 136, 229, 1)",
				semiprime: "rgba(5, 196, 107, 0.35)",
				redist: "rgba(235, 59, 90, 1)",
				// ghostdanger: "rgba(235, 59, 90, 0.35)",
				ghost: "rgba(255, 255, 255, 0.25)",
				semi: "rgba(134, 141, 157, 1)",
				shade: "rgba(0, 0, 0, 0.1)",
				ghostsuccess: "rgba(29, 233, 182, 0.4)",
				ghostwarning: "rgba(255, 215, 64, 0.4)",
				ghostprimary: "rgba(48, 63, 159, 0.4)",
				ghostdanger: "rgba(245, 0, 87, 0.4)",
				ghostsecondary: "rgba(96, 125, 139, 0.4)",
				ghostinfo: "rgba(30, 136, 229, 0.4)",
				red: "rgba(235, 59, 90, 1)",
				grayish: "rgba(134, 141, 157, 1)",
				inputvalue: "rgba(27, 27, 27, 0.85)",
				blek: "#414945",
				toastSuccess: "rgba(0, 196, 114, 1)",
				toastWarning: "rgba(243, 255, 0, 1)",
				treeLevel1: "rgba(255, 121, 109, 1)",
				treeLevel2: "rgba(161, 253, 231, 1)",
				treeLevel3: "rgba(255, 201, 175, 1)",
				treeLevel4: "rgba(252, 185, 70, 1)",
				treeLevel5: "rgba(217, 217, 217, 1)",
				cardPink: "rgba(255, 226, 229, 1)",
				cardMatcha: "rgba(220, 252, 231, 1)",
			},
			fontSize: {
				xxs: "10px",
			},
		},
	},
	plugins: [],
};

//original color
// warning: "rgba(242, 205, 66, 1)",
// 				primary: "rgba(36, 99, 226, 1)",
// 				success: "rgba(5, 196, 107, 1)",
// 				secondary: "rgba(27, 27, 27, 0.55)",
// 				danger: "rgba(255, 31, 31, 1)",
// 				info: "rgba(16, 186, 205, 1)",
// 				semiprime: "rgba(5, 196, 107, 0.35)",
// 				redist: "rgba(235, 59, 90, 1)",
// 				ghostdanger: "rgba(235, 59, 90, 0.35)",
// 				ghost: "rgba(255, 255, 255, 0.25)",
// 				semi: "rgba(134, 141, 157, 1)",
// 				shade: "rgba(0, 0, 0, 0.1)",
// 				ghostsuccess: "rgba(5, 196, 107, 0.4)",
// 				ghostwarning: "rgba(242, 205, 66, 0.4)",
// 				ghostprimary: "rgba(36, 99, 226, 0.4)",
// 				ghostdanger: "rgba(255, 31, 31, 0.4)",
// 				ghostsecondary: "rgba(27, 27, 27, 0.4)",
// 				ghostinfo: "rgba(16, 186, 205, 0.4)",
// 				red: "rgba(235, 59, 90, 1)",
// 				grayish: "rgba(134, 141, 157, 1)",
// 				inputvalue: "rgba(27, 27, 27, 0.85)",
// 				blek: "#414945",
// 				toastSuccess: "rgba(0, 196, 114, 1)",
// 				toastWarning: "rgba(243, 255, 0, 1)",
// 				treeLevel1: "rgba(255, 121, 109, 1)",
// 				treeLevel2: "rgba(161, 253, 231, 1)",
// 				treeLevel3: "rgba(255, 201, 175, 1)",
// 				treeLevel4: "rgba(252, 185, 70, 1)",
// 				treeLevel5: "rgba(217, 217, 217, 1)",
// 				cardPink: "rgba(255, 226, 229, 1)",
// 				cardMatcha: "rgba(220, 252, 231, 1)",
