import { useRouter } from 'next/router';
import API_URL from '../../helpers/urlHelper';

function Distro({distro, success}) {

	const router = useRouter();

	return (
		<div>
			{
				(success)
				? <div>
						<h1>{distro.name}</h1>
						<p>{distro.description}</p>
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

export const getServerSideProps = async (context) => {
	const { id } = context.query;
  const result = await fetch(`${API_URL}/api/distros/${id}?select=name%20description`)
	.then((res) => res.json());
  return {
    props: { distro: result.data, success: result.success },
  };
}

export default Distro
