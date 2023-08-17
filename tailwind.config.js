/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        customBlue:'#1E2875',
        HoverBlue:'#4353cf',
        profile_bg: '#FFA78D',
        navbar_font: '#373B5C',
        navbar_background: '#FAFBFF',
        profile_blue:'#1E2875',
        edit_button: '#F0EFFA',
        text_color: '#413B89',
        remove_connection: '#BAB6EB',
        sidebar_link:'#1A1558'
      },
      width:{
        p96: '96%',
        rem59:'59rem'
      },
      gridTemplateColumns: {
        sidebar: "300px auto", // 👈 for sidebar layout. adds grid-cols-sidebar class
      }, 
      gridTemplateRows: {
        header: "64px auto", // 👈 for the navbar layout. adds grid-rows-header class
      },
      gap:{
        rem36: '36rem'
      }
    },
  
  },
  plugins: [],
}
