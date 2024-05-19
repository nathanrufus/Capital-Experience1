// pages/page.js
"use client"
import {
	useEffect,
	useState,
} from "react"
import Link from "next/link"

function Route() {
	const [
		groupedCountries,
		setGroupedCountries,
	] = useState({})
	const [loading, setLoading] =
		useState(true)

	useEffect(() => {
		async function fetchCountries() {
			const res = await fetch(
				"https://restcountries.com/v3.1/all"
			)
			const countries = await res.json()

			const grouped = countries.reduce(
				(acc, country) => {
					const { region } = country
					if (!acc[region]) {
						acc[region] = []
					}
					acc[region].push(country)
					return acc
				},
				{}
			)

			// Sort countries alphabetically within each region
			for (const region in grouped) {
				grouped[region].sort((a, b) =>
					a.name.common.localeCompare(
						b.name.common
					)
				)
			}

			setGroupedCountries(grouped)
			setLoading(false)
		}

		fetchCountries()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	const sortedRegions = Object.keys(
		groupedCountries
	).sort()

	return (
		<div className="home_bg">
			<h1 className="select">
				Please select a country from this
				list to explore the weather,movies
				and photos
			</h1>
			{sortedRegions.map((region) => (
				<div
					key={region}
					className="component"
				>
					<h2 className="region">
						{region}
					</h2>
					<ul>
						{groupedCountries[region].map(
							(country) => (
								<li
									key={country.cca3}
									className="items"
								>
									{country.name.common} /{" "}
									{country.capital &&
									country.capital[0] ? (
										<Link
											href={`/${encodeURIComponent(
												country.name.common
											)}/${encodeURIComponent(
												country.capital[0]
											)}`}
										>
											{country.capital[0]}
										</Link>
									) : (
										"No Capital"
									)}{" "}
								</li>
							)
						)}
					</ul>
				</div>
			))}
		</div>
	)
}

export default Route
