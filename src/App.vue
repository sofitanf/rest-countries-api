<template>
	<main
		class="
			min-h-screen
			bg-lm-very-light-gray
			dark:bg-dm-very-dark-blue dark:text-white
		"
	>
		<nav
			class="
				flex
				justify-between
				items-center
				bg-white
				dark:bg-dm-dark-blue
				px-6
				md:px-14
				shadow-sm
				py-5
				sticky
				top-0
				z-50
			"
		>
			<router-link to="/">
				<p class="text-lm-very-dark-blue font-bold dark:text-white">
					Where in the world?
				</p>
			</router-link>
			<div class="flex gap-2 items-center cursor-pointer" @click="darkToggle">
				<i class="fas fa-moon text-xs"></i>
				<p class="text-sm">{{ textMode }}</p>
			</div>
		</nav>
		<router-view />
	</main>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			darkMode: false,
		};
	},
	computed: {
		textMode() {
			return this.darkMode ? "Light" : "Dark";
		},
	},
	methods: {
		darkToggle() {
			const html = document.querySelector("html");
			if (!this.darkMode) {
				html.classList.add("dark");
				localStorage.setItem("darkMode", "true");
				this.darkMode = true;
			} else {
				html.classList.remove("dark");
				localStorage.setItem("darkMode", "false");
				this.darkMode = false;
			}
		},
	},
	created() {
		const html = document.querySelector("html");
		if (localStorage.getItem("darkMode") === "true") {
			html.classList.add("dark");
			this.darkMode = true;
		}
	},
};
</script>
