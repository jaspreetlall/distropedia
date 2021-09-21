import Link from 'next/link';

function Distros({distroList, success}) {
	return (
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
										<Link href="/distros/[_id]" as={`/distros/${distro._id}`}>
											<a>{distro.name}</a>
										</Link>
									</div>
								)
							})
						}
					</div>
				: <h2>failed</h2>
			}
		</div>
	)
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/distros?select=name%20description")
		.then((res) => res.json());
  return {
    props: { distroList: res.data, success: res.success	},
  };
}

export default Distros