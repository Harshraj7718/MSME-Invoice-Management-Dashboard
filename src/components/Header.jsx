export default function Header() {
  return (
    <header className="relative bg-white shadow-sm overflow-hidden border-b-4 border-gradient">
      <style jsx>{`
        .border-gradient {
          border-image: linear-gradient(to right, #2563eb, #7c3aed, #db2777) 1;
        }
      `}</style>
      
      <div className="relative max-w-8xl mx-auto px-6 py-4 bg-white">
        <div className="flex items-center justify-between">
          
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-5">
            {/* Logo with Gradient Border */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="relative w-32 h-16 rounded-xl bg-white p-2 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <img 
                  src="image.png" 
                  alt="Company Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Invoice Management
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Track and manage your invoices
              </p>
            </div>
          </div>

          {/* Right: Notifications + User Menu */}
          <div className="flex items-center gap-3">
            
            {/* Notifications with gradient border */}
            <button className="relative p-2.5 text-gray-600 hover:text-gray-900 rounded-xl transition-all group bg-white border-2 border-transparent hover:border-gradient-animated">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Notification badge with pulse */}
              <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 ring-2 ring-white"></span>
              </span>
            </button>

            {/* Divider */}
            <div className="h-10 w-px bg-gray-200"></div>

            {/* User Profile with gradient border */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">ADMIN</p>
                <p className="text-xs text-gray-500">QISTON PE</p>
              </div>
              
              <div className="relative">
                {/* Gradient ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all"></div>
                
                {/* Avatar */}
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition-all overflow-hidden ring-2 ring-white group-hover:scale-110">
                  <img 
                    src="image.png" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                  />
                  {/* Fallback */}
                  <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 opacity-0">
                    AP
                  </span>
                </div>
                
                {/* Online indicator with pulse */}
                <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 ring-2 ring-white"></span>
                </span>
              </div>

              {/* Dropdown indicator */}
              <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors hidden sm:block group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

          </div>

        </div>
      </div>

      <style jsx>{`
        .border-gradient {
          border-image: linear-gradient(to right, #2563eb, #7c3aed, #db2777) 1;
        }
        .border-gradient-animated:hover {
          border: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(to right, #2563eb, #7c3aed, #db2777) border-box;
        }
      `}</style>
    </header>
  );
}