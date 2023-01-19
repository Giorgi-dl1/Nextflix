import React from 'react'

const AuthFooter = ({ white }: { white?: boolean }) => {
  const links = [
    'FAQ',
    'Help Center',
    'Terms of Use',
    'Privacy',
    'Cookie Preferences',
    'Corporate Information',
  ]
  return (
    <footer
      className={`px-4 py-8 space-y-8  md:mt-20  ${
        white ? 'text-[#3f3f3f] bg-[#dbdbdb]' : 'bg-black/70 text-white'
      } lg:px-36`}
    >
      <p>Questions? Contact Us.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
        {links.map((link) => (
          <div
            key={link}
            className="text-sm !z-[140] cursor-pointer hover:underline max-w-max "
          >
            {link}
          </div>
        ))}
      </div>
    </footer>
  )
}

export default AuthFooter
