import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="flex w-full items-center justify-center border border-primaryColor bg-footerColor py-1">
      <p
        className="cursor-pointer text-sm font-light text-lightColor"
        onClick={() => {
          navigate('/first')
        }}
      >
        Supported by TechMate
      </p>
    </footer>
  )
}

export default Footer