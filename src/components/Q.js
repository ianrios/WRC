import React from 'react'
import './Q.scss';

export default function Q(props) {
	return <span className={`question-mark font-size-${props.size ? props.size : 1}`}>?</span >
}