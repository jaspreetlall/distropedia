import styles from './DistroItem.module.scss';
import Link from 'next/link';

function DistroItem({distro}) {
  console.log(distro.baseList);
  return (
    <article className={styles['distro-item']}>
      <div className={styles['distro-item__logo']}>
        <img src={distro.url.logo} className={styles['distro-item__logo-img']} alt={`${distro.name} Logo`} />
      </div>
      <body className={styles['disto-item__info']}>
        <h2 className={styles['disto-item__info-title']}>{distro.name}</h2>
        {
          (distro.baseList.length>0)
          ? <div>
            Based on:
            {
              distro.baseList.map((base) => {
                return <span key={base._id}>{base.name}</span>
              })
            }
          </div>
          : <div>Independent</div>
        }
        <Link href="/distros/[id]" as={`/distros/${distro._id}`}>
          <a className={styles['distro-item__info-link']}>View</a>
        </Link>
      </body>
    </article>
  )
}

export default DistroItem