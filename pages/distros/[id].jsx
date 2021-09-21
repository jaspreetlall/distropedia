import { useRouter } from 'next/router';

function Distro() {

	const router = useRouter();
	const query = router.query;

	return (
		<div>
			Distro requested is {query.id}
		</div>
	)
}

export default Distro
