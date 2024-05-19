import "./globals.css"
import Header from "@/components/Header"

export const metadata = {
	title: "Complete Experience",
	description:
		"Have a complete experince",
}

export default function RootLayout({
	children,
}) {
	return (
		<html lang="en">
			<body>
				<main className="app">
          <Header/>
					{children}
				</main>
			</body>
		</html>
	)
}
