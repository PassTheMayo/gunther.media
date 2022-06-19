import React from 'react';
import PropTypes from 'prop-types';

export default function Home({ meta }) {
	console.log(meta);

	return (
		<div className="container">
			<div className="row">
				<div className="col-8">
					<img src={meta.fullImageURL} style={{ width: '100%' }} alt="Full image" />
				</div>
				<div className="col-4">
					<div className="box">
						<div className="d-flex mb-3">
							<span className="flex-grow-1 fw-bold">Capture Date</span>
							<span>{meta.captureDate}</span>
						</div>
						<div className="d-flex mb-3">
							<span className="flex-grow-1 fw-bold">Resolution</span>
							<span>{meta.resolution[0]}&times;{meta.resolution[1]}</span>
						</div>
						<div className="d-flex mb-3">
							<span className="flex-grow-1 fw-bold">Camera Type</span>
							<span>{meta.cameraType || 'N/A'}</span>
						</div>
						<div className="d-flex mb-3">
							<span className="flex-grow-1 fw-bold">Lens Type</span>
							<span>{meta.lensType || 'N/A'}</span>
						</div>
						<div className="d-flex mb-3">
							<span className="flex-grow-1 fw-bold">ISO</span>
							<span>{meta.isoSpeed || 'N/A'}</span>
						</div>
						<div className="d-flex mb-3">
							<span className="flex-grow-1 fw-bold">Focal Length</span>
							<span>{meta.focalLength ? meta.focalLength + 'mm' : 'N/A'}</span>
						</div>
						<div className="d-flex mb-3">
							<span className="flex-grow-1 fw-bold">Aperture</span>
							<span>{meta.aperture ? <span>&fnof;/{meta.aperture}</span> : 'N/A'}</span>
						</div>
						<div className="d-flex">
							<span className="flex-grow-1 fw-bold">Shutter Speed</span>
							<span>{meta.shutterSpeed ? meta.shutterSpeed >= 1 ? meta.shutterSpeed.toFixed(1) + '"' : '1/' + (1 / meta.shutterSpeed).toFixed(0) + ' s' : 'N/A'}</span>
						</div>
					</div>
					<div className="box mt-3">
						<p className="my-0">&copy; 2022 Jacob Gunther</p>
					</div>
				</div>
			</div>
		</div>
	);
}

Home.propTypes = {
	meta: PropTypes.array.isRequired
};

export async function getServerSideProps({ query: { id } }) {
	const result = await fetch(`http://localhost:3000/portfolio/meta-${id}.json`);

	if (result.status === 200) {
		const body = await result.json();

		return { props: { meta: body } };
	} else {
		return { props: { error: { statusCode: 404, reason: 'Page not found' } } };
	}
}