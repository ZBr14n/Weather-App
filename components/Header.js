import Link from 'next/link'
import { withRouter } from 'next/router'


// Displays the Home and About navigation menu
const Header = ({ router: { pathname } }) => (
  <header>
    {/* Displays graphql queries and mutations - uses index.js */}
    <Link prefetch href='/'>
      <a className={pathname === '/' ? 'is-active' : ''}>Weather   </a>
    </Link>

    {/* Shows the About page and what the program is about - uses about.js */}
    <Link prefetch href='/about'>
      <a className={pathname === '/about' ? 'is-active' : ''}>Logs</a>
    </Link>


    {/* displays the average of the temperatures - uses weather_data.js */}
    <Link prefetch href='/weather_data'>
      <a className={pathname === '/weather_data' ? 'is-active' : ''}>   Average</a>
    </Link>


    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        font-size: 20px;
        font-weight: bold;
        
      }
    `}</style>

  </header>
)

export default withRouter(Header)
