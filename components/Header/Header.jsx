import styles from './Header.module.scss'
import Link from 'next/link'

function Header() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.nav__logo}>
        <a className={styles.nav__logo}>
          <h1>distropedia</h1>
        </a>
      </Link>
      <div>
        <Link href="/distros">
          <a>/distros</a>
        </Link>
        <Link href="/showoff">
          <a>/showoff</a>
        </Link>
        <Link href="/merch">
          <a>/merch</a>
        </Link>
        <Link href="/contribute">
          <a>/contribute</a>
        </Link>
      </div>
    </nav>
  )
}

export default Header
