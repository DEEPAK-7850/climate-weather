export default function Footer() {
  return (
    <footer className="mt-10 text-center text-gray-500 text-sm py-4">
      <p>&copy; {new Date().getFullYear()} ClimateWeather - Helping you stay informed about weather and climate impact</p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="#" className="hover:text-primary-600 transition-colors">About</a>
        <a href="#" className="hover:text-primary-600 transition-colors">Climate Data Sources</a>
        <a href="#" className="hover:text-primary-600 transition-colors">API Documentation</a>
        <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
      </div>
    </footer>
  );
}
