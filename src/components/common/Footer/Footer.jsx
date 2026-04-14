import './Footer.css'

const Footer = ({ year = 2026 }) => {
  return (
    <footer className="footer">
      <p>Copyright © {year} Cesde</p>
    </footer>
  )
}

export default Footer
