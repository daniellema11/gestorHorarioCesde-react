import { Header, Footer } from '../../components'
import './Home.css'
import banner from '../../assets/images/banner1.jpg'

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main className="home-page__main">
        <div className="home-page__slider">
          <img src={banner} alt="Banner CESDE" />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Home
