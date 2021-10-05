import styles from './DistroList.module.scss';
import Link from 'next/link';

function DistroList({distroList}) {
  return (
    <div>
      <div className={styles['distrolist__container']}>
        Browsing {distroList.length} distros
				{
          (distroList.length > 0)
					? <div>
							{
                distroList.map((distro) => {
                  return (
                    <div key={distro._id}>
											<h1>{distro.name}</h1>
											<Link href="/distros/[id]" as={`/distros/${distro._id}`}>
												<a>{distro.name}</a>
											</Link>
										</div>
									)
								})
							}
							<button onClick={() => router.back()}>Go Back</button>
						</div>
					: <div>
					<h3>We are sorry! Something went wrong!</h3>
					<button onClick={() => router.back()}>Go Back</button>
				</div>
				}
			</div>
    </div>
  )
}

export default DistroList