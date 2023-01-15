import { BsInstagram } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { ImYoutube } from 'react-icons/im'

const Footer = () => {
  const links = [
    'Audio Description',
    'Help Center',
    'Gift Cards',
    'Media Center',
    'Investor Relations',
    'Jobs',
    'Terms of Use',
    'Privay',
    'Legal Notices',
    'Cookie Preferences',
    'Corporate Information',
    'Contact Us',
  ]
  return (
    <footer className="px-4 py-8 space-y-8 md:mt-6 lg:px-36">
      <div className="flex gap-3">
        <FaFacebookF className="w-6 h-6 cursor-pointer" />
        <BsInstagram className="w-6 h-6 cursor-pointer" />
        <ImYoutube className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
        {links.map((link) => (
          <div
            key={link}
            className="text-sm cursor-pointer hover:underline max-w-max text-white/70"
          >
            {link}
          </div>
        ))}
      </div>
      <button className="p-1 border border-white/70 text-white/70">
        Service Code
      </button>
    </footer>
  )
}

export default Footer
