import { createWebHistory, createRouter } from "vue-router";
// import { useStore } from "../store/monev";

// START
// const componentModules = import.meta.globEager("../views/**/*.vue");

// Function to create a route object for a given component
// function createRoute(filePath, component) {
// Extract a route path from the file path
// const path = filePath
//   .replace('../views', '') // Remove the '../views' part
//   .replace('.vue', '') // Remove the file extension
//   .toLowerCase(); // Ensure the path is lowercase

// Extract a name from the file path, using the last part of the path as the name
// const name = path.replace('/', '').replace(/\//g, '-');

// const newpath = path.replace(/index/g, '');

//   return {
//     path: `${newpath}`, // Prepend '/example' to the generated path
//     name: name,
//     component: component.default,
//   };
// }

// Create routes dynamically from imported components
// const routes = Object.entries(componentModules).map(([filePath, component]) => {
//   return createRoute(filePath, component);
// });

// console.log(routes)

const routes = [
	{
		path: "/",
		name: "Home",
		exact: true,
		component: () => import("../views/home/index.vue"),
		meta: {
		},
	},	{
		path: "/index",
		name: "Home2",
		exact: true,
		component: () => import("../views/home/index2.vue"),
		meta: {
		},
	},	{
		path: "/about_us",
		name: "about_us",
		exact: true,
		component: () => import("../views/pages/About_us.vue"),
		meta: {
		},
	},	{
		path: "/portfolio",
		name: "portfolio",
		exact: true,
		component: () => import("../views/pages/portfolio/Portfolio.vue"),
		meta: {
		},
	},	{
		path: "/portfolio/kategori/:id",
		name: "portfolio_kategori",
		exact: true,
		component: () => import("../views/pages/portfolio/Portfolio_kategori.vue"),
		meta: {
		},
	},	{
		path: "/portfolio/detail/:id",
		name: "Detail_portfolio",
		exact: true,
		component: () => import("../views/pages/portfolio/Detail_portfolio.vue"),
		meta: {
		},
	},	{
		path: "/services",
		name: "services",
		exact: true,
		component: () => import("../views/pages/services/Services.vue"),
		meta: {
		},
	},	{
		path: "/alumni",
		name: "alumni",
		exact: true,
		component: () => import("../views/pages/alumni/Alumni.vue"),
		meta: {
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior() {
		return { top: 0, y: 0 };
	},
});

router.beforeEach((to, from, next) => {
	// const store = useStore();
	// const token = store.token || null;
	// console.log(token, "router token");

	// if (to.meta.requiresAuth && !token) {
	// 	// Redirect to login if auth is required but no token
	// 	store.clear_token();
	// 	next("/login");
	// } else if (to.path === "/logout") {
	// 	// Clear token and redirect to home on logout
	// 	store.clear_token();
	// 	next("/");
	// } else if (!to.meta.requiresAuth && token) {
	// 	// Redirect logged-in users away from public pages
	// 	next("/dashboard");
	// } else {
		// Allow access in all other cases
		next();
	// }
});

export default router;
