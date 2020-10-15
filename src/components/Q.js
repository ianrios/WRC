import React from 'react'
import './Q.scss';

export default function Q(p) {
	return <span className={`q s-${p.s ? p.s : 1}`}>?</span>
}