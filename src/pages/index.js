import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ImageLoader from '../components/ImageLoader';
import ContentLoader from 'react-content-loader';
import Head from 'next/head';

export default function Home({ meta }) {
	const images = meta.slice(0, 9);

	const columns = [[], [], []];

	for (let i = 0; i < images.length; i++) {
		columns[i % 3].push(
			<Link href={`/image/${images[i].captureID}`} key={i}>
				<a className="mb-3 d-block">
					<ImageLoader src={images[i].previewImageURL} alt={images[i].captureDate} style={{ width: '100%' }} className="image">
						<ContentLoader viewBox={`0 0 ${images[i].resolution[0]} ${images[i].resolution[1]}`} uniqueKey={i.toString()} backgroundColor="#e0e0e0" foregroundColor="#cccccc" style={{ display: 'block' }}>
							<rect x="0" y="0" width={images[i].resolution[0]} height={images[i].resolution[1]} rx="5" ry="5" />
						</ContentLoader>
					</ImageLoader>
				</a>
			</Link>
		);
	}

	return (
		<>
			<Head>
				<title>home - gunther.media</title>
			</Head>
			<div className="container">
				<div className="row">
					{
						columns.map((column, index) => (
							<div className="col-4" key={index}>
								{column}
							</div>
						))
					}
				</div>
			</div>
		</>
	);
}

Home.propTypes = {
	meta: PropTypes.array.isRequired
};

export async function getServerSideProps() {
	const result = await fetch('http://localhost:3000/portfolio/meta.json');

	if (result.status === 200) {
		const body = await result.json();

		return { props: { meta: body } };
	}
}