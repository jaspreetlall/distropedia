import Link from 'next/link';
import { useRouter } from 'next/router'
import Layout from '../../components/layout';

function Distros({distroList, success}) {

	const router = useRouter();

	return (
		<Layout>
			<div>
				{
					(success) && (distroList.length > 0)
					? <div>
							{
								distroList.map((distro) => {
									return (
										<div key={distro._id}>
											<h1>{distro.name}</h1>
											<p>{distro.description}</p>
											<Link href="/distros/[id]" as={`/distros/${distro.name}`}>
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
		</Layout>
	)
}

export const getServerSideProps = async () => {
  const results = await fetch("http://localhost:3000/api/distros?select=name%20description")
		.then((res) => res.json());
  return {
    props: { distroList: results.data, success: results.success	},
  };
}

export default Distros