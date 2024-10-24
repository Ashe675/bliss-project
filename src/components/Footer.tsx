import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pb-8 text-white">
      <div className="container mx-auto flex flex-col items-center">
        {/* <div className="flex flex-wrap justify-center mb-4">
          <Link href="/" className="px-4 py-2 hover:text-gray-400">Home</Link>
          <Link href="/about" className="px-4 py-2 hover:text-gray-400">About</Link>
          <Link href="/guide" className="px-4 py-2 hover:text-gray-400">Guide</Link>
          <Link href="/contact" className="px-4 py-2 hover:text-gray-400">Contact</Link>
          <Link href="/terms" className="px-4 py-2 hover:text-gray-400">Terms of Use</Link>
        </div> */}
        <div className="flex space-x-4 mb-4">
          <a href="https://github.com/Ashe675/bliss-project" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            Twitter
          </a>
          <a href="https://www.instagram.com/bliss/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            instagram
          </a>
          <a href="https://www.facebook.com/blissworld" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            Facebook
          </a>
        </div>
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()}  Bliss. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

