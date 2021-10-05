import Link from 'next/link'
import styles from './Header.module.scss';

function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles['nav__container']}>
        <Link href="/" className={styles['nav__logo']}>
          <a className={styles.nav__logo}>
            <h1 className={styles['nav__logo-title']}>distropedia</h1>
          </a>
        </Link>
        <div className={styles['nav__links']}>
          <Link href="/distros">
            <a className={styles['nav__links-item']}>/distros</a>
          </Link>
          <Link href="/showoff">
            <a className={styles['nav__links-item']}>/showoff</a>
          </Link>
          <Link href="/merch">
            <a className={styles['nav__links-item']}>/merch</a>
          </Link>
          <Link href="/contribute">
            <a className={styles['nav__links-item']}>/contribute</a>
          </Link>
        </div>
        {/* <button className={styles['nav__menu-button']}>Menu</button> */}
      </div>
    </nav>
  )
}

export default Header
