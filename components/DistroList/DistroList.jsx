import styles from './DistroList.module.scss';
import DistroItem from '../DistroItem/DistroItem';

function DistroList({distroList}) {
	return (
		<div className={styles['distrolist__container']}>
			Browsing {distroList.length} distros
			{
			(distroList.length > 0)
			? <div>
					{
						distroList.map((distro) => {
							return (
								<DistroItem distro={distro} key={distro._id}/>
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
  )
}

export default DistroList