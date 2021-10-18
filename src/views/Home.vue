<template>
	<div class="px-6 md:px-14 py-6">
		<div class="flex flex-col gap-8 md:flex-row md:justify-between">
			<div class="shadow-sm rounded-lg flex bg-white dark:bg-dm-dark-blue">
				<button class="px-5 py-3"><i class="fas fa-search text-sm"></i></button>
				<input
					placeholder="Search for country.."
					class="
						flex-1
						text-sm
						bg-white
						dark:bg-dm-dark-blue
						focus:outline-none focus:border-transparent
						rounded-lg
						pr-5
					"
					type="text"
					v-model="searchTerm"
				/>
			</div>
			<div class="mt-1 relative flex text-sm w-44">
				<select
					class="
						block
						appearance-none
						w-full
						bg-white
						dark:bg-dm-dark-blue
						shadow-sm
						py-3
						px-4
						pr-8
						rounded
						leading-tight
						focus:outline-none focus:border-transparent
					"
					v-model="region"
					@change="filterRegion"
				>
					<option value="" selected disable hidden>Filter by Region</option>

					<option v-for="(region, i) in regions" :key="i" exact :value="region">
						{{ region }}
					</option>
				</select>
				<div
					class="
						absolute
						flex
						inset-y-0
						items-center
						px-3
						right-0
						bg-white
						dark:bg-dm-dark-blue
						rounded-r
						pointer-events-none
					"
				>
					<i class="fas fa-chevron-down text-xs"></i>
				</div>
			</div>
		</div>
	</div>
	<div
		class="
			px-6
			md:px-14
			py-6
			grid grid-cols-1
			sm:grid-cols-2
			md:grid-cols-3
			xl:grid-cols-4
			2xl:grid-cols-5
			gap-12
		"
	>
		<div class="flex flex-col" v-for="(country, i) in searchCountry" :key="i">
			<router-link
				exact
				:to="{ name: 'detail', query: { country: country.name.common } }"
			>
				<img
					class="rounded-t-lg w-full h-48 sm:h-36 md:h-40 lg:h-48"
					:src="country.flags.png"
					alt=""
				/>
			</router-link>
			<div
				class="
					bg-white
					rounded-b-lg
					dark:bg-dm-dark-blue
					shadow-sm
					px-5
					pt-5
					pb-10
				"
			>
				<h1 class="font-bold text-lg mb-2">{{ country.name.common }}</h1>
				<div class="text-sm">
					<div class="flex gap-1">
						<p>Populations:</p>
						<a class="font-light">{{
							new Intl.NumberFormat().format(country.population)
						}}</a>
					</div>
					<div class="flex gap-1">
						<p>Region:</p>
						<a class="font-light">{{ country.region }}</a>
					</div>
					<div
						v-for="(capital, i) in country.capital"
						:key="i"
						class="flex gap-1"
					>
						<p>Capital:</p>
						<a class="font-light">{{ capital }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			searchTerm: "",
			region: "",
			countries: [],
			regions: ["Africa", "America", "Asia", "Europe", "Oceania"],
		};
	},
	computed: {
		searchCountry() {
			return this.countries.filter((country) => {
				return country.name.common
					.toLowerCase()
					.match(this.searchTerm.toLowerCase());
			});
		},
	},
	methods: {
		async fetchData() {
			await fetch("https://restcountries.com/v3.1/all")
				.then((response) => response.json())
				.then((data) => {
					this.countries = data;
				});
		},

		filterRegion() {
			this.$router.push({ name: "home", query: { country: this.region } });
			this.countries = [];
			fetch(`https://restcountries.com/v3.1/region/${this.region}`)
				.then((response) => response.json())
				.then((data) => {
					this.countries = data;
				});
		},
	},
	created() {
		this.fetchData();
	},
};
</script>