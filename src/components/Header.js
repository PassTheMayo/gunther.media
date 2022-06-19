import React from 'react';
import Link from 'next/link';

export default function Navbar() {
	return (
		<div className="header">
			<img src="/img/header.jpg" alt="Jacob Gunther" width="128" height="128" />
			<span className="title">Jacob Gunther</span>
			<ul>
				<li>
					<Link href="/">home</Link>
				</li>
				<li>
					<Link href="/portfolio">portfolio</Link>
				</li>
				<li>
					<Link href="/about">about</Link>
				</li>
				<li>
					<Link href="/contact">contact</Link>
				</li>
				<li>
					<a href="https://instagram.com/gunther.media" target="_blank" rel="noreferrer">instagram</a>
				</li>
			</ul>
		</div>
	);
}