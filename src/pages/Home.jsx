import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, Home as HomeIcon, Music, Star, Radio } from 'lucide-react';
import SearchBar from '../components/Searchbar';
import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer';
import Popular from '../components/Popular';
import Makossa from '../components/Makossa';
import Afropop from '../components/AfroPop';
import Jazz from '../components/Jazz';
import Bikutsi from '../components/Bikutsi';
import { ARTISTS } from '../ARTISTS';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allArtists = [...ARTISTS.artists];

  const filteredArtists = allArtists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { icon: <HomeIcon />, label: 'Home' },
    { icon: <Search />, label: 'Search' },
    { icon: <Music />, label: 'Library' },
    { icon: <Star />, label: 'Favorites' },
    { icon: <Radio />, label: 'Radio' },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-b from-green-900 to-neutral-900 min-h-screen text-neutral-100">
      {/* Sidebar for desktop */}
      <motion.div
        className="hidden md:flex flex-col w-64 bg-neutral-800 text-white p-4 shadow-lg"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-amber-500 mb-8">KWIFE</h1>
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-4 cursor-pointer hover:bg-neutral-700 p-2 rounded transition-colors duration-200"
          >
            {item.icon}
            <span className="ml-2 text-lg">{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Mobile header */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <Menu
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="cursor-pointer text-amber-500"
          />
          <h1 className="text-3xl font-bold text-amber-500">KWIFE</h1>
          <div className="w-6"></div> {/* Placeholder for balance */}
        </div>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-neutral-800 text-white p-4 z-50"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end">
              <Menu
                onClick={() => setIsSidebarOpen(false)}
                className="cursor-pointer text-amber-500"
              />
            </div>
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center mb-4 cursor-pointer hover:bg-neutral-700 p-2 rounded transition-colors duration-200"
              >
                {item.icon}
                <span className="ml-2 text-lg">{item.label}</span>
              </div>
            ))}
          </motion.div>
        )}

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {searchQuery ? (
          <div>
            <h2 className="font-bold text-2xl mb-4 text-amber-500">
              Search Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredArtists.length > 0 ? (
                filteredArtists.map((artist) => (
                  <motion.div
                    key={artist.id}
                    className="bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3 flex-grow flex flex-col">
                      <h3 className="text-sm font-medium text-white mb-1 line-clamp-2">
                        {artist.name}
                      </h3>
                      <p className="text-xs text-neutral-400">{artist.niche}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-neutral-400">No artists found.</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <CategoryList />
            <Popular artists={filteredArtists} />
            <Makossa artists={filteredArtists} />
            <Afropop artists={filteredArtists} />
            <Jazz artists={filteredArtists} />
            <Bikutsi artists={filteredArtists} />
          </>
        )}
      </div>
      <div className="md:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
