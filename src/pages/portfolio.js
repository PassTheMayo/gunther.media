import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import ImageLoader from '../components/ImageLoader';
import Head from 'next/head';

export default function Portfolio({ meta }) {
	const [metaCount, setMetaCount] = useState(9);

	const columns = [[], [], []];
	const items = meta.slice(0, metaCount);

	for (let i = 0; i < items.length; i++) {
		columns[i % 3].push(
			<Link href={`/image/${items[i].captureID}`} key={i}>
				<a className="mb-3 d-block">
					<ImageLoader src={items[i].previewImageURL} alt={items[i].captureDate} style={{ width: '100%' }} className="image">
						<ContentLoader viewBox={`0 0 ${items[i].resolution[0]} ${items[i].resolution[1]}`} uniqueKey={i.toString()} backgroundColor="#e0e0e0" foregroundColor="#cccccc" style={{ display: 'block' }}>
							<rect x="0" y="0" width={items[i].resolution[0]} height={items[i].resolution[1]} rx="5" ry="5" />
						</ContentLoader>
					</ImageLoader>
				</a>
			</Link>
		);
	}

	const loadMoreItems = (count) => {
		if (metaCount >= meta.length) return;

		setMetaCount(metaCount + count);
	};

	useEffect(() => {
		const onScroll = () => {
			const lastElementInColumns = document.querySelectorAll('#data-container .col-4 a:last-of-type');

			for (const elem of lastElementInColumns) {
				const position = elem.getBoundingClientRect();

				if (position.bottom - 100 < window.innerHeight) {
					loadMoreItems(3);
				}
			}
		};

		window.addEventListener('scroll', onScroll);
		window.addEventListener('load', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, [metaCount]);

	return (
		<>
			<Head>
				<title>portfolio - gunther.media</title>
			</Head>
			<div className="container" id="data-container">
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

Portfolio.propTypes = {
	meta: PropTypes.array.isRequired
};

export async function getServerSideProps() {
	const result = await fetch('http://localhost:3000/portfolio/meta.json');

	if (result.status === 200) {
		const body = await result.json();

		return { props: { meta: body } };
	}
}