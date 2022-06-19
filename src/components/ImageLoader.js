import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ImageLoader({ src, alt, children, className, style }) {
	const image = useRef(null);
	const [isLoaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!image || !image.current) return;

		image.current.addEventListener('load', () => setLoaded(true));
		image.current.src = src;
	}, [image]);

	return (
		<>
			{!isLoaded ? children : null}
			<img alt={alt} className={className} style={{ display: isLoaded ? 'block' : 'none', ...style }} ref={image} />
		</>
	);
}

ImageLoader.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	children: PropTypes.any,
	className: PropTypes.string
};