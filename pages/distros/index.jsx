import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import DistroList from '../../components/DistroList/DistroList';
import API_URL from '../../helpers/urlHelper';

function Distros({distroList, success}) {

	const router = useRouter();

	return (
		<Layout>
			{
				(success) && (distroList.length > 0)
				? <DistroList distroList={distroList}/>
				: <div>
						<h3>We are sorry! Something went wrong!</h3>
						<button onClick={() => router.back()}>Go Back</button>
					</div>
			}
		</Layout>
	)
}

export const getServerSideProps = async () => {
  const results = await fetch(`${API_URL}/api/distros?select=name%20baseList%20url`)
		.then((res) => res.json());
  return {
    props: { distroList: results.data, success: results.success	},
  };
}

export default Distros