import { Activity } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Button from "../components/ui/Button"

const LabelChip = () => {
	return (
		<div className="bg-gray-100 text-gray-600 text-xs font-medium pl-2 pr-3 rounded-full w-auto h-7 flex justify-center items-center border border-gray-400 ">
			<Activity size={16} strokeWidth={2} />
			<h3 className="ml-3 text-gray-600 text-sm">Engineered for performance</h3>
		</div>
	)
}

const HeroText = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-6 ">
			<h1 className="font-extrabold text-near-black text-7xl text-center tracking-tight leading-[70px]" >Log every rep. <br /> Track every gain.</h1>
			<p className="text-neutral-500 font-normal max-w-160 text-center mt-2 text-xl">A surgical-grade interface for serious training. No bloat, no friction—just pure data to drive your physical evolution.</p>
		</div>
	)
}

const HeroSection = () => {
	return (
		<section className="mt-40">
			<div className="flex flex-col items-center justify-center gap-5">
				<LabelChip />
				<HeroText />
			</div>
			<div className="flex items-center justify-center mt-10 gap-5">
				<Button>
					Get started for free
				</Button>
				<button className="h-10 w-auto p-2 px-8 text-near-black bg-gray-50 rounded-md flex justify-center items-center cursor-pointer font-semibold hover:bg-gray-100 hover:text-gray-900 active:scale-98 transition-all border border-gray-300">
					How it works?
				</button>
			</div>
		</section>
	)
}

const Layout = ({ children }) => {
	return (
		<div className="w-full max-w-[60vw] h-auto">
			<div className="sticky top-0">
				{children}
			</div>
		</div>
	)
}

const DashboardMockup = () => {
	return (
		<div className="w-full h-120 bg-gray-200 rounded-lg flex items-center justify-center border border-line-color my-20">

		</div>
	)
}

const Features = () => {
	return (
		<div></div>
	)
}

const LandingPage = () => {
	return (
		<div className="bg-neutral-50 w-full h-screen overflow-auto flex justify-center items-center flex-col">
			<Navbar />
			<Layout>
				<HeroSection />
				<DashboardMockup />
			</Layout>
		</div>
	)
}

export default LandingPage
