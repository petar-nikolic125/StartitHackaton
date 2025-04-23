import Hero from './components/Hero'

export default function App() {
    return (
        // This wrapper provides ONE continuous gradient behind everything
        <div className="min-h-screen bg-[page-gradient] bg-fixed text-white">
            <Hero />
        </div>
    )
}
