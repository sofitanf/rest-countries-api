<template>
	<div class="px-6 md:px-14 py-6">
		<button
			class="
				items-center
				text-sm
				shadow-md
				flex
				bg-white
				dark:bg-dm-dark-blue
				px-6
				py-1
			"
			@click.prevent="goBack"
		>
			<i class="fas fa-arrow-left mr-2 text-xs"></i> Back
		</button>
	</div>
	<Spinner v-if="loading" />
	<div v-else class="px-6 md:px-14 py-10 flex flex-col lg:flex-row lg:gap-10">
		<img style="min-width: 50%" :src="country.flags.png" alt="" />
		<div>
			<h1 class="font-bold text-xl mt-8 mb-6">
				{{ country.name.common }}
			</h1>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div class="text-sm flex flex-col gap-3">
					<div class="flex gap-1">
						<p>Native Name:</p>
						<a class="font-light">{{ nativeName }}</a>
					</div>
					<div class="flex gap-1">
						<p>Population:</p>
						<a class="font-light">{{
							new Intl.NumberFormat().format(country.population)
						}}</a>
					</div>
					<div class="flex gap-1">
						<p>Region:</p>
						<a class="font-light">{{ country.region }}</a>
					</div>
					<div class="flex gap-1">
						<p>Sub Region:</p>
						<a class="font-light">{{ country.subregion }}</a>
					</div>
					<div class="flex gap-1">
						<p>Capital:</p>
						<a class="font-light">{{ country.capital[0] }}</a>
					</div>
				</div>
				<div class="text-sm flex flex-col gap-3">
					<div class="flex gap-1">
						<p>Top Level Domain:</p>
						<a class="font-light">{{ country.tld[0] }}</a>
					</div>
					<div class="flex gap-1">
						<p>Currencies:</p>
						<a class="font-light">{{ currencies }}</a>
					</div>
					<div class="flex gap-1">
						<p>Languages:</p>
						<a class="font-light">{{ languages }}</a>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-4 mt-8">
				<p class="font-medium mb-2">Border Countries:</p>
				<div class="flex flex-wrap gap-2 lg:col-span-3 lg:ml-2">
					<div v-for="(border, i) in borders" :key="i">
						<router-link
							exact
							:to="{ name: 'detail', query: { country: border } }"
						>
							<button
								class="
									font-light
									text-xs
									bg-white
									px-6
									py-1
									dark:bg-dm-dark-blue
									shadow-md
								"
							>
								{{ border }}
							</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Spinner from "../components/Spinner.vue";
export default {
	components: { Spinner },
	data() {
		return {
			country: {},
			nativeName: "",
			currencies: "",
			languages: [],
			borders: [],
			loading: false,
		};
	},
	methods: {
		fetchData() {
			this.borders = [];
			this.loading = true;
			fetch(
				`https://restcountries.com/v3.1/name/${this.$route.query.country}?fullText=true`
			)
				.then((response) => response.json())
				.then((data) => {
					this.country = data[0];
					let arrayNativeName = Object.values(this.country.name.nativeName);
					let arrayCurrencies = Object.values(this.country.currencies);
					let arrayLanguages = Object.values(this.country.languages);

					this.nativeName = arrayNativeName[0].common;
					this.currencies = arrayCurrencies[0].name;
					this.languages = arrayLanguages.join(", ");

					this.country.borders.map((border) => {
						fetch(`https://restcountries.com/v3.1/alpha/${border}`)
							.then((response) => response.json())
							.then((data) => {
								let res = data[0];
								this.borders.push(res.name.common);
								this.loading = false;
							});
					});
				});
		},
		goBack() {
			this.$router.back();
		},
	},
	created() {
		this.fetchData();
	},
	watch: {
		$route: "fetchData",
	},
};
</script>