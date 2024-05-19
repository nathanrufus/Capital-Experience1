import Link from "next/link"

function header() {
	return (
		<Link href='/'>
			<div className=" h-20 bg-rose-950 flex items-center">
				<h1 className=" p-2  text-7xl text-white sm:text-2xl">
					Complete Experience
				</h1>
			</div>
		</Link>
	)
}

export default header
