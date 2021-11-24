import styles from './DistroItem.module.scss';
import Link from 'next/link';

function DistroItem({distro}) {
  console.log(distro.baseList);
  return (
    <article className={styles['distro']}>
      <div className={styles['distro__logo']}>
        <img src={distro.url.logo} className={styles['distro__logo-img']} alt={`${distro.name} Logo`} />
      </div>
      <div className={styles['distro__info']}>
        <h2 className={styles['distro__info-name']}>{distro.name}</h2>
        <section className={styles['distro__info-base']}>
          <h3 className={styles['distro__info-base-title']}>Base</h3>
          {
            (distro.baseList.length>0)
            ? <ul className={styles['distro__info-base-list']}>
              {
                distro.baseList.map((base) => {
                  return <li className={styles['distro__info-base-list-item']} key={base._id}>{base.name}</li>
                })
              }
              </ul>
            : <div className={styles['distro__info-base-list distro__info-base-list-item']}>Independent</div>
          }
        </section>
        {
          (distro.environmentList.length>0)
          && <section className={styles['distro__info-environment']}>
            <h3 className={styles['distro__info-environment-title']}>Environment</h3>
            <ul className={styles['distro__info-environment-list']}>
            {
              distro.environmentList.map((environment) => {
                return <li className={styles['distro__info-environment-list-item']} key={environment._id}>{environment.name}</li>
              })
            }
            </ul>
          </section>
        }
        <Link href="/distros/[id]" as={`/distros/${distro._id}`}>
          <a className={styles['distro__info-link']}>View</a>
        </Link>
      </div>
    </article>
  )
}

export default DistroItem