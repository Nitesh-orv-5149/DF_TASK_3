export default function FooterSection() {
    return (
        <>
            {/* Footer Stats */}
            <footer className="bg-dark-2/50 mt-24 py-12 border-t border-gray-800">
                <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-2xl font-light text-white mb-1">1M+</div>
                        <div className="text-sm text-gray-500 font-light">Users</div>
                    </div>
                    <div>
                        <div className="text-2xl font-light text-white mb-1">50K+</div>
                        <div className="text-sm text-gray-500 font-light">Bookings</div>
                    </div>
                    <div>
                        <div className="text-2xl font-light text-white mb-1">24/7</div>
                        <div className="text-sm text-gray-500 font-light">Support</div>
                    </div>
                </div>
            </footer>
        </>
    )
}